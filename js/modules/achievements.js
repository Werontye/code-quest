/**
 * Achievements Module - Manages game achievements
 */

const Achievements = {
    // All available achievements
    list: [
        // Getting Started
        {
            id: 'first-steps',
            name: 'Первые шаги',
            description: 'Пройди свой первый уровень',
            icon: '&#128095;',
            xp: 50,
            condition: (stats) => stats.totalLevels >= 1
        },
        {
            id: 'getting-started',
            name: 'Начало пути',
            description: 'Пройди 5 уровней',
            icon: '&#127939;',
            xp: 100,
            condition: (stats) => stats.totalLevels >= 5
        },
        {
            id: 'dedicated',
            name: 'Целеустремлённый',
            description: 'Пройди 25 уровней',
            icon: '&#128170;',
            xp: 200,
            condition: (stats) => stats.totalLevels >= 25
        },
        {
            id: 'veteran',
            name: 'Ветеран',
            description: 'Пройди 50 уровней',
            icon: '&#127942;',
            xp: 300,
            condition: (stats) => stats.totalLevels >= 50
        },
        {
            id: 'master',
            name: 'Мастер',
            description: 'Пройди 100 уровней',
            icon: '&#128081;',
            xp: 500,
            condition: (stats) => stats.totalLevels >= 100
        },

        // Language specific
        {
            id: 'html-starter',
            name: 'HTML Ученик',
            description: 'Пройди 10 уровней HTML',
            icon: '&#127959;',
            xp: 100,
            condition: (stats, progress) => (progress.html?.completed?.length || 0) >= 10
        },
        {
            id: 'html-master',
            name: 'HTML Строитель',
            description: 'Пройди все уровни HTML',
            icon: '&#127959;',
            xp: 300,
            condition: (stats, progress) => (progress.html?.completed?.length || 0) >= 35
        },
        {
            id: 'css-starter',
            name: 'CSS Ученик',
            description: 'Пройди 10 уровней CSS',
            icon: '&#127912;',
            xp: 100,
            condition: (stats, progress) => (progress.css?.completed?.length || 0) >= 10
        },
        {
            id: 'css-master',
            name: 'CSS Художник',
            description: 'Пройди все уровни CSS',
            icon: '&#127912;',
            xp: 400,
            condition: (stats, progress) => (progress.css?.completed?.length || 0) >= 55
        },
        {
            id: 'js-starter',
            name: 'JS Ученик',
            description: 'Пройди 10 уровней JavaScript',
            icon: '&#128640;',
            xp: 100,
            condition: (stats, progress) => (progress.js?.completed?.length || 0) >= 10
        },
        {
            id: 'js-master',
            name: 'JS Космонавт',
            description: 'Пройди все уровни JavaScript',
            icon: '&#128640;',
            xp: 500,
            condition: (stats, progress) => (progress.js?.completed?.length || 0) >= 70
        },

        // Polyglot
        {
            id: 'polyglot',
            name: 'Полиглот',
            description: 'Пройди по 10 уровней каждого языка',
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
            name: 'Fullstack разработчик',
            description: 'Пройди все уровни всех языков',
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
            name: 'Быстрый ученик',
            description: 'Пройди 5 уровней менее чем за минуту каждый',
            icon: '&#9889;',
            xp: 150,
            condition: (stats) => stats.fastCompletions >= 5
        },
        {
            id: 'speed-demon',
            name: 'Скорострел',
            description: 'Пройди 20 уровней менее чем за минуту каждый',
            icon: '&#128165;',
            xp: 300,
            condition: (stats) => stats.fastCompletions >= 20
        },

        // Accuracy achievements
        {
            id: 'accurate',
            name: 'Меткий',
            description: 'Пройди 10 уровней с первой попытки',
            icon: '&#127919;',
            xp: 150,
            condition: (stats) => stats.firstTryCount >= 10
        },
        {
            id: 'perfectionist',
            name: 'Перфекционист',
            description: 'Пройди 30 уровней с первой попытки',
            icon: '&#128175;',
            xp: 400,
            condition: (stats) => stats.firstTryCount >= 30
        },

        // XP achievements
        {
            id: 'xp-100',
            name: 'Начинающий',
            description: 'Набери 100 XP',
            icon: '&#11088;',
            xp: 0,
            condition: (stats, progress, xp) => xp >= 100
        },
        {
            id: 'xp-500',
            name: 'Опытный',
            description: 'Набери 500 XP',
            icon: '&#11088;',
            xp: 0,
            condition: (stats, progress, xp) => xp >= 500
        },
        {
            id: 'xp-1000',
            name: 'Коллекционер',
            description: 'Набери 1000 XP',
            icon: '&#127775;',
            xp: 0,
            condition: (stats, progress, xp) => xp >= 1000
        },
        {
            id: 'xp-2500',
            name: 'Легенда',
            description: 'Набери 2500 XP',
            icon: '&#128142;',
            xp: 0,
            condition: (stats, progress, xp) => xp >= 2500
        },

        // Streak achievements
        {
            id: 'streak-3',
            name: 'В ритме',
            description: 'Занимайся 3 дня подряд',
            icon: '&#128293;',
            xp: 100,
            condition: (stats) => stats.streakDays >= 3
        },
        {
            id: 'streak-7',
            name: 'Недельный марафон',
            description: 'Занимайся 7 дней подряд',
            icon: '&#128293;',
            xp: 200,
            condition: (stats) => stats.streakDays >= 7
        },
        {
            id: 'streak-30',
            name: 'Железная воля',
            description: 'Занимайся 30 дней подряд',
            icon: '&#128293;',
            xp: 500,
            condition: (stats) => stats.streakDays >= 30
        },

        // Rank achievements
        {
            id: 'rank-developer',
            name: 'Разработчик',
            description: 'Достигни ранга "Разработчик"',
            icon: '&#128187;',
            xp: 0,
            condition: (stats, progress, xp) => Storage.calculateRank(xp) >= 4
        },
        {
            id: 'rank-expert',
            name: 'Эксперт',
            description: 'Достигни ранга "Эксперт"',
            icon: '&#127942;',
            xp: 0,
            condition: (stats, progress, xp) => Storage.calculateRank(xp) >= 6
        },
        {
            id: 'rank-legend',
            name: 'Легенда кода',
            description: 'Достигни максимального ранга',
            icon: '&#128081;',
            xp: 0,
            condition: (stats, progress, xp) => Storage.calculateRank(xp) >= 8
        }
    ],

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

                newAchievements.push(achievement);
            }
        }

        return newAchievements;
    },

    /**
     * Get achievement by ID
     */
    getById(id) {
        return this.list.find(a => a.id === id);
    },

    /**
     * Get all achievements with unlock status
     */
    getAllWithStatus() {
        const userData = Storage.getUserData();

        return this.list.map(achievement => ({
            ...achievement,
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

        if (nameEl) nameEl.textContent = achievement.name;
        if (iconEl) iconEl.innerHTML = achievement.icon;

        popup.classList.remove('hidden');

        // Auto hide after 4 seconds
        setTimeout(() => {
            popup.classList.add('hidden');
        }, 4000);
    }
};

// Make available globally
window.Achievements = Achievements;
