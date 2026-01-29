/**
 * Authentication Module - Handles user authentication
 * Note: This is a mock implementation. For production, integrate with Firebase, Auth0, or custom backend.
 */

const Auth = {
    user: null,
    listeners: [],

    /**
     * Initialize auth module
     */
    init() {
        // Check for existing session
        const savedUser = localStorage.getItem('codequest_user');
        if (savedUser) {
            try {
                this.user = JSON.parse(savedUser);
                this.notifyListeners();
            } catch (e) {
                localStorage.removeItem('codequest_user');
            }
        }

        this.setupEventListeners();
    },

    /**
     * Setup event listeners for auth modal
     */
    setupEventListeners() {
        // Close modal
        const closeModal = document.getElementById('closeModal');
        if (closeModal) {
            closeModal.addEventListener('click', () => this.hideModal());
        }

        // Close on overlay click
        const modalOverlay = document.querySelector('.modal-overlay');
        if (modalOverlay) {
            modalOverlay.addEventListener('click', () => this.hideModal());
        }

        // Email auth form
        const emailForm = document.getElementById('emailAuthForm');
        if (emailForm) {
            emailForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleEmailAuth(e.target);
            });
        }

        // GitHub auth
        const githubBtn = document.querySelector('.auth-btn--github');
        if (githubBtn) {
            githubBtn.addEventListener('click', () => this.handleGitHubAuth());
        }

        // Google auth
        const googleBtn = document.querySelector('.auth-btn--google');
        if (googleBtn) {
            googleBtn.addEventListener('click', () => this.handleGoogleAuth());
        }

        // Switch to register
        const switchToRegister = document.getElementById('switchToRegister');
        if (switchToRegister) {
            switchToRegister.addEventListener('click', (e) => {
                e.preventDefault();
                this.showRegisterMode();
            });
        }
    },

    /**
     * Show login modal
     */
    showModal() {
        const modal = document.getElementById('loginModal');
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    },

    /**
     * Hide login modal
     */
    hideModal() {
        const modal = document.getElementById('loginModal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    },

    /**
     * Show register mode in modal
     */
    showRegisterMode() {
        const title = document.querySelector('.modal-title');
        const subtitle = document.querySelector('.modal-subtitle');
        const submitBtn = document.querySelector('.auth-submit');
        const switchLink = document.getElementById('switchToRegister');

        if (title) title.textContent = i18n ? i18n.t('auth.register') : 'Регистрация';
        if (subtitle) subtitle.textContent = 'Создай аккаунт и сохрани свой прогресс';
        if (submitBtn) submitBtn.textContent = 'Зарегистрироваться';
        if (switchLink) {
            switchLink.textContent = 'Войти';
            switchLink.onclick = (e) => {
                e.preventDefault();
                this.showLoginMode();
            };
        }
    },

    /**
     * Show login mode in modal
     */
    showLoginMode() {
        const title = document.querySelector('.modal-title');
        const subtitle = document.querySelector('.modal-subtitle');
        const submitBtn = document.querySelector('.auth-submit');
        const switchLink = document.getElementById('switchToRegister');

        if (title) title.textContent = i18n ? i18n.t('auth.login') : 'Войти в аккаунт';
        if (subtitle) subtitle.textContent = i18n ? i18n.t('auth.subtitle') : 'Сохрани свой прогресс в облаке';
        if (submitBtn) submitBtn.textContent = i18n ? i18n.t('auth.submit') : 'Войти';
        if (switchLink) {
            switchLink.textContent = i18n ? i18n.t('auth.register') : 'Зарегистрироваться';
            switchLink.onclick = (e) => {
                e.preventDefault();
                this.showRegisterMode();
            };
        }
    },

    /**
     * Handle email authentication
     */
    async handleEmailAuth(form) {
        const email = form.querySelector('input[type="email"]').value;
        const password = form.querySelector('input[type="password"]').value;

        if (!email || !password) {
            this.showError('Заполните все поля');
            return;
        }

        // Mock authentication - replace with actual backend call
        try {
            // Simulate API call
            await this.simulateApiCall();

            // Create mock user
            this.user = {
                id: this.generateId(),
                email: email,
                displayName: email.split('@')[0],
                provider: 'email',
                createdAt: new Date().toISOString()
            };

            this.saveUser();
            this.hideModal();
            this.notifyListeners();
            this.showSuccess('Вы успешно вошли!');

        } catch (error) {
            this.showError('Ошибка авторизации');
        }
    },

    /**
     * Handle GitHub authentication
     */
    async handleGitHubAuth() {
        // In production, redirect to GitHub OAuth
        // For now, show info message
        this.showInfo('GitHub авторизация требует настройки OAuth. Для демонстрации используйте email.');

        // Mock implementation
        /*
        const clientId = 'YOUR_GITHUB_CLIENT_ID';
        const redirectUri = encodeURIComponent(window.location.origin + '/auth/github/callback');
        const scope = 'read:user user:email';
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
        */
    },

    /**
     * Handle Google authentication
     */
    async handleGoogleAuth() {
        // In production, use Google Sign-In SDK
        // For now, show info message
        this.showInfo('Google авторизация требует настройки OAuth. Для демонстрации используйте email.');

        // Mock implementation
        /*
        // Load Google Sign-In SDK and initialize
        google.accounts.id.initialize({
            client_id: 'YOUR_GOOGLE_CLIENT_ID',
            callback: this.handleGoogleCallback.bind(this)
        });
        google.accounts.id.prompt();
        */
    },

    /**
     * Logout user
     */
    logout() {
        this.user = null;
        localStorage.removeItem('codequest_user');
        this.notifyListeners();
        this.showSuccess('Вы вышли из аккаунта');
    },

    /**
     * Check if user is logged in
     */
    isLoggedIn() {
        return this.user !== null;
    },

    /**
     * Get current user
     */
    getUser() {
        return this.user;
    },

    /**
     * Save user to localStorage
     */
    saveUser() {
        if (this.user) {
            localStorage.setItem('codequest_user', JSON.stringify(this.user));
        }
    },

    /**
     * Add auth state change listener
     */
    onAuthStateChange(callback) {
        this.listeners.push(callback);
        // Call immediately with current state
        callback(this.user);
    },

    /**
     * Notify all listeners of auth state change
     */
    notifyListeners() {
        this.listeners.forEach(callback => callback(this.user));
    },

    /**
     * Simulate API call (for demo purposes)
     */
    simulateApiCall() {
        return new Promise((resolve) => {
            setTimeout(resolve, 500);
        });
    },

    /**
     * Generate unique ID
     */
    generateId() {
        return 'user_' + Math.random().toString(36).substr(2, 9);
    },

    /**
     * Show error message
     */
    showError(message) {
        this.showNotification(message, 'error');
    },

    /**
     * Show success message
     */
    showSuccess(message) {
        this.showNotification(message, 'success');
    },

    /**
     * Show info message
     */
    showInfo(message) {
        this.showNotification(message, 'info');
    },

    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span class="notification-icon">${this.getNotificationIcon(type)}</span>
            <span class="notification-text">${message}</span>
        `;

        // Add notification styles if not present
        if (!document.getElementById('authNotificationStyles')) {
            const styles = document.createElement('style');
            styles.id = 'authNotificationStyles';
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
                    z-index: 1100;
                    animation: slideInRight 0.3s ease;
                }
                .notification-success { border-left: 4px solid var(--color-success); }
                .notification-error { border-left: 4px solid var(--color-error); }
                .notification-info { border-left: 4px solid var(--color-primary); }
                .notification-icon { font-size: 1.25rem; }
                .notification-success .notification-icon { color: var(--color-success); }
                .notification-error .notification-icon { color: var(--color-error); }
                .notification-info .notification-icon { color: var(--color-primary); }
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
     * Get notification icon
     */
    getNotificationIcon(type) {
        const icons = {
            success: '&#10003;',
            error: '&#10007;',
            info: '&#8505;'
        };
        return icons[type] || icons.info;
    },

    /**
     * Sync user progress to cloud (mock)
     */
    async syncProgress() {
        if (!this.isLoggedIn()) return;

        const userData = Storage.getUserData();
        // In production, send to backend
        console.log('Syncing progress to cloud...', userData);

        // Mock sync
        await this.simulateApiCall();
        console.log('Progress synced!');
    },

    /**
     * Load progress from cloud (mock)
     */
    async loadProgress() {
        if (!this.isLoggedIn()) return;

        // In production, fetch from backend
        console.log('Loading progress from cloud...');

        // Mock load
        await this.simulateApiCall();
        console.log('Progress loaded!');
    }
};

// Make available globally
window.Auth = Auth;

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    Auth.init();
});
