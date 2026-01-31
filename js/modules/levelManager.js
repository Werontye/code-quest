/**
 * Level Manager Module - Handles game level logic
 */

const LevelManager = {
    currentLevel: null,
    currentLang: null,
    attempts: 0,
    startTime: null,
    isLevelCompleted: false,
    hintUsed: false,

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
            this.isLevelCompleted = false;
            this.hintUsed = false;
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
            case 'ts': return window.tsLevels || [];
            case 'react': return window.reactLevels || [];
            case 'node': return window.nodeLevels || [];
            case 'python': return window.pythonLevels || [];
            case 'git': return window.gitLevels || [];
            case 'figma': return window.figmaLevels || [];
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
        document.getElementById('levelTitle').innerHTML = level.title;
        document.getElementById('levelDescription').innerHTML = level.description;
        document.getElementById('taskText').innerHTML = level.task;

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
        document.getElementById('hintText').innerHTML = level.hint;

        // Update levels link
        document.getElementById('btnLevels').href = `levels.html?lang=${this.currentLang}`;

        // Setup editor based on level type
        if (level.type === 'quiz') {
            this.setupQuizMode();
        } else if (level.type === 'fill-blank') {
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

        // Initial preview update
        setTimeout(() => this.updatePreview(), 100);
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
        const namedBlanks = {}; // Track [[NAME]] patterns for pairing

        // First, escape HTML to display code as text (but preserve our placeholders)
        // Replace placeholders temporarily
        const placeholders = [];
        let tempTemplate = template.replace(/\[\[([^\]]+)\]\]/g, (match) => {
            placeholders.push({ type: 'named', value: match });
            return `__PLACEHOLDER_${placeholders.length - 1}__`;
        });
        tempTemplate = tempTemplate.replace(/___/g, () => {
            placeholders.push({ type: 'simple', value: '___' });
            return `__PLACEHOLDER_${placeholders.length - 1}__`;
        });

        // Escape HTML
        tempTemplate = tempTemplate
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        // Restore placeholders
        placeholders.forEach((p, i) => {
            tempTemplate = tempTemplate.replace(`__PLACEHOLDER_${i}__`, p.value);
        });

        // Support both [[TAG]] and ___ patterns
        let html = tempTemplate;

        // First pass: Replace [[NAME]] patterns
        // Same [[NAME]] appearing multiple times share the same index (for opening/closing tags)
        html = html.replace(/\[\[([^\]]+)\]\]/g, (match, name) => {
            if (namedBlanks.hasOwnProperty(name)) {
                // Reuse existing index for paired tags (opening/closing)
                const existingIndex = namedBlanks[name];
                const label = level.blankLabels && level.blankLabels[existingIndex] ? level.blankLabels[existingIndex] : '...';
                return `<input type="text" class="blank-input" data-index="${existingIndex}" placeholder="${label}">`;
            } else {
                // New named blank - assign new index
                namedBlanks[name] = blankIndex;
                const label = level.blankLabels && level.blankLabels[blankIndex] ? level.blankLabels[blankIndex] : '...';
                const input = `<input type="text" class="blank-input" data-index="${blankIndex}" placeholder="${label}">`;
                blankIndex++;
                return input;
            }
        });

        // Second pass: Replace ___ patterns (each gets unique index)
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

        // Sync values for paired inputs and update preview
        Object.values(inputGroups).forEach(group => {
            group.forEach(input => {
                input.addEventListener('input', (e) => {
                    // Sync paired inputs
                    if (group.length > 1) {
                        group.forEach(otherInput => {
                            if (otherInput !== e.target) {
                                otherInput.value = e.target.value;
                            }
                        });
                    }
                    // Update preview in real-time
                    this.updatePreview();
                });
            });
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
                    // Prevent multiple submissions after level is completed
                    if (!this.isLevelCompleted) {
                        document.getElementById('btnRun').click();
                    }
                }
            });
        });
    },

    /**
     * Setup quiz mode for Figma-style multiple choice
     */
    setupQuizMode() {
        const level = this.currentLevel;
        const fillBlankEditor = document.getElementById('fillBlankEditor');
        const fullEditor = document.getElementById('fullEditor');
        const codeTemplate = document.getElementById('codeTemplate');

        fillBlankEditor.classList.remove('hidden');
        fullEditor.classList.add('hidden');

        // Build quiz options HTML
        const optionLetters = ['A', 'B', 'C', 'D'];
        let optionsHtml = level.options.map((option, index) => `
            <div class="quiz-option" data-index="${index}">
                <span class="quiz-option-marker">${optionLetters[index]}</span>
                <span class="quiz-option-text">${option}</span>
            </div>
        `).join('');

        codeTemplate.innerHTML = `
            <div class="quiz-editor">
                <div class="quiz-question">${level.question}</div>
                <div class="quiz-options">
                    ${optionsHtml}
                </div>
            </div>
        `;

        // Store selected answer
        this.selectedAnswer = null;

        // Add click handlers for options
        const options = codeTemplate.querySelectorAll('.quiz-option');
        options.forEach((option, index) => {
            option.addEventListener('click', () => {
                if (this.isLevelCompleted) return;

                // Deselect all
                options.forEach(opt => opt.classList.remove('selected'));
                // Select this one
                option.classList.add('selected');
                this.selectedAnswer = index;
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
     * Render visual representation with progress info
     * (Visual area has been removed - this function is now disabled)
     */
    renderVisual() {
        const visualContent = document.getElementById('visualContent');
        if (!visualContent) return; // Visual area removed

        const level = this.currentLevel;
        const userData = Storage.getUserData();
        const levels = this.getLevelsForLang(this.currentLang);
        const currentIndex = levels.indexOf(level) + 1;
        const completedLevels = userData.progress[this.currentLang]?.completed?.length || 0;
        const progressPercent = Math.round((completedLevels / levels.length) * 100);

        // Get theme-specific content
        let themeContent;
        switch (this.currentLang) {
            case 'html':
                themeContent = this.getHTMLVisual(level);
                break;
            case 'css':
                themeContent = this.getCSSVisual(level);
                break;
            case 'js':
                themeContent = this.getJSVisual(level);
                break;
            case 'ts':
                themeContent = this.getTSVisual(level);
                break;
            case 'react':
                themeContent = this.getReactVisual(level);
                break;
            case 'node':
                themeContent = this.getNodeVisual(level);
                break;
            case 'figma':
                themeContent = this.getFigmaVisual(level);
                break;
        }

        // Labels
        const completeLabel = 'Завершено';
        const levelsLabel = 'Уровней';
        const totalXpLabel = 'Всего XP';
        const rankLabel = 'Ранг';

        // Build visual with progress info
        visualContent.innerHTML = `
            <div class="visual-wrapper">
                <div class="progress-dashboard">
                    <div class="progress-ring-container">
                        <svg class="progress-ring" width="120" height="120">
                            <circle class="progress-ring-bg" cx="60" cy="60" r="52" />
                            <circle class="progress-ring-fill" cx="60" cy="60" r="52"
                                stroke-dasharray="${326.7}"
                                stroke-dashoffset="${326.7 - (326.7 * progressPercent / 100)}" />
                        </svg>
                        <div class="progress-ring-text">
                            <span class="progress-percent">${progressPercent}%</span>
                            <span class="progress-label">${completeLabel}</span>
                        </div>
                    </div>
                    <div class="progress-stats">
                        <div class="stat-item">
                            <span class="stat-icon">&#128218;</span>
                            <div class="stat-info">
                                <span class="stat-value">${completedLevels}/${levels.length}</span>
                                <span class="stat-label">${levelsLabel}</span>
                            </div>
                        </div>
                        <div class="stat-item">
                            <span class="stat-icon">&#11088;</span>
                            <div class="stat-info">
                                <span class="stat-value">${userData.xp || 0}</span>
                                <span class="stat-label">${totalXpLabel}</span>
                            </div>
                        </div>
                        <div class="stat-item">
                            <span class="stat-icon">&#127942;</span>
                            <div class="stat-info">
                                <span class="stat-value">${i18n ? i18n.getRankName(userData.rank || 1) : Storage.getRankName(userData.rank)}</span>
                                <span class="stat-label">${rankLabel}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="theme-visual">
                    ${themeContent}
                </div>
            </div>
        `;
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
                        <span>Онлайн</span>
                    </div>
                </div>
                <div class="console-output" id="consoleOutput">
                    <div class="console-line log">Ожидание кода...</div>
                </div>
            </div>
        `;
    },

    /**
     * Get TypeScript themed visual
     */
    getTSVisual(level) {
        return `
            <div class="ts-visual">
                <div class="type-checker">
                    <div class="type-icon">TS</div>
                    <div class="type-info">
                        <span class="type-title">Проверка типов</span>
                        <span class="type-status">Готов к проверке типов</span>
                    </div>
                </div>
                <div class="type-hints">
                    <div class="hint-item">
                        <span class="hint-icon">&#128269;</span>
                        <span>Статическая типизация</span>
                    </div>
                    <div class="hint-item">
                        <span class="hint-icon">&#9989;</span>
                        <span>Автодополнение</span>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Get React themed visual
     */
    getReactVisual(level) {
        return `
            <div class="react-visual">
                <div class="react-logo">
                    <div class="atom">
                        <div class="nucleus"></div>
                        <div class="orbit orbit-1"></div>
                        <div class="orbit orbit-2"></div>
                        <div class="orbit orbit-3"></div>
                    </div>
                </div>
                <div class="component-tree">
                    <div class="component root">&lt;App /&gt;</div>
                    <div class="component child">&lt;Component /&gt;</div>
                </div>
            </div>
        `;
    },

    /**
     * Get Node.js themed visual
     */
    getNodeVisual(level) {
        return `
            <div class="node-visual">
                <div class="server-icon">
                    <div class="server-box">
                        <div class="server-light"></div>
                        <div class="server-light"></div>
                        <div class="server-light"></div>
                    </div>
                </div>
                <div class="terminal-mini">
                    <div class="terminal-header">
                        <span class="terminal-dot"></span>
                        <span class="terminal-dot"></span>
                        <span class="terminal-dot"></span>
                    </div>
                    <div class="terminal-body">
                        <div class="terminal-line">$ node server.js</div>
                        <div class="terminal-line success">Server running...</div>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Get Figma themed visual
     */
    getFigmaVisual(level) {
        return `
            <div class="figma-canvas">
                <div class="figma-toolbar">
                    <div class="tool-icon active">V</div>
                    <div class="tool-icon">F</div>
                    <div class="tool-icon">R</div>
                    <div class="tool-icon">O</div>
                    <div class="tool-icon">T</div>
                </div>
                <div class="figma-frame">
                    <div class="figma-logo-animated">
                        <div class="figma-piece"></div>
                        <div class="figma-piece"></div>
                        <div class="figma-piece"></div>
                        <div class="figma-piece"></div>
                        <div class="figma-piece"></div>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Run button (Check answer)
        const btnRun = document.getElementById('btnRun');
        if (btnRun) {
            btnRun.addEventListener('click', () => {
                if (!this.isLevelCompleted) {
                    this.checkAnswer();
                }
            });
        }

        // Reset button
        const btnReset = document.getElementById('btnReset');
        if (btnReset) {
            btnReset.addEventListener('click', () => {
                this.resetLevel();
            });
        }

        // Hint button
        const btnHint = document.getElementById('btnHint');
        if (btnHint) {
            btnHint.addEventListener('click', () => {
                this.showHint();
            });
        }

        // Navigation
        const btnPrev = document.getElementById('btnPrev');
        if (btnPrev) {
            btnPrev.addEventListener('click', () => {
                this.goToPrevLevel();
            });
        }

        const btnNext = document.getElementById('btnNext');
        if (btnNext) {
            btnNext.addEventListener('click', () => {
                this.goToNextLevel();
            });
        }

        // Success overlay buttons
        const btnNextLevel = document.getElementById('btnNextLevel');
        if (btnNextLevel) {
            btnNextLevel.addEventListener('click', () => {
                this.goToNextLevel();
            });
        }

        const btnRetry = document.getElementById('btnRetry');
        if (btnRetry) {
            btnRetry.addEventListener('click', () => {
                this.hideSuccess();
                this.resetLevel();
            });
        }

        // Code input events
        const codeInput = document.getElementById('codeInput');
        if (codeInput) {
            codeInput.addEventListener('input', () => {
                this.updateLineNumbers();
                this.updatePreview();
            });
        }

        // Keyboard shortcuts (Ctrl+Enter to check)
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                if (!this.isLevelCompleted) {
                    this.checkAnswer();
                }
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

        if (level.type === 'quiz') {
            // Quiz mode - check selected answer
            if (this.selectedAnswer === null) {
                result = { success: false, message: 'Выберите ответ!' };
            } else {
                const isCorrect = this.selectedAnswer === level.correct;
                result = {
                    success: isCorrect,
                    message: isCorrect ? 'Верно!' : 'Неверно, попробуйте ещё раз!'
                };

                // Update option styles
                const options = document.querySelectorAll('.quiz-option');
                options.forEach((option, index) => {
                    option.classList.remove('selected');
                    if (index === level.correct) {
                        option.classList.add('correct');
                    } else if (index === this.selectedAnswer && !isCorrect) {
                        option.classList.add('incorrect');
                    }
                });
            }
        } else if (level.type === 'fill-blank') {
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
        // Mark level as completed to prevent re-submission
        this.isLevelCompleted = true;
        const level = this.currentLevel;
        const timeSpent = Math.floor((Date.now() - this.startTime) / 1000);
        const isFirstTry = this.attempts === 1;
        const isFast = timeSpent < 60;

        // Calculate XP
        let xp = level.xp || 10;
        if (isFirstTry) xp += 10;
        if (isFast) xp += 5;

        // Check if this is daily challenge (x2 XP)
        const dailyChallenge = Storage.getDailyChallenge();
        const isDailyChallenge = dailyChallenge &&
            dailyChallenge.course === this.currentLang &&
            dailyChallenge.levelId === level.id &&
            !Storage.isDailyChallengeCompleted();

        if (isDailyChallenge) {
            xp *= 2;
            Storage.completeDailyChallenge();
        }

        // Save progress
        const isNewCompletion = !Storage.isLevelCompleted(this.currentLang, level.id);

        if (isNewCompletion) {
            Storage.completeLevel(this.currentLang, level.id, xp, isFirstTry, isFast, level.title);
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
        this.isLevelCompleted = false;
        this.hintUsed = false;

        if (this.currentLevel.type === 'quiz') {
            const options = document.querySelectorAll('.quiz-option');
            options.forEach(option => {
                option.classList.remove('selected', 'correct', 'incorrect');
            });
            this.selectedAnswer = null;
        } else if (this.currentLevel.type === 'fill-blank') {
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
     * Show hint (costs 5 XP if not already shown)
     */
    showHint() {
        const hintBox = document.getElementById('hintBox');

        // If hint is already visible, just hide it
        if (!hintBox.classList.contains('hidden')) {
            hintBox.classList.add('hidden');
            return;
        }

        // If hint was already used this level, show for free
        if (this.hintUsed) {
            hintBox.classList.remove('hidden');
            return;
        }

        // Check if user has enough XP
        const userData = Storage.getUserData();
        const hintCost = 5;

        if (userData.xp < hintCost) {
            // Not enough XP - show hint for free but notify
            hintBox.classList.remove('hidden');
            this.hintUsed = true;
            return;
        }

        // Deduct XP and show hint
        const result = Storage.useHint(hintCost);
        if (result.success) {
            this.hintUsed = true;
            hintBox.classList.remove('hidden');

            // Update header XP display
            document.getElementById('headerXP').textContent = result.newXP + ' XP';

            // Show cost notification
            this.showHintCostAnimation(hintCost);
        }
    },

    /**
     * Show hint cost animation
     */
    showHintCostAnimation(cost) {
        const el = document.createElement('div');
        el.className = 'hint-cost-animation';
        el.textContent = '-' + cost + ' XP';
        document.body.appendChild(el);

        setTimeout(() => {
            el.remove();
        }, 1500);
    },

    /**
     * Update preview based on user code
     */
    updatePreview() {
        const level = this.currentLevel;
        const resultPreview = document.getElementById('resultPreview');

        if (this.currentLang === 'html') {
            // Show HTML preview
            let userCode;
            if (level.type === 'fill-blank') {
                const inputs = document.querySelectorAll('.blank-input');

                // Get unique values by data-index
                const uniqueValues = {};
                inputs.forEach(input => {
                    const idx = input.getAttribute('data-index');
                    if (!uniqueValues.hasOwnProperty(idx)) {
                        uniqueValues[idx] = input.value;
                    }
                });

                // Build blanks array in order
                const userBlanks = Object.keys(uniqueValues)
                    .sort((a, b) => parseInt(a) - parseInt(b))
                    .map(k => uniqueValues[k]);

                userCode = this.buildCodeFromTemplate(level.template, userBlanks);
            } else {
                userCode = document.getElementById('codeInput').value;
            }

            if (resultPreview) {
                const preview = CodeValidator.getHTMLPreview(userCode);
                resultPreview.innerHTML = `
                    <div class="preview-rendered">${preview}</div>
                    <div class="preview-code">
                        <span class="code-label">HTML:</span>
                        <code>${this.escapeHtml(userCode)}</code>
                    </div>
                `;
            }
        } else if (this.currentLang === 'css') {
            // CSS preview - show styled element
            if (resultPreview && level.type === 'fill-blank') {
                const inputs = document.querySelectorAll('.blank-input');
                const uniqueValues = {};
                inputs.forEach(input => {
                    const idx = input.getAttribute('data-index');
                    if (!uniqueValues.hasOwnProperty(idx)) {
                        uniqueValues[idx] = input.value;
                    }
                });
                const userBlanks = Object.keys(uniqueValues)
                    .sort((a, b) => parseInt(a) - parseInt(b))
                    .map(k => uniqueValues[k]);

                const userCode = this.buildCodeFromTemplate(level.template, userBlanks);
                const previewHtml = level.previewHtml || '<div class="preview-box">Preview</div>';

                resultPreview.innerHTML = `
                    <style>${userCode}</style>
                    <div class="preview-rendered">${previewHtml}</div>
                    <div class="preview-code">
                        <span class="code-label">CSS:</span>
                        <code>${this.escapeHtml(userCode)}</code>
                    </div>
                `;
            }
        } else if (this.currentLang === 'js') {
            // JS preview - execute and show result
            if (resultPreview && level.type === 'fill-blank') {
                const inputs = document.querySelectorAll('.blank-input');
                const uniqueValues = {};
                inputs.forEach(input => {
                    const idx = input.getAttribute('data-index');
                    if (!uniqueValues.hasOwnProperty(idx)) {
                        uniqueValues[idx] = input.value;
                    }
                });
                const userBlanks = Object.keys(uniqueValues)
                    .sort((a, b) => parseInt(a) - parseInt(b))
                    .map(k => uniqueValues[k]);

                const userCode = this.buildCodeFromTemplate(level.template, userBlanks);

                // Execute and show console output
                this.executeAndShowResult(userCode, resultPreview);
            }
        }
    },

    /**
     * Build code from template (handles both [[TAG]] and ___ patterns)
     */
    buildCodeFromTemplate(template, userBlanks) {
        let code = template;
        let blankIndex = 0;
        const namedBlanks = {}; // Track [[NAME]] patterns for pairing

        // Replace [[TAG]] pattern - same [[NAME]] uses same value (for paired tags)
        code = code.replace(/\[\[([^\]]+)\]\]/g, (match, name) => {
            if (namedBlanks.hasOwnProperty(name)) {
                // Reuse existing value for paired tags
                return userBlanks[namedBlanks[name]] || '';
            } else {
                // New named blank - assign new index
                namedBlanks[name] = blankIndex;
                const value = userBlanks[blankIndex] || '';
                blankIndex++;
                return value;
            }
        });

        // Replace ___ pattern (each gets next index)
        code = code.replace(/___/g, () => {
            const value = userBlanks[blankIndex] || '';
            blankIndex++;
            return value;
        });

        return code;
    },

    /**
     * Execute JS code and show result
     */
    async executeAndShowResult(code, container) {
        const logs = [];

        try {
            // Create sandbox with custom console
            const originalLog = console.log;
            console.log = (...args) => {
                logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
            };

            // Execute code
            eval(code);

            // Restore console
            console.log = originalLog;

            container.innerHTML = `
                <div class="preview-console">
                    <span class="console-label">Console:</span>
                    ${logs.map(log => `<div class="console-line">&gt; ${this.escapeHtml(log)}</div>`).join('')}
                </div>
                <div class="preview-code">
                    <span class="code-label">JavaScript:</span>
                    <code>${this.escapeHtml(code)}</code>
                </div>
            `;
        } catch (e) {
            container.innerHTML = `
                <div class="preview-error">
                    <span class="error-label">Error:</span>
                    <span>${this.escapeHtml(e.message)}</span>
                </div>
                <div class="preview-code">
                    <span class="code-label">JavaScript:</span>
                    <code>${this.escapeHtml(code)}</code>
                </div>
            `;
        }
    },

    /**
     * Escape HTML for display
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
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
            this.isLevelCompleted = false;
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
            this.isLevelCompleted = false;
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
