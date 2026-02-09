/**
 * Achievements Module - Manages game achievements
 */

const Achievements = {
    // All available achievements
    list: [
        // Getting Started
        {
            id: 'first-steps',
            icon: '&#128095;',
            xp: 50,
            condition: (stats) => stats.totalLevels >= 1
        },
        {
            id: 'getting-started',
            icon: '&#127939;',
            xp: 100,
            condition: (stats) => stats.totalLevels >= 5
        },
        {
            id: 'dedicated',
            icon: '&#128170;',
            xp: 200,
            condition: (stats) => stats.totalLevels >= 25
        },
        {
            id: 'veteran',
            icon: '&#127942;',
            xp: 300,
            condition: (stats) => stats.totalLevels >= 50
        },
        {
            id: 'master',
            icon: '&#128081;',
            xp: 500,
            condition: (stats) => stats.totalLevels >= 100
        },

        // Language specific
        {
            id: 'html-starter',
            icon: '&#127959;',
            xp: 100,
            condition: (stats, progress) => (progress.html?.completed?.length || 0) >= 10
        },
        {
            id: 'html-master',
            icon: '&#127959;',
            xp: 300,
            condition: (stats, progress) => (progress.html?.completed?.length || 0) >= 35
        },
        {
            id: 'css-starter',
            icon: '&#127912;',
            xp: 100,
            condition: (stats, progress) => (progress.css?.completed?.length || 0) >= 10
        },
        {
            id: 'css-master',
            icon: '&#127912;',
            xp: 400,
            condition: (stats, progress) => (progress.css?.completed?.length || 0) >= 55
        },
        {
            id: 'js-starter',
            icon: '&#128640;',
            xp: 100,
            condition: (stats, progress) => (progress.js?.completed?.length || 0) >= 10
        },
        {
            id: 'js-master',
            icon: '&#128640;',
            xp: 500,
            condition: (stats, progress) => (progress.js?.completed?.length || 0) >= 70
        },

        // Polyglot
        {
            id: 'polyglot',
            icon: '&#127760;',
            xp: 250,
            condition: (stats, progress) => {
                const html = progress.html?.completed?.length || 0;
                const css = progress.css?.completed?.length || 0;
                const js = progress.js?.completed?.length || 0;
                return html >= 10 && css >= 10 && js >= 10;
            }
        },
        {
            id: 'full-stack',
            icon: '&#128187;',
            xp: 1000,
            condition: (stats, progress) => {
                const html = progress.html?.completed?.length || 0;
                const css = progress.css?.completed?.length || 0;
                const js = progress.js?.completed?.length || 0;
                return html >= 35 && css >= 55 && js >= 70;
            }
        },

        // Speed achievements
        {
            id: 'quick-learner',
            icon: '&#9889;',
            xp: 150,
            condition: (stats) => stats.fastCompletions >= 5
        },
        {
            id: 'speed-demon',
            icon: '&#128165;',
            xp: 300,
            condition: (stats) => stats.fastCompletions >= 20
        },

        // Accuracy achievements
        {
            id: 'accurate',
            icon: '&#127919;',
            xp: 150,
            condition: (stats) => stats.firstTryCount >= 10
        },
        {
            id: 'perfectionist',
            icon: '&#128175;',
            xp: 400,
            condition: (stats) => stats.firstTryCount >= 30
        },

        // XP achievements
        {
            id: 'xp-100',
            icon: '&#11088;',
            xp: 0,
            condition: (stats, progress, xp) => xp >= 100
        },
        {
            id: 'xp-500',
            icon: '&#11088;',
            xp: 0,
            condition: (stats, progress, xp) => xp >= 500
        },
        {
            id: 'xp-1000',
            icon: '&#127775;',
            xp: 0,
            condition: (stats, progress, xp) => xp >= 1000
        },
        {
            id: 'xp-2500',
            icon: '&#128142;',
            xp: 0,
            condition: (stats, progress, xp) => xp >= 2500
        },

        // Streak achievements
        {
            id: 'streak-3',
            icon: '&#128293;',
            xp: 100,
            condition: (stats) => stats.streakDays >= 3
        },
        {
            id: 'streak-7',
            icon: '&#128293;',
            xp: 200,
            condition: (stats) => stats.streakDays >= 7
        },
        {
            id: 'streak-30',
            icon: '&#128293;',
            xp: 500,
            condition: (stats) => stats.streakDays >= 30
        },

        // Rank achievements
        {
            id: 'rank-developer',
            icon: '&#128187;',
            xp: 0,
            condition: (stats, progress, xp) => Storage.calculateRank(xp) >= 4
        },
        {
            id: 'rank-expert',
            icon: '&#127942;',
            xp: 0,
            condition: (stats, progress, xp) => Storage.calculateRank(xp) >= 6
        },
        {
            id: 'rank-legend',
            icon: '&#128081;',
            xp: 0,
            condition: (stats, progress, xp) => Storage.calculateRank(xp) >= 8
        }
    ],

    /**
     * Get localized name for achievement
     */
    getName(id) {
        return i18n.t(`ach.${id}.name`);
    },

    /**
     * Get localized description for achievement
     */
    getDescription(id) {
        return i18n.t(`ach.${id}.desc`);
    },

    /**
     * Check for newly earned achievements
     */
    checkAchievements() {
        const userData = Storage.getUserData();
        const newAchievements = [];

        for (const achievement of this.list) {
            // Skip if already unlocked
            if (userData.achievements.includes(achievement.id)) {
                continue;
            }

            // Check condition
            if (achievement.condition(userData.stats, userData.progress, userData.xp)) {
                // Award achievement
                Storage.addAchievement(achievement.id);

                // Add bonus XP
                if (achievement.xp > 0) {
                    Storage.addXP(achievement.xp);
                }

                newAchievements.push({
                    ...achievement,
                    name: this.getName(achievement.id),
                    description: this.getDescription(achievement.id)
                });
            }
        }

        return newAchievements;
    },

    /**
     * Get achievement by ID
     */
    getById(id) {
        const ach = this.list.find(a => a.id === id);
        if (ach) {
            return {
                ...ach,
                name: this.getName(id),
                description: this.getDescription(id)
            };
        }
        return null;
    },

    /**
     * Get all achievements with unlock status
     */
    getAllWithStatus() {
        const userData = Storage.getUserData();

        return this.list.map(achievement => ({
            ...achievement,
            name: this.getName(achievement.id),
            description: this.getDescription(achievement.id),
            unlocked: userData.achievements.includes(achievement.id)
        }));
    },

    /**
     * Get unlocked achievements count
     */
    getUnlockedCount() {
        const userData = Storage.getUserData();
        return userData.achievements.length;
    },

    /**
     * Get total achievements count
     */
    getTotalCount() {
        return this.list.length;
    },

    /**
     * Get progress towards next achievements
     */
    getProgress() {
        const userData = Storage.getUserData();
        const progress = [];

        for (const achievement of this.list) {
            if (userData.achievements.includes(achievement.id)) {
                continue; // Already unlocked
            }

            // Calculate progress percentage for certain achievements
            let percent = 0;

            if (achievement.id.includes('html')) {
                const current = userData.progress.html?.completed?.length || 0;
                const target = achievement.id.includes('master') ? 35 : 10;
                percent = Math.min(100, Math.round((current / target) * 100));
            } else if (achievement.id.includes('css')) {
                const current = userData.progress.css?.completed?.length || 0;
                const target = achievement.id.includes('master') ? 55 : 10;
                percent = Math.min(100, Math.round((current / target) * 100));
            } else if (achievement.id.includes('js')) {
                const current = userData.progress.js?.completed?.length || 0;
                const target = achievement.id.includes('master') ? 70 : 10;
                percent = Math.min(100, Math.round((current / target) * 100));
            } else if (achievement.id.includes('xp')) {
                const target = parseInt(achievement.id.split('-')[1]);
                percent = Math.min(100, Math.round((userData.xp / target) * 100));
            } else if (achievement.id.includes('streak')) {
                const target = parseInt(achievement.id.split('-')[1]);
                percent = Math.min(100, Math.round((userData.stats.streakDays / target) * 100));
            }

            if (percent > 0 && percent < 100) {
                progress.push({
                    ...achievement,
                    name: this.getName(achievement.id),
                    description: this.getDescription(achievement.id),
                    percent
                });
            }
        }

        // Sort by progress percentage (closest to completion first)
        return progress.sort((a, b) => b.percent - a.percent).slice(0, 5);
    },

    /**
     * Show achievement popup
     */
    showPopup(achievement) {
        const popup = document.getElementById('achievementPopup');
        if (!popup) return;

        const nameEl = popup.querySelector('#achievementName');
        const iconEl = popup.querySelector('.achievement-icon');

        if (nameEl) nameEl.textContent = achievement.name || this.getName(achievement.id);
        if (iconEl) iconEl.innerHTML = achievement.icon;

        // Reset animation classes
        popup.classList.remove('hidden', 'fade-out');

        // Auto hide after 4 seconds with fade-out animation
        setTimeout(() => {
            popup.classList.add('fade-out');
            // Remove popup after animation completes
            setTimeout(() => {
                popup.classList.add('hidden');
                popup.classList.remove('fade-out');
            }, 500);
        }, 4000);
    }
};

// Make available globally
window.Achievements = Achievements;
