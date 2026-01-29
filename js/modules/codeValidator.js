/**
 * Code Validator Module - Validates user code submissions
 */

const CodeValidator = {
    /**
     * Normalize code for comparison
     */
    normalizeCode(code) {
        return code
            .replace(/\s+/g, ' ')      // Multiple spaces to single
            .replace(/\s*([{};,:])\s*/g, '$1') // Remove spaces around brackets
            .replace(/\s*([<>])\s*/g, '$1')    // Remove spaces around tags
            .trim()
            .toLowerCase();
    },

    /**
     * Validate fill-in-the-blank answer
     */
    validateFillBlank(userBlanks, expectedBlanks) {
        if (userBlanks.length !== expectedBlanks.length) {
            return {
                success: false,
                message: 'Количество ответов не совпадает'
            };
        }

        const results = [];
        let allCorrect = true;

        for (let i = 0; i < expectedBlanks.length; i++) {
            const userAnswer = userBlanks[i].trim().toLowerCase();
            const expected = expectedBlanks[i].toLowerCase();
            const isCorrect = userAnswer === expected;

            results.push({
                index: i,
                userAnswer: userBlanks[i],
                expected: expectedBlanks[i],
                isCorrect
            });

            if (!isCorrect) {
                allCorrect = false;
            }
        }

        return {
            success: allCorrect,
            results,
            message: allCorrect ? 'Отлично! Всё верно!' : 'Есть ошибки, попробуй ещё раз'
        };
    },

    /**
     * Build code from template and user inputs
     */
    buildCodeFromTemplate(template, userBlanks) {
        let code = template;
        let blankIndex = 0;

        // Replace ___ with user inputs
        code = code.replace(/___/g, () => {
            const value = userBlanks[blankIndex] || '';
            blankIndex++;
            return value;
        });

        return code;
    },

    /**
     * Validate full editor code
     */
    validateFullEditor(userCode, validation) {
        const normalized = this.normalizeCode(userCode);

        switch (validation.type) {
            case 'exact':
                return this.validateExact(userCode, validation.expected);

            case 'contains':
                return this.validateContains(userCode, validation.mustContain);

            case 'output':
                return this.validateOutput(userCode, validation.expected);

            case 'html':
                return this.validateHTML(userCode, validation);

            case 'css':
                return this.validateCSS(userCode, validation);

            case 'js':
                return this.validateJS(userCode, validation);

            default:
                return { success: false, message: 'Неизвестный тип валидации' };
        }
    },

    /**
     * Exact match validation
     */
    validateExact(userCode, expected) {
        const normalizedUser = this.normalizeCode(userCode);
        const normalizedExpected = this.normalizeCode(expected);

        return {
            success: normalizedUser === normalizedExpected,
            message: normalizedUser === normalizedExpected ?
                'Отлично!' : 'Код не совпадает с ожидаемым'
        };
    },

    /**
     * Contains validation - check if code contains required elements
     */
    validateContains(userCode, mustContain) {
        const missing = [];

        for (const item of mustContain) {
            if (!userCode.toLowerCase().includes(item.toLowerCase())) {
                missing.push(item);
            }
        }

        if (missing.length === 0) {
            return {
                success: true,
                message: 'Отлично! Все необходимые элементы присутствуют!'
            };
        }

        return {
            success: false,
            message: `Не хватает: ${missing.join(', ')}`,
            missing
        };
    },

    /**
     * Validate HTML code
     */
    validateHTML(userCode, validation) {
        // Basic HTML validation
        const errors = [];

        // Check for basic structure
        if (validation.requireTags) {
            for (const tag of validation.requireTags) {
                const openTag = new RegExp(`<${tag}[^>]*>`, 'i');
                const closeTag = new RegExp(`</${tag}>`, 'i');

                if (!openTag.test(userCode)) {
                    errors.push(`Отсутствует тег <${tag}>`);
                }
                if (!closeTag.test(userCode) && !['br', 'hr', 'img', 'input', 'meta', 'link'].includes(tag.toLowerCase())) {
                    errors.push(`Не закрыт тег <${tag}>`);
                }
            }
        }

        // Check for attributes
        if (validation.requireAttributes) {
            for (const attr of validation.requireAttributes) {
                const attrRegex = new RegExp(`${attr.name}\\s*=\\s*["']`, 'i');
                if (!attrRegex.test(userCode)) {
                    errors.push(`Отсутствует атрибут ${attr.name}`);
                }
            }
        }

        if (errors.length === 0) {
            return { success: true, message: 'HTML код корректен!' };
        }

        return {
            success: false,
            message: errors[0],
            errors
        };
    },

    /**
     * Validate CSS code
     */
    validateCSS(userCode, validation) {
        const errors = [];

        // Check for required properties
        if (validation.requireProperties) {
            for (const prop of validation.requireProperties) {
                const propRegex = new RegExp(`${prop.name}\\s*:\\s*${prop.value || '[^;]+'}`, 'i');
                if (!propRegex.test(userCode)) {
                    errors.push(`Свойство ${prop.name} не найдено или имеет неверное значение`);
                }
            }
        }

        // Check for selectors
        if (validation.requireSelectors) {
            for (const selector of validation.requireSelectors) {
                if (!userCode.includes(selector)) {
                    errors.push(`Селектор "${selector}" не найден`);
                }
            }
        }

        if (errors.length === 0) {
            return { success: true, message: 'CSS код корректен!' };
        }

        return {
            success: false,
            message: errors[0],
            errors
        };
    },

    /**
     * Validate JavaScript code
     */
    validateJS(userCode, validation) {
        const errors = [];

        // Syntax check
        try {
            new Function(userCode);
        } catch (e) {
            return {
                success: false,
                message: `Синтаксическая ошибка: ${e.message}`,
                errors: [e.message]
            };
        }

        // Check for required constructs
        if (validation.requireConstructs) {
            for (const construct of validation.requireConstructs) {
                const regex = new RegExp(construct.pattern, 'i');
                if (!regex.test(userCode)) {
                    errors.push(construct.message || `Не найдено: ${construct.pattern}`);
                }
            }
        }

        // Execute and check output if specified
        if (validation.testCases) {
            const testResult = this.runJSTests(userCode, validation.testCases);
            if (!testResult.success) {
                return testResult;
            }
        }

        if (errors.length === 0) {
            return { success: true, message: 'JavaScript код корректен!' };
        }

        return {
            success: false,
            message: errors[0],
            errors
        };
    },

    /**
     * Run JavaScript test cases
     */
    runJSTests(userCode, testCases) {
        const results = [];

        for (const test of testCases) {
            try {
                // Create a sandbox function
                const fn = new Function('input', `
                    ${userCode}
                    return ${test.call || 'result'};
                `);

                const actual = fn(test.input);
                const passed = JSON.stringify(actual) === JSON.stringify(test.expected);

                results.push({
                    input: test.input,
                    expected: test.expected,
                    actual,
                    passed
                });

                if (!passed) {
                    return {
                        success: false,
                        message: `Тест не пройден: ожидалось ${JSON.stringify(test.expected)}, получено ${JSON.stringify(actual)}`,
                        results
                    };
                }
            } catch (e) {
                return {
                    success: false,
                    message: `Ошибка выполнения: ${e.message}`,
                    results
                };
            }
        }

        return {
            success: true,
            message: 'Все тесты пройдены!',
            results
        };
    },

    /**
     * Get visual result for HTML
     */
    getHTMLPreview(code) {
        // Sanitize for preview (basic)
        const sanitized = code
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/on\w+\s*=/gi, 'data-blocked=');

        return sanitized;
    },

    /**
     * Get visual result for CSS (apply to preview element)
     */
    getCSSPreview(cssCode, htmlPreview) {
        return `
            <style>${cssCode}</style>
            <div class="preview-container">${htmlPreview}</div>
        `;
    },

    /**
     * Execute JS and capture console output
     */
    executeJS(code, maxTime = 2000) {
        const logs = [];
        const errors = [];

        return new Promise((resolve) => {
            const timeout = setTimeout(() => {
                resolve({
                    success: false,
                    logs,
                    errors: ['Превышено время выполнения'],
                    result: null
                });
            }, maxTime);

            try {
                // Create sandbox with custom console
                const sandbox = {
                    console: {
                        log: (...args) => logs.push({ type: 'log', content: args.join(' ') }),
                        error: (...args) => errors.push(args.join(' ')),
                        warn: (...args) => logs.push({ type: 'warn', content: args.join(' ') }),
                        info: (...args) => logs.push({ type: 'info', content: args.join(' ') })
                    },
                    alert: (msg) => logs.push({ type: 'alert', content: msg }),
                    prompt: () => 'test'
                };

                const fn = new Function(...Object.keys(sandbox), code);
                const result = fn(...Object.values(sandbox));

                clearTimeout(timeout);

                resolve({
                    success: errors.length === 0,
                    logs,
                    errors,
                    result
                });
            } catch (e) {
                clearTimeout(timeout);
                resolve({
                    success: false,
                    logs,
                    errors: [e.message],
                    result: null
                });
            }
        });
    }
};

// Make available globally
window.CodeValidator = CodeValidator;
