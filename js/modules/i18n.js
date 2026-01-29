/**
 * Internationalization Module - Handles language switching
 */

const i18n = {
    currentLang: 'ru',

    translations: {
        ru: {
            // Navigation
            'nav.profile': 'Профиль',
            'nav.xp': 'XP',
            'nav.levels': 'Все уровни',

            // Hero Section
            'hero.badge': 'Бесплатное обучение',
            'hero.title': 'Научись программировать<br>играя',
            'hero.subtitle': '160+ интерактивных уроков по HTML, CSS и JavaScript.<br>От новичка до профессионала.',
            'hero.start': 'Начать обучение',
            'hero.profile': 'Мой профиль',
            'hero.levels': 'Уровней',
            'hero.languages': 'Языка',
            'hero.achievements': 'Достижений',

            // Quick Stats
            'stats.streak': 'Дней подряд',
            'stats.xp': 'Очков XP',
            'stats.rank': 'Ваш ранг',
            'stats.levels': 'Уровней пройдено',
            'stats.total_xp': 'Очков опыта',
            'stats.total_levels': 'Пройдено уровней',
            'stats.current_rank': 'Текущий ранг',
            'stats.achievements': 'Достижений',

            // Languages Section
            'languages.title': 'Выбери свой путь',
            'languages.subtitle': 'Три языка - три уникальных мира. Начни своё путешествие!',
            'languages.start': 'Начать',
            'languages.levels': 'уровней',

            // HTML
            'html.title': 'HTML',
            'html.subtitle': 'Строитель',
            'html.description': 'Построй структуру веб-страниц с нуля. Теги - твои кирпичи!',
            'html.tags': 'Теги',
            'html.attributes': 'Атрибуты',
            'html.forms': 'Формы',

            // CSS
            'css.title': 'CSS',
            'css.subtitle': 'Художник',
            'css.description': 'Раскрась и оживи свои страницы. Стили - твои краски!',
            'css.flexbox': 'Flexbox',
            'css.grid': 'Grid',
            'css.animations': 'Анимации',

            // JavaScript
            'js.title': 'JavaScript',
            'js.subtitle': 'Космонавт',
            'js.description': 'Запрограммируй интерактивность. Код - твоё топливо!',
            'js.functions': 'Функции',
            'js.dom': 'DOM',
            'js.async': 'Async',

            // Learning Path
            'path.title': 'Путь обучения',
            'path.subtitle': 'Структурированный курс от основ до мастерства',
            'path.html.title': 'HTML Основы',
            'path.html.desc': 'Изучи структуру веб-страниц, теги и семантику',
            'path.css.title': 'CSS Стилизация',
            'path.css.desc': 'Научись оформлять страницы, освой Flexbox и Grid',
            'path.js.title': 'JavaScript Логика',
            'path.js.desc': 'Добавь интерактивность, работай с DOM и API',
            'path.final.title': 'Fullstack Разработчик',
            'path.final.desc': 'Создавай полноценные веб-приложения!',

            // Features
            'features.title': 'Почему CodeQuest?',
            'features.subtitle': 'Уникальный подход к обучению программированию',
            'features.game.title': 'Игровой подход',
            'features.game.text': 'Учись программированию через интерактивные задания и мини-игры. Каждый уровень - новый вызов!',
            'features.progress.title': 'Отслеживай прогресс',
            'features.progress.text': 'XP, ранги, достижения и таблица лидеров мотивируют двигаться вперёд к мастерству',
            'features.levels.title': '160+ уровней',
            'features.levels.text': 'От основ до продвинутых тем - полное покрытие HTML, CSS и JavaScript',
            'features.instant.title': 'Мгновенный результат',
            'features.instant.text': 'Пиши код и сразу видь результат своей работы в реальном времени',

            // Achievements
            'achievements.title': 'Собирай достижения',
            'achievements.subtitle': '30+ уникальных наград за твои успехи',
            'achievements.more': 'И многое другое...',

            // CTA
            'cta.title': 'Готов начать?',
            'cta.text': 'Присоединяйся к тысячам разработчиков, которые уже учатся с CodeQuest',
            'cta.button': 'Начать бесплатно',

            // Footer
            'footer.slogan': 'Изучай. Играй. Создавай.',
            'footer.profile': 'Профиль',
            'footer.achievements': 'Достижения',
            'footer.about': 'О проекте',

            // Game Page
            'game.level': 'Уровень',
            'game.task': 'Задание',
            'game.hint': 'Подсказка',
            'game.code': 'Код',
            'game.reset': 'Сбросить',
            'game.check': 'Проверить',
            'game.result': 'Результат',
            'game.ready': 'Готов к проверке',
            'game.correct': 'Верно!',
            'game.back': 'Назад',
            'game.next': 'Далее',
            'game.all_levels': 'Все уровни',

            // Success
            'success.title': 'Отлично!',
            'success.subtitle': 'Уровень пройден',
            'success.xp': 'XP',
            'success.attempt': 'Попытка',
            'success.next': 'Следующий уровень',
            'success.retry': 'Попробовать ещё',

            // Auth
            'auth.login': 'Войти в аккаунт',
            'auth.subtitle': 'Сохрани свой прогресс в облаке',
            'auth.github': 'Войти через GitHub',
            'auth.google': 'Войти через Google',
            'auth.or': 'или',
            'auth.email': 'Email',
            'auth.password': 'Пароль',
            'auth.submit': 'Войти',
            'auth.no_account': 'Нет аккаунта?',
            'auth.register': 'Зарегистрироваться',

            // Ranks
            'rank.novice': 'Новичок',
            'rank.student': 'Ученик',
            'rank.intern': 'Практикант',
            'rank.developer': 'Разработчик',
            'rank.master': 'Мастер',
            'rank.expert': 'Эксперт',
            'rank.guru': 'Гуру',
            'rank.legend': 'Легенда',

            // Errors
            'error.answers_mismatch': 'Количество ответов не совпадает',
            'error.has_errors': 'Есть ошибки, попробуй ещё раз',
            'error.all_correct': 'Отлично! Всё верно!'
        },

        en: {
            // Navigation
            'nav.profile': 'Profile',
            'nav.xp': 'XP',
            'nav.levels': 'All Levels',

            // Hero Section
            'hero.badge': 'Free learning',
            'hero.title': 'Learn to code<br>while playing',
            'hero.subtitle': '160+ interactive lessons on HTML, CSS and JavaScript.<br>From beginner to professional.',
            'hero.start': 'Start Learning',
            'hero.profile': 'My Profile',
            'hero.levels': 'Levels',
            'hero.languages': 'Languages',
            'hero.achievements': 'Achievements',

            // Quick Stats
            'stats.streak': 'Day Streak',
            'stats.xp': 'XP Points',
            'stats.rank': 'Your Rank',
            'stats.levels': 'Levels Completed',
            'stats.total_xp': 'Experience Points',
            'stats.total_levels': 'Levels Completed',
            'stats.current_rank': 'Current Rank',
            'stats.achievements': 'Achievements',

            // Languages Section
            'languages.title': 'Choose Your Path',
            'languages.subtitle': 'Three languages - three unique worlds. Start your journey!',
            'languages.start': 'Start',
            'languages.levels': 'levels',

            // HTML
            'html.title': 'HTML',
            'html.subtitle': 'Builder',
            'html.description': 'Build web page structure from scratch. Tags are your bricks!',
            'html.tags': 'Tags',
            'html.attributes': 'Attributes',
            'html.forms': 'Forms',

            // CSS
            'css.title': 'CSS',
            'css.subtitle': 'Artist',
            'css.description': 'Paint and animate your pages. Styles are your colors!',
            'css.flexbox': 'Flexbox',
            'css.grid': 'Grid',
            'css.animations': 'Animations',

            // JavaScript
            'js.title': 'JavaScript',
            'js.subtitle': 'Astronaut',
            'js.description': 'Program interactivity. Code is your fuel!',
            'js.functions': 'Functions',
            'js.dom': 'DOM',
            'js.async': 'Async',

            // Learning Path
            'path.title': 'Learning Path',
            'path.subtitle': 'Structured course from basics to mastery',
            'path.html.title': 'HTML Basics',
            'path.html.desc': 'Learn web page structure, tags and semantics',
            'path.css.title': 'CSS Styling',
            'path.css.desc': 'Learn to style pages, master Flexbox and Grid',
            'path.js.title': 'JavaScript Logic',
            'path.js.desc': 'Add interactivity, work with DOM and APIs',
            'path.final.title': 'Fullstack Developer',
            'path.final.desc': 'Create full-fledged web applications!',

            // Features
            'features.title': 'Why CodeQuest?',
            'features.subtitle': 'Unique approach to learning programming',
            'features.game.title': 'Gamified Learning',
            'features.game.text': 'Learn programming through interactive tasks and mini-games. Each level is a new challenge!',
            'features.progress.title': 'Track Progress',
            'features.progress.text': 'XP, ranks, achievements and leaderboards motivate you to move forward to mastery',
            'features.levels.title': '160+ Levels',
            'features.levels.text': 'From basics to advanced topics - full coverage of HTML, CSS and JavaScript',
            'features.instant.title': 'Instant Results',
            'features.instant.text': 'Write code and see your work results in real-time',

            // Achievements
            'achievements.title': 'Collect Achievements',
            'achievements.subtitle': '30+ unique rewards for your success',
            'achievements.more': 'And much more...',

            // CTA
            'cta.title': 'Ready to Start?',
            'cta.text': 'Join thousands of developers already learning with CodeQuest',
            'cta.button': 'Start for Free',

            // Footer
            'footer.slogan': 'Learn. Play. Create.',
            'footer.profile': 'Profile',
            'footer.achievements': 'Achievements',
            'footer.about': 'About',

            // Game Page
            'game.level': 'Level',
            'game.task': 'Task',
            'game.hint': 'Hint',
            'game.code': 'Code',
            'game.reset': 'Reset',
            'game.check': 'Check',
            'game.result': 'Result',
            'game.ready': 'Ready to check',
            'game.correct': 'Correct!',
            'game.back': 'Back',
            'game.next': 'Next',
            'game.all_levels': 'All Levels',

            // Success
            'success.title': 'Excellent!',
            'success.subtitle': 'Level completed',
            'success.xp': 'XP',
            'success.attempt': 'Attempt',
            'success.next': 'Next Level',
            'success.retry': 'Try Again',

            // Auth
            'auth.login': 'Sign In',
            'auth.subtitle': 'Save your progress in the cloud',
            'auth.github': 'Sign in with GitHub',
            'auth.google': 'Sign in with Google',
            'auth.or': 'or',
            'auth.email': 'Email',
            'auth.password': 'Password',
            'auth.submit': 'Sign In',
            'auth.no_account': "Don't have an account?",
            'auth.register': 'Register',

            // Ranks
            'rank.novice': 'Novice',
            'rank.student': 'Student',
            'rank.intern': 'Intern',
            'rank.developer': 'Developer',
            'rank.master': 'Master',
            'rank.expert': 'Expert',
            'rank.guru': 'Guru',
            'rank.legend': 'Legend',

            // Errors
            'error.answers_mismatch': 'Number of answers does not match',
            'error.has_errors': 'There are errors, try again',
            'error.all_correct': 'Excellent! All correct!'
        }
    },

    /**
     * Initialize i18n
     */
    init() {
        this.currentLang = localStorage.getItem('lang') || 'ru';
        this.updateLangToggle();
    },

    /**
     * Get translation
     */
    t(key) {
        const translation = this.translations[this.currentLang];
        return translation[key] || this.translations['ru'][key] || key;
    },

    /**
     * Set language
     */
    setLang(lang) {
        if (this.translations[lang]) {
            this.currentLang = lang;
            localStorage.setItem('lang', lang);
            this.updateLangToggle();
            this.updatePage();
        }
    },

    /**
     * Toggle language
     */
    toggleLang() {
        const newLang = this.currentLang === 'ru' ? 'en' : 'ru';
        this.setLang(newLang);
    },

    /**
     * Update language toggle button
     */
    updateLangToggle() {
        const toggle = document.getElementById('langToggle');
        if (toggle) {
            const span = toggle.querySelector('span');
            if (span) {
                span.textContent = this.currentLang.toUpperCase();
            }
        }
    },

    /**
     * Update page with translations
     */
    updatePage() {
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.innerHTML = this.t(key);
        });

        // Update all elements with data-i18n-placeholder attribute
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            el.placeholder = this.t(key);
        });

        // Update HTML lang attribute
        document.documentElement.lang = this.currentLang;
    },

    /**
     * Get rank name
     */
    getRankName(rank) {
        const ranks = {
            1: this.t('rank.novice'),
            2: this.t('rank.student'),
            3: this.t('rank.intern'),
            4: this.t('rank.developer'),
            5: this.t('rank.master'),
            6: this.t('rank.expert'),
            7: this.t('rank.guru'),
            8: this.t('rank.legend')
        };
        return ranks[rank] || this.t('rank.novice');
    }
};

// Make available globally
window.i18n = i18n;

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    i18n.init();
});
