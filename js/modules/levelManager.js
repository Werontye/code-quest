/**
 * Level Manager Module - Handles game level logic
 */

const LevelManager = {
    currentLevel: null,
    currentLang: null,
    attempts: 0,
    startTime: null,

    /**
     * Initialize level manager on game page
     */
    init() {
        // Get level info from URL
        const urlParams = new URLSearchParams(window.location.search);
        this.currentLang = urlParams.get('lang') || 'html';
        const levelId = urlParams.get('level');

        // Get levels for current language
        const levels = this.getLevelsForLang(this.currentLang);

        // Find current level
        if (levelId) {
            this.currentLevel = levels.find(l => l.id === levelId);
        }

        if (!this.currentLevel && levels.length > 0) {
            // Default to first level or current progress
            const userData = Storage.getUserData();
            const currentIndex = userData.progress[this.currentLang]?.current || 1;
            this.currentLevel = levels[Math.min(currentIndex - 1, levels.length - 1)];
        }

        if (this.currentLevel) {
            this.attempts = 0;
            this.startTime = Date.now();
            this.renderLevel();
            this.setupEventListeners();
            this.updateUI();
        } else {
            console.error('No level found');
        }
    },

    /**
     * Get levels array for language
     */
    getLevelsForLang(lang) {
        switch (lang) {
            case 'html': return window.htmlLevels || [];
            case 'css': return window.cssLevels || [];
            case 'js': return window.jsLevels || [];
            default: return [];
        }
    },

    /**
     * Render current level
     */
    renderLevel() {
        const level = this.currentLevel;
        if (!level) return;

        // Update page theme
        document.body.className = `theme-${this.currentLang}`;

        // Update level info
        const levels = this.getLevelsForLang(this.currentLang);
        const levelIndex = levels.indexOf(level) + 1;

        document.getElementById('levelNumber').textContent = `Уровень ${levelIndex}`;
        document.getElementById('levelTitle').textContent = level.title;
        document.getElementById('levelDescription').textContent = level.description;
        document.getElementById('taskText').textContent = level.task;

        // Update header counter
        document.getElementById('levelCounter').textContent =
            `Уровень ${levelIndex} / ${levels.length}`;

        // Update difficulty stars
        const difficultyEl = document.getElementById('levelDifficulty');
        difficultyEl.innerHTML = '';
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('span');
            star.className = `difficulty-star ${i <= level.difficulty ? 'filled' : ''}`;
            star.innerHTML = '&#9733;';
            difficultyEl.appendChild(star);
        }

        // Update hint
        document.getElementById('hintText').textContent = level.hint;

        // Update levels link
        document.getElementById('btnLevels').href = `levels.html?lang=${this.currentLang}`;

        // Setup editor based on level type
        if (level.type === 'fill-blank') {
            this.setupFillBlankMode();
        } else {
            this.setupFullEditorMode();
        }

        // Update navigation buttons
        this.updateNavButtons();

        // Update header XP
        const userData = Storage.getUserData();
        document.getElementById('headerXP').textContent = userData.xp + ' XP';

        // Render visual area
        this.renderVisual();
    },

    /**
     * Setup fill-in-the-blank mode
     */
    setupFillBlankMode() {
        const level = this.currentLevel;
        const fillBlankEditor = document.getElementById('fillBlankEditor');
        const fullEditor = document.getElementById('fullEditor');
        const codeTemplate = document.getElementById('codeTemplate');

        fillBlankEditor.classList.remove('hidden');
        fullEditor.classList.add('hidden');

        // Create template with input fields
        let template = level.template;
        let blankIndex = 0;

        // Support both [[TAG]] and ___ patterns
        let html = template;

        // Replace [[TAG]] or [[ANY]] patterns (same blank used twice for opening/closing tags)
        html = html.replace(/\[\[([^\]]+)\]\]/g, () => {
            const label = level.blankLabels && level.blankLabels[blankIndex] ? level.blankLabels[blankIndex] : '...';
            const input = `<input type="text" class="blank-input" data-index="${blankIndex}" placeholder="${label}">`;
            // Don't increment for paired tags - they share the same input value
            return input;
        });

        // Also support ___ pattern for backward compatibility
        html = html.replace(/___/g, () => {
            const label = level.blankLabels && level.blankLabels[blankIndex] ? level.blankLabels[blankIndex] : '...';
            const input = `<input type="text" class="blank-input" data-index="${blankIndex}" placeholder="${label}">`;
            blankIndex++;
            return input;
        });

        codeTemplate.innerHTML = html;

        // Sync paired inputs (for opening/closing tags)
        const inputs = codeTemplate.querySelectorAll('.blank-input');
        const inputGroups = {};

        inputs.forEach((input, idx) => {
            const dataIndex = input.getAttribute('data-index');
            if (!inputGroups[dataIndex]) {
                inputGroups[dataIndex] = [];
            }
            inputGroups[dataIndex].push(input);
        });

        // Sync values for paired inputs
        Object.values(inputGroups).forEach(group => {
            if (group.length > 1) {
                group.forEach(input => {
                    input.addEventListener('input', (e) => {
                        group.forEach(otherInput => {
                            if (otherInput !== e.target) {
                                otherInput.value = e.target.value;
                            }
                        });
                    });
                });
            }
        });

        // Focus first input
        const firstInput = codeTemplate.querySelector('.blank-input');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }

        // Get unique inputs for navigation
        const uniqueInputs = [];
        const seenIndices = new Set();
        inputs.forEach(input => {
            const idx = input.getAttribute('data-index');
            if (!seenIndices.has(idx)) {
                seenIndices.add(idx);
                uniqueInputs.push(input);
            }
        });

        // Handle Tab navigation between inputs
        uniqueInputs.forEach((input, idx) => {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Tab' && !e.shiftKey && idx < uniqueInputs.length - 1) {
                    e.preventDefault();
                    uniqueInputs[idx + 1].focus();
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    document.getElementById('btnRun').click();
                }
            });
        });
    },

    /**
     * Setup full editor mode
     */
    setupFullEditorMode() {
        const level = this.currentLevel;
        const fillBlankEditor = document.getElementById('fillBlankEditor');
        const fullEditor = document.getElementById('fullEditor');
        const codeInput = document.getElementById('codeInput');

        fillBlankEditor.classList.add('hidden');
        fullEditor.classList.remove('hidden');

        codeInput.value = level.starterCode || '';
        this.updateLineNumbers();

        // Focus editor
        setTimeout(() => codeInput.focus(), 100);
    },

    /**
     * Update line numbers
     */
    updateLineNumbers() {
        const codeInput = document.getElementById('codeInput');
        const lineNumbers = document.getElementById('lineNumbers');

        const lines = codeInput.value.split('\n').length;
        lineNumbers.innerHTML = Array.from({ length: lines }, (_, i) =>
            `<span class="line-number">${i + 1}</span>`
        ).join('');
    },

    /**
     * Render visual representation
     */
    renderVisual() {
        const visualContent = document.getElementById('visualContent');
        const level = this.currentLevel;

        // Default visual based on language
        switch (this.currentLang) {
            case 'html':
                visualContent.innerHTML = this.getHTMLVisual(level);
                break;
            case 'css':
                visualContent.innerHTML = this.getCSSVisual(level);
                break;
            case 'js':
                visualContent.innerHTML = this.getJSVisual(level);
                break;
        }
    },

    /**
     * Get HTML themed visual
     */
    getHTMLVisual(level) {
        return `
            <div class="building-scene">
                <div class="construction-site">
                    <div class="building-frame">
                        <div class="building-floor"></div>
                        <div class="building-floor"></div>
                        <div class="building-floor empty"></div>
                    </div>
                    <div class="crane-container">
                        <div class="crane-arm"></div>
                        <div class="crane-cable">
                            <div class="crane-hook"></div>
                        </div>
                    </div>
                </div>
                <div class="ground"></div>
            </div>
        `;
    },

    /**
     * Get CSS themed visual
     */
    getCSSVisual(level) {
        return `
            <div class="canvas-area">
                <div class="easel" id="stylePreview">
                    <div class="preview-element">
                        Стилизуй меня!
                    </div>
                </div>
                <div class="palette-widget">
                    <span class="palette-color"></span>
                    <span class="palette-color"></span>
                    <span class="palette-color"></span>
                    <span class="palette-color"></span>
                    <span class="palette-color"></span>
                </div>
            </div>
        `;
    },

    /**
     * Get JavaScript themed visual
     */
    getJSVisual(level) {
        return `
            <div class="control-panel">
                <div class="panel-header">
                    <span class="panel-title">// Консоль</span>
                    <div class="status-indicator">
                        <span class="status-dot online"></span>
                        <span>Online</span>
                    </div>
                </div>
                <div class="console-output" id="consoleOutput">
                    <div class="console-line log">Ожидание кода...</div>
                </div>
            </div>
        `;
    },

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Run button
        document.getElementById('btnRun').addEventListener('click', () => {
            this.checkAnswer();
        });

        // Reset button
        document.getElementById('btnReset').addEventListener('click', () => {
            this.resetLevel();
        });

        // Hint button
        document.getElementById('btnHint').addEventListener('click', () => {
            this.showHint();
        });

        // Navigation
        document.getElementById('btnPrev').addEventListener('click', () => {
            this.goToPrevLevel();
        });

        document.getElementById('btnNext').addEventListener('click', () => {
            this.goToNextLevel();
        });

        // Success overlay buttons
        document.getElementById('btnNextLevel').addEventListener('click', () => {
            this.goToNextLevel();
        });

        document.getElementById('btnRetry').addEventListener('click', () => {
            this.hideSuccess();
            this.resetLevel();
        });

        // Code input events
        const codeInput = document.getElementById('codeInput');
        codeInput.addEventListener('input', () => {
            this.updateLineNumbers();
            this.updatePreview();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                this.checkAnswer();
            }
        });
    },

    /**
     * Check user's answer
     */
    checkAnswer() {
        this.attempts++;
        const level = this.currentLevel;
        let result;

        if (level.type === 'fill-blank') {
            // Collect unique blank inputs (by data-index)
            const inputs = document.querySelectorAll('.blank-input');
            const uniqueValues = {};
            const uniqueInputs = {};

            inputs.forEach(input => {
                const idx = input.getAttribute('data-index');
                if (!uniqueValues.hasOwnProperty(idx)) {
                    uniqueValues[idx] = input.value;
                    uniqueInputs[idx] = [input];
                } else {
                    uniqueInputs[idx].push(input);
                }
            });

            // Get values in order
            const userBlanks = Object.keys(uniqueValues).sort((a, b) => parseInt(a) - parseInt(b)).map(k => uniqueValues[k]);

            result = CodeValidator.validateFillBlank(userBlanks, level.blanks);

            // Update input styles for all inputs (including paired ones)
            Object.keys(uniqueInputs).sort((a, b) => parseInt(a) - parseInt(b)).forEach((idx, i) => {
                const isCorrect = result.results && result.results[i] && result.results[i].isCorrect;
                uniqueInputs[idx].forEach(input => {
                    input.classList.remove('correct', 'incorrect');
                    input.classList.add(isCorrect ? 'correct' : 'incorrect');
                });
            });
        } else {
            // Full editor mode
            const userCode = document.getElementById('codeInput').value;
            result = CodeValidator.validateFullEditor(userCode, level.validation);
        }

        // Update status
        const statusIcon = document.getElementById('statusIcon');
        const statusText = document.getElementById('statusText');

        if (result.success) {
            statusIcon.className = 'status-icon ready';
            statusText.textContent = 'Верно!';
            this.handleSuccess();
        } else {
            statusIcon.className = 'status-icon error';
            statusText.textContent = result.message;

            // Shake animation
            const editor = document.getElementById('codeEditor');
            editor.classList.add('animate-shake');
            setTimeout(() => editor.classList.remove('animate-shake'), 500);
        }

        // Update preview
        this.updatePreview();
    },

    /**
     * Handle successful completion
     */
    handleSuccess() {
        const level = this.currentLevel;
        const timeSpent = Math.floor((Date.now() - this.startTime) / 1000);
        const isFirstTry = this.attempts === 1;
        const isFast = timeSpent < 60;

        // Calculate XP
        let xp = level.xp || 10;
        if (isFirstTry) xp += 10;
        if (isFast) xp += 5;

        // Save progress
        const isNewCompletion = !Storage.isLevelCompleted(this.currentLang, level.id);

        if (isNewCompletion) {
            Storage.completeLevel(this.currentLang, level.id, xp, isFirstTry, isFast);
            Storage.addXP(xp);
        }

        // Check achievements
        const newAchievements = Achievements.checkAchievements();
        if (newAchievements.length > 0) {
            // Show first achievement
            setTimeout(() => {
                Achievements.showPopup(newAchievements[0]);
            }, 1500);
        }

        // Show success overlay
        this.showSuccess(xp, this.attempts);

        // Update header XP
        const userData = Storage.getUserData();
        document.getElementById('headerXP').textContent = userData.xp + ' XP';

        // Show XP animation
        this.showXPAnimation(xp);
    },

    /**
     * Show success overlay
     */
    showSuccess(xp, attempts) {
        const overlay = document.getElementById('successOverlay');
        document.getElementById('earnedXP').textContent = '+' + xp;
        document.getElementById('attemptCount').textContent = attempts;
        overlay.classList.remove('hidden');
    },

    /**
     * Hide success overlay
     */
    hideSuccess() {
        const overlay = document.getElementById('successOverlay');
        overlay.classList.add('hidden');
    },

    /**
     * Show XP gain animation
     */
    showXPAnimation(xp) {
        const el = document.createElement('div');
        el.className = 'xp-gain';
        el.textContent = '+' + xp + ' XP';
        document.body.appendChild(el);

        setTimeout(() => {
            el.remove();
        }, 1500);
    },

    /**
     * Reset level
     */
    resetLevel() {
        this.attempts = 0;
        this.startTime = Date.now();

        if (this.currentLevel.type === 'fill-blank') {
            const inputs = document.querySelectorAll('.blank-input');
            inputs.forEach(input => {
                input.value = '';
                input.classList.remove('correct', 'incorrect');
            });

            if (inputs[0]) inputs[0].focus();
        } else {
            const codeInput = document.getElementById('codeInput');
            codeInput.value = this.currentLevel.starterCode || '';
            this.updateLineNumbers();
            codeInput.focus();
        }

        // Reset status
        const statusIcon = document.getElementById('statusIcon');
        const statusText = document.getElementById('statusText');
        statusIcon.className = 'status-icon';
        statusText.textContent = 'Готов к проверке';

        // Reset preview
        this.renderVisual();
    },

    /**
     * Show hint
     */
    showHint() {
        const hintBox = document.getElementById('hintBox');
        hintBox.classList.toggle('hidden');
    },

    /**
     * Update preview based on user code
     */
    updatePreview() {
        const level = this.currentLevel;

        if (this.currentLang === 'html') {
            // Show HTML preview
            let userCode;
            if (level.type === 'fill-blank') {
                const inputs = document.querySelectorAll('.blank-input');
                const userBlanks = Array.from(inputs).map(input => input.value);
                userCode = CodeValidator.buildCodeFromTemplate(level.template, userBlanks);
            } else {
                userCode = document.getElementById('codeInput').value;
            }

            const resultPreview = document.getElementById('resultPreview');
            if (resultPreview) {
                resultPreview.innerHTML = CodeValidator.getHTMLPreview(userCode);
            }
        } else if (this.currentLang === 'css') {
            // Apply CSS to preview element
            // CSS preview handled in visual area
        } else if (this.currentLang === 'js') {
            // JS preview - show console output
            // Handled in checkAnswer
        }
    },

    /**
     * Update navigation buttons
     */
    updateNavButtons() {
        const levels = this.getLevelsForLang(this.currentLang);
        const currentIndex = levels.indexOf(this.currentLevel);

        document.getElementById('btnPrev').disabled = currentIndex === 0;
        document.getElementById('btnNext').disabled = currentIndex === levels.length - 1;
    },

    /**
     * Go to previous level
     */
    goToPrevLevel() {
        const levels = this.getLevelsForLang(this.currentLang);
        const currentIndex = levels.indexOf(this.currentLevel);

        if (currentIndex > 0) {
            this.hideSuccess();
            this.currentLevel = levels[currentIndex - 1];
            this.attempts = 0;
            this.startTime = Date.now();
            this.renderLevel();

            // Update URL
            const newUrl = `game.html?lang=${this.currentLang}&level=${this.currentLevel.id}`;
            history.pushState(null, '', newUrl);
        }
    },

    /**
     * Go to next level
     */
    goToNextLevel() {
        const levels = this.getLevelsForLang(this.currentLang);
        const currentIndex = levels.indexOf(this.currentLevel);

        if (currentIndex < levels.length - 1) {
            this.hideSuccess();
            this.currentLevel = levels[currentIndex + 1];
            this.attempts = 0;
            this.startTime = Date.now();
            this.renderLevel();

            // Update URL
            const newUrl = `game.html?lang=${this.currentLang}&level=${this.currentLevel.id}`;
            history.pushState(null, '', newUrl);
        } else {
            // All levels completed - go back to levels page
            window.location.href = `levels.html?lang=${this.currentLang}`;
        }
    },

    /**
     * Update UI elements
     */
    updateUI() {
        // Additional UI updates if needed
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Only init on game page
    if (document.querySelector('.game-page')) {
        LevelManager.init();
    }
});

// Make available globally
window.LevelManager = LevelManager;
