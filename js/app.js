/**
 * CodeQuest - Main Application
 * Interactive learning platform for HTML, CSS, and JavaScript
 */

const App = {
    /**
     * Initialize the application
     */
    init() {
        console.log('CodeQuest initialized!');

        // Check if first visit
        this.checkFirstVisit();

        // Update UI with user data
        this.updateUserStats();

        // Setup event listeners
        this.setupEventListeners();

        // Check for achievements
        this.checkAchievements();
    },

    /**
     * Check if this is user's first visit
     */
    checkFirstVisit() {
        const userData = Storage.getUserData();

        if (!userData.username || userData.username === 'Игрок') {
            // Could show welcome modal here
            console.log('Welcome to CodeQuest!');
        }
    },

    /**
     * Update user statistics on page
     */
    updateUserStats() {
        const userData = Storage.getUserData();

        // Update header XP
        const headerXP = document.getElementById('headerXP');
        if (headerXP) {
            headerXP.textContent = userData.xp + ' XP';
        }

        // Update stats section (home page)
        const totalXP = document.getElementById('totalXP');
        const totalLevels = document.getElementById('totalLevels');
        const currentRank = document.getElementById('currentRank');
        const achievementsCount = document.getElementById('achievementsCount');

        if (totalXP) totalXP.textContent = userData.xp;
        if (totalLevels) totalLevels.textContent = userData.stats.totalLevels;
        if (currentRank) currentRank.textContent = Storage.getRankName(userData.rank);
        if (achievementsCount) achievementsCount.textContent = userData.achievements.length;

        // Update progress bars on language cards
        this.updateLanguageProgress('html', userData.progress.html, 35);
        this.updateLanguageProgress('css', userData.progress.css, 55);
        this.updateLanguageProgress('js', userData.progress.js, 70);
    },

    /**
     * Update language card progress
     */
    updateLanguageProgress(lang, progress, total) {
        const completedEl = document.getElementById(lang + 'Completed');
        const progressEl = document.getElementById(lang + 'Progress');

        if (completedEl && progressEl && progress) {
            const completed = progress.completed?.length || 0;
            completedEl.textContent = completed;

            const percent = Math.round((completed / total) * 100);
            progressEl.style.width = percent + '%';
        }
    },

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Language cards hover effects
        const cards = document.querySelectorAll('.language-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });

        // Stats cards animation
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('animate-fade-in');
        });
    },

    /**
     * Check and display new achievements
     */
    checkAchievements() {
        if (typeof Achievements !== 'undefined') {
            const newAchievements = Achievements.checkAchievements();

            if (newAchievements.length > 0) {
                // Show notification for first new achievement
                this.showNotification(
                    `${i18n.t('notification.new_achievement')} ${newAchievements[0].name}!`,
                    'success'
                );
            }
        }
    },

    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span class="notification-icon">${type === 'success' ? '&#10003;' : '&#8505;'}</span>
            <span class="notification-text">${message}</span>
        `;

        // Add styles if not already present
        if (!document.getElementById('notificationStyles')) {
            const styles = document.createElement('style');
            styles.id = 'notificationStyles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 80px;
                    right: 20px;
                    padding: 16px 24px;
                    background: var(--color-bg-card);
                    border-radius: var(--radius-lg);
                    box-shadow: var(--shadow-lg);
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    z-index: 1000;
                    animation: slideInRight 0.3s ease;
                }
                .notification-success {
                    border-left: 4px solid var(--color-success);
                }
                .notification-icon {
                    font-size: 1.5rem;
                }
                .notification-success .notification-icon {
                    color: var(--color-success);
                }
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(notification);

        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    },

    /**
     * Get language icon
     */
    getLanguageIcon(lang) {
        const icons = {
            html: '&#127959;',
            css: '&#127912;',
            js: '&#128640;'
        };
        return icons[lang] || '&#128187;';
    },

    /**
     * Get language name
     */
    getLanguageName(lang) {
        const names = {
            html: 'HTML',
            css: 'CSS',
            js: 'JavaScript'
        };
        return names[lang] || lang.toUpperCase();
    },

    /**
     * Format time (seconds to readable string)
     */
    formatTime(seconds) {
        if (seconds < 60) return `${seconds} ${i18n.t('time.sec')}`;
        if (seconds < 3600) return `${Math.floor(seconds / 60)} ${i18n.t('time.min')}`;
        return `${Math.floor(seconds / 3600)} ${i18n.t('time.hour')}`;
    },

    /**
     * Format date
     */
    formatDate(dateString) {
        const date = new Date(dateString);
        const locale = i18n.currentLang === 'en' ? 'en-US' : 'ru-RU';
        return date.toLocaleDateString(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// Make available globally
window.App = App;
