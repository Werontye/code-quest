// Auto-generated version for cache busting
// Generated: 2026-02-02T17:36:14.280Z
const APP_VERSION = '2.2.0';
const BUILD_TIMESTAMP = 1770053774275;
const CACHE_VERSION = '2.2.0-1770053774275';

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { APP_VERSION, BUILD_TIMESTAMP, CACHE_VERSION };
}

// Cache control utilities
const CacheControl = {
    version: APP_VERSION,
    timestamp: BUILD_TIMESTAMP,

    async clearAllCaches() {
        if ('caches' in window) {
            const cacheNames = await caches.keys();
            await Promise.all(cacheNames.map(name => caches.delete(name)));
            console.log('[CacheControl] All caches cleared');
        }
        localStorage.removeItem('codequest_cache_version');
    },

    needsUpdate() {
        const storedVersion = localStorage.getItem('codequest_cache_version');
        if (storedVersion !== CACHE_VERSION) {
            localStorage.setItem('codequest_cache_version', CACHE_VERSION);
            return true;
        }
        return false;
    },

    forceReload() {
        this.clearAllCaches().then(() => {
            window.location.reload(true);
        });
    },

    init() {
        if (this.needsUpdate()) {
            console.log('[CacheControl] New version detected: ' + CACHE_VERSION);
            this.clearAllCaches();
        }
    }
};

if (typeof window !== 'undefined') {
    window.CacheControl = CacheControl;
    document.addEventListener('DOMContentLoaded', () => CacheControl.init());
}
