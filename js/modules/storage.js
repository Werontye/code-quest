/**
 * Storage Module - LocalStorage wrapper for CodeQuest
 */

const Storage = {
    KEYS: {
        USER_DATA: 'codequest_user',
        SETTINGS: 'codequest_settings'
    },

    // Default user data structure
    defaultUserData: {
        username: 'Игрок',
        createdAt: new Date().toISOString(),
        xp: 0,
        rank: 1,
        dailyGoal: 100,
        progress: {
            html: { completed: [], current: 1 },
            css: { completed: [], current: 1 },
            js: { completed: [], current: 1 },
            ts: { completed: [], current: 1 },
            react: { completed: [], current: 1 },
            node: { completed: [], current: 1 },
            figma: { completed: [], current: 1 },
            python: { completed: [], current: 1 },
            git: { completed: [], current: 1 }
        },
        achievements: [],
        weeklyXP: {},
        recentActivity: [],
        stats: {
            totalLevels: 0,
            totalTime: 0,
            firstTryCount: 0,
            fastCompletions: 0,
            streakDays: 0,
            lastPlayDate: null
        }
    },

    /**
     * Get user data from localStorage
     */
    getUserData() {
        try {
            const data = localStorage.getItem(this.KEYS.USER_DATA);
            if (data) {
                const parsed = JSON.parse(data);
                // Merge with defaults to ensure all fields exist
                return this.mergeWithDefaults(parsed);
            }
        } catch (e) {
            console.error('Error reading user data:', e);
        }
        return { ...this.defaultUserData };
    },

    /**
     * Save user data to localStorage
     */
    saveUserData(data) {
        try {
            localStorage.setItem(this.KEYS.USER_DATA, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Error saving user data:', e);
            return false;
        }
    },

    /**
     * Merge saved data with defaults
     */
    mergeWithDefaults(saved) {
        const merged = { ...this.defaultUserData };

        for (const key in saved) {
            if (typeof saved[key] === 'object' && !Array.isArray(saved[key])) {
                merged[key] = { ...this.defaultUserData[key], ...saved[key] };
            } else {
                merged[key] = saved[key];
            }
        }

        return merged;
    },

    /**
     * Add XP and update rank if needed
     */
    addXP(amount) {
        const userData = this.getUserData();
        userData.xp += amount;

        // Track daily XP for weekly chart
        const today = new Date().toISOString().split('T')[0];
        if (!userData.weeklyXP) userData.weeklyXP = {};
        userData.weeklyXP[today] = (userData.weeklyXP[today] || 0) + amount;

        // Clean old weekly data (keep only last 14 days)
        const twoWeeksAgo = new Date();
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
        const cutoffDate = twoWeeksAgo.toISOString().split('T')[0];
        for (const date in userData.weeklyXP) {
            if (date < cutoffDate) {
                delete userData.weeklyXP[date];
            }
        }

        // Check for rank up
        const newRank = this.calculateRank(userData.xp);
        const rankUp = newRank > userData.rank;
        userData.rank = newRank;

        this.saveUserData(userData);

        return {
            newXP: userData.xp,
            newRank: newRank,
            rankUp: rankUp,
            rankName: this.getRankName(newRank)
        };
    },

    /**
     * Calculate rank based on XP
     */
    calculateRank(xp) {
        const ranks = [
            { rank: 1, minXP: 0 },
            { rank: 2, minXP: 100 },
            { rank: 3, minXP: 300 },
            { rank: 4, minXP: 600 },
            { rank: 5, minXP: 1000 },
            { rank: 6, minXP: 1500 },
            { rank: 7, minXP: 2500 },
            { rank: 8, minXP: 4000 }
        ];

        let currentRank = 1;
        for (const r of ranks) {
            if (xp >= r.minXP) {
                currentRank = r.rank;
            }
        }
        return currentRank;
    },

    /**
     * Get rank name
     */
    getRankName(rank) {
        const names = {
            1: 'Новичок',
            2: 'Ученик',
            3: 'Практикант',
            4: 'Разработчик',
            5: 'Мастер',
            6: 'Эксперт',
            7: 'Гуру',
            8: 'Легенда'
        };
        return names[rank] || 'Новичок';
    },

    /**
     * Get XP needed for next rank
     */
    getXPForNextRank(currentXP) {
        const thresholds = [100, 300, 600, 1000, 1500, 2500, 4000];
        for (const threshold of thresholds) {
            if (currentXP < threshold) {
                return threshold;
            }
        }
        return null; // Max rank reached
    },

    /**
     * Complete a level
     */
    completeLevel(lang, levelId, xpEarned, isFirstTry = false, isFast = false, levelTitle = null) {
        const userData = this.getUserData();

        // Ensure progress structure exists for this language
        if (!userData.progress[lang]) {
            userData.progress[lang] = { completed: [], current: 1 };
        }

        // Add to completed if not already
        if (!userData.progress[lang].completed.includes(levelId)) {
            userData.progress[lang].completed.push(levelId);
            userData.progress[lang].current++;
            userData.stats.totalLevels++;

            if (isFirstTry) {
                userData.stats.firstTryCount++;
            }

            if (isFast) {
                userData.stats.fastCompletions++;
            }

            // Add to recent activity
            if (!userData.recentActivity) userData.recentActivity = [];
            userData.recentActivity.unshift({
                course: lang,
                levelId: levelId,
                levelTitle: levelTitle,
                xp: xpEarned,
                timestamp: new Date().toISOString()
            });

            // Keep only last 20 activities
            if (userData.recentActivity.length > 20) {
                userData.recentActivity = userData.recentActivity.slice(0, 20);
            }
        }

        // Update streak
        const today = new Date().toDateString();
        if (userData.stats.lastPlayDate !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            if (userData.stats.lastPlayDate === yesterday.toDateString()) {
                userData.stats.streakDays++;
            } else {
                userData.stats.streakDays = 1;
            }
            userData.stats.lastPlayDate = today;
        }

        this.saveUserData(userData);

        return {
            completedCount: userData.progress[lang].completed.length,
            totalLevels: userData.stats.totalLevels,
            streak: userData.stats.streakDays
        };
    },

    /**
     * Check if level is completed
     */
    isLevelCompleted(lang, levelId) {
        const userData = this.getUserData();
        return userData.progress[lang].completed.includes(levelId);
    },

    /**
     * Get completed levels for a language
     */
    getCompletedLevels(lang) {
        const userData = this.getUserData();
        return userData.progress[lang].completed;
    },

    /**
     * Get current level for a language
     */
    getCurrentLevel(lang) {
        const userData = this.getUserData();
        return userData.progress[lang].current;
    },

    /**
     * Add achievement
     */
    addAchievement(achievementId) {
        const userData = this.getUserData();

        if (!userData.achievements.includes(achievementId)) {
            userData.achievements.push(achievementId);
            this.saveUserData(userData);
            return true;
        }
        return false;
    },

    /**
     * Check if achievement is unlocked
     */
    hasAchievement(achievementId) {
        const userData = this.getUserData();
        return userData.achievements.includes(achievementId);
    },

    /**
     * Get all achievements
     */
    getAchievements() {
        const userData = this.getUserData();
        return userData.achievements;
    },

    /**
     * Get settings
     */
    getSettings() {
        try {
            const settings = localStorage.getItem(this.KEYS.SETTINGS);
            return settings ? JSON.parse(settings) : {
                sound: true,
                theme: 'auto',
                fontSize: 'medium'
            };
        } catch (e) {
            return {
                sound: true,
                theme: 'auto',
                fontSize: 'medium'
            };
        }
    },

    /**
     * Save settings
     */
    saveSettings(settings) {
        try {
            localStorage.setItem(this.KEYS.SETTINGS, JSON.stringify(settings));
            return true;
        } catch (e) {
            return false;
        }
    },

    /**
     * Update streak on page load
     */
    updateStreak() {
        const userData = this.getUserData();
        const today = new Date().toDateString();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        // If last play was before yesterday, reset streak
        if (userData.stats.lastPlayDate &&
            userData.stats.lastPlayDate !== today &&
            userData.stats.lastPlayDate !== yesterday.toDateString()) {
            userData.stats.streakDays = 0;
            this.saveUserData(userData);
        }

        return userData.stats.streakDays;
    },

    /**
     * Reset all progress
     */
    resetProgress() {
        localStorage.removeItem(this.KEYS.USER_DATA);
        return true;
    },

    /**
     * Export user data
     */
    exportData() {
        const userData = this.getUserData();
        const settings = this.getSettings();
        return JSON.stringify({ userData, settings }, null, 2);
    },

    /**
     * Import user data
     */
    importData(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            if (data.userData) {
                this.saveUserData(data.userData);
            }
            if (data.settings) {
                this.saveSettings(data.settings);
            }
            return true;
        } catch (e) {
            console.error('Error importing data:', e);
            return false;
        }
    },

    /**
     * Get daily challenge - returns a consistent level for today
     */
    getDailyChallenge() {
        const today = new Date();
        const dateString = today.toISOString().split('T')[0];

        // Create a seed from the date
        const seed = dateString.split('-').reduce((acc, val) => acc + parseInt(val), 0);

        // Get all available courses and their levels
        const courses = ['html', 'css', 'js', 'figma'];
        const courseIndex = seed % courses.length;
        const selectedCourse = courses[courseIndex];

        // Get levels for selected course
        const levels = this.getLevelsForCourse(selectedCourse);
        if (!levels || levels.length === 0) return null;

        // Select a level based on seed
        const levelIndex = (seed * 7) % levels.length;
        const selectedLevel = levels[levelIndex];

        return {
            course: selectedCourse,
            levelId: selectedLevel.id,
            levelIndex: levelIndex + 1,
            levelTitle: selectedLevel.title,
            xpMultiplier: 2,
            date: dateString
        };
    },

    /**
     * Get levels for a course (helper)
     */
    getLevelsForCourse(course) {
        switch (course) {
            case 'html': return window.htmlLevels || [];
            case 'css': return window.cssLevels || [];
            case 'js': return window.jsLevels || [];
            case 'ts': return window.tsLevels || [];
            case 'react': return window.reactLevels || [];
            case 'node': return window.nodeLevels || [];
            case 'figma': return window.figmaLevels || [];
            case 'python': return window.pythonLevels || [];
            case 'git': return window.gitLevels || [];
            default: return [];
        }
    },

    /**
     * Check if daily challenge is completed today
     */
    isDailyChallengeCompleted() {
        const userData = this.getUserData();
        const today = new Date().toISOString().split('T')[0];
        return userData.lastDailyChallenge === today;
    },

    /**
     * Mark daily challenge as completed
     */
    completeDailyChallenge() {
        const userData = this.getUserData();
        userData.lastDailyChallenge = new Date().toISOString().split('T')[0];
        userData.stats.dailyChallengesCompleted = (userData.stats.dailyChallengesCompleted || 0) + 1;
        this.saveUserData(userData);
    },

    /**
     * Use hint (costs XP)
     */
    useHint(cost = 5) {
        const userData = this.getUserData();
        if (userData.xp >= cost) {
            userData.xp -= cost;
            userData.stats.hintsUsed = (userData.stats.hintsUsed || 0) + 1;
            this.saveUserData(userData);
            return { success: true, newXP: userData.xp };
        }
        return { success: false, message: 'Недостаточно XP для подсказки' };
    }
};

// Make available globally
window.Storage = Storage;
