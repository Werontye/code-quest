/**
 * CodeQuest API Module
 * Handles communication with the backend server
 */

const API = {
    baseURL: 'http://localhost:5000/api',

    // Get auth token from localStorage
    getToken() {
        return localStorage.getItem('codequest_token');
    },

    // Set auth token
    setToken(token) {
        localStorage.setItem('codequest_token', token);
    },

    // Remove auth token
    removeToken() {
        localStorage.removeItem('codequest_token');
    },

    // Get auth headers
    getHeaders() {
        const headers = {
            'Content-Type': 'application/json'
        };
        const token = this.getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        return headers;
    },

    // Generic fetch wrapper
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            ...options,
            headers: this.getHeaders()
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Request failed');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    // Auth endpoints
    auth: {
        async register(email, password, username) {
            const data = await API.request('/auth/register', {
                method: 'POST',
                body: JSON.stringify({ email, password, username })
            });
            if (data.token) {
                API.setToken(data.token);
                API.syncUserData(data.user);
            }
            return data;
        },

        async login(email, password) {
            const data = await API.request('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });
            if (data.token) {
                API.setToken(data.token);
                API.syncUserData(data.user);
            }
            return data;
        },

        async logout() {
            try {
                await API.request('/auth/logout', { method: 'POST' });
            } catch (e) {
                // Ignore errors on logout
            }
            API.removeToken();
        },

        async getMe() {
            return API.request('/auth/me');
        }
    },

    // User endpoints
    user: {
        async updateProfile(data) {
            return API.request('/users/profile', {
                method: 'PUT',
                body: JSON.stringify(data)
            });
        },

        async updateProgress(course, levelId, levelTitle, xp, firstTry, fast) {
            return API.request('/users/progress', {
                method: 'POST',
                body: JSON.stringify({ course, levelId, levelTitle, xp, firstTry, fast })
            });
        },

        async addAchievement(achievementId) {
            return API.request('/users/achievements', {
                method: 'POST',
                body: JSON.stringify({ achievementId })
            });
        },

        async resetProgress() {
            return API.request('/users/reset', { method: 'POST' });
        },

        async getLeaderboard() {
            return API.request('/users/leaderboard');
        }
    },

    // Admin endpoints
    admin: {
        async getUsers(page = 1, limit = 20) {
            return API.request(`/admin/users?page=${page}&limit=${limit}`);
        },

        async getStats() {
            return API.request('/admin/stats');
        },

        async getActivity(days = 30) {
            return API.request(`/admin/activity?days=${days}`);
        },

        async getUserDetails(userId) {
            return API.request(`/admin/users/${userId}`);
        },

        async updateUserRole(userId, role) {
            return API.request(`/admin/users/${userId}/role`, {
                method: 'PUT',
                body: JSON.stringify({ role })
            });
        },

        async deleteUser(userId) {
            return API.request(`/admin/users/${userId}`, { method: 'DELETE' });
        }
    },

    // Sync user data to localStorage (for offline support)
    syncUserData(user) {
        if (!user) return;

        const userData = {
            id: user.id,
            email: user.email,
            username: user.username,
            avatar: user.avatar,
            bio: user.bio,
            xp: user.xp,
            rank: user.rank,
            dailyGoal: user.dailyGoal,
            progress: user.progress,
            achievements: user.achievements,
            stats: user.stats,
            weeklyXP: user.weeklyXP,
            recentActivity: user.recentActivity
        };

        localStorage.setItem('codequest_user', JSON.stringify(userData));
    },

    // Get cached user data
    getCachedUser() {
        const data = localStorage.getItem('codequest_user');
        return data ? JSON.parse(data) : null;
    },

    // Check if user is logged in
    isLoggedIn() {
        return !!this.getToken();
    },

    // Check if user is admin
    async isAdmin() {
        if (!this.isLoggedIn()) return false;
        try {
            const { user } = await this.auth.getMe();
            return user.role === 'admin';
        } catch {
            return false;
        }
    }
};

// Make API available globally
window.API = API;
