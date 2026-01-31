#!/usr/bin/env node

/**
 * Build script for CodeQuest
 * Updates version timestamps for cache busting
 */

const fs = require('fs');
const path = require('path');

const VERSION = '2.2.0';
const TIMESTAMP = Date.now();
const CACHE_BUSTER = `v=${VERSION}.${TIMESTAMP}`;

console.log(`\n🔧 CodeQuest Build Script`);
console.log(`📦 Version: ${VERSION}`);
console.log(`⏰ Timestamp: ${TIMESTAMP}`);
console.log(`🔑 Cache Buster: ${CACHE_BUSTER}\n`);

// Update version.js
const versionContent = `// Auto-generated version for cache busting
// Generated: ${new Date().toISOString()}
const APP_VERSION = '${VERSION}';
const BUILD_TIMESTAMP = ${TIMESTAMP};
const CACHE_VERSION = '${VERSION}-${TIMESTAMP}';

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
`;

fs.writeFileSync(path.join(__dirname, 'js', 'version.js'), versionContent);
console.log('✅ Updated js/version.js');

// HTML files to update
const htmlFiles = [
    'index.html',
    'pages/game.html',
    'pages/levels.html',
    'pages/profile.html',
    'pages/theory.html'
];

// Update HTML files with cache busting
htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);

    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  File not found: ${file}`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // Update CSS links: href="...css" or href="...css?v=..."
    content = content.replace(
        /href="([^"]*\.css)(\?[^"]*)?"/g,
        `href="$1?${CACHE_BUSTER}"`
    );

    // Update JS scripts: src="...js" or src="...js?v=..."
    content = content.replace(
        /src="([^"]*\.js)(\?[^"]*)?"/g,
        `src="$1?${CACHE_BUSTER}"`
    );

    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated ${file}`);
});

console.log(`\n🎉 Build complete!\n`);
