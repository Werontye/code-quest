/**
 * Internationalization Module - Russian / English
 */

const i18n = {
    currentLang: 'ru',

    translations: {
        ru: {
            // Navigation
            'nav.profile': 'Профиль',
            'nav.xp': 'XP',
            'nav.levels': 'Все уровни',
            'nav.theory': 'Теория',

            // Hero Section
            'hero.badge': 'Бесплатное обучение',
            'hero.title': 'Научись программировать<br>играя',
            'hero.subtitle': '300+ интерактивных уроков по HTML, CSS, JavaScript, TypeScript, React и Node.js.<br>От новичка до Fullstack разработчика.',
            'hero.start': 'Начать обучение',
            'hero.profile': 'Мой профиль',
            'hero.levels': 'Уровней',
            'hero.languages': 'Технологий',
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
            'languages.subtitle': '6 технологий - 6 уникальных миров. Начни своё путешествие!',
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

            // TypeScript
            'ts.title': 'TypeScript',
            'ts.subtitle': 'Инженер',
            'ts.description': 'Типизируй свой код. Меньше багов, больше уверенности!',

            // React
            'react.title': 'React',
            'react.subtitle': 'Архитектор',
            'react.description': 'Создавай интерфейсы из компонентов. UI - твоя суперсила!',

            // Node.js
            'node.title': 'Node.js',
            'node.subtitle': 'Backend',
            'node.description': 'Создавай серверы и API. Полный стек в твоих руках!',

            // Figma
            'figma.title': 'Figma',
            'figma.subtitle': 'Дизайнер',
            'figma.description': 'Освой инструмент №1 для UI/UX дизайна. Теория + тесты!',
            'figma.prototypes': 'Прототипы',

            // Python
            'python.title': 'Python',
            'python.subtitle': 'Укротитель змей',
            'python.description': 'Универсальный язык для всего: веб, AI, автоматизация!',
            'python.syntax': 'Синтаксис',
            'python.lists': 'Списки',
            'python.functions': 'Функции',

            // Git
            'git.title': 'Git',
            'git.subtitle': 'Хранитель версий',
            'git.description': 'Контроль версий для командной работы. Must-have навык!',

            // Common card labels
            'card.new': 'НОВЫЙ',

            // Learning Path
            'path.title': 'Путь обучения',
            'path.subtitle': 'Структурированный курс от основ до мастерства',
            'path.html.title': 'HTML Основы',
            'path.html.desc': 'Изучи структуру веб-страниц',
            'path.css.title': 'CSS Стилизация',
            'path.css.desc': 'Оформляй страницы красиво',
            'path.js.title': 'JavaScript Логика',
            'path.js.desc': 'Добавь интерактивность',
            'path.ts.title': 'TypeScript',
            'path.ts.desc': 'Типизируй свой код',
            'path.react.title': 'React',
            'path.react.desc': 'Создавай UI компоненты',
            'path.node.title': 'Node.js',
            'path.node.desc': 'Строй серверы и API',
            'path.final.title': 'Fullstack Developer',
            'path.final.desc': 'Создавай полноценные веб-приложения!',

            // Features
            'features.title': 'Почему CodeQuest?',
            'features.subtitle': 'Уникальный подход к обучению программированию',
            'features.game.title': 'Игровой подход',
            'features.game.text': 'Учись программированию через интерактивные задания и мини-игры. Каждый уровень - новый вызов!',
            'features.progress.title': 'Отслеживай прогресс',
            'features.progress.text': 'XP, ранги, достижения и таблица лидеров мотивируют двигаться вперёд к мастерству',
            'features.levels.title': '300+ уровней',
            'features.levels.text': 'От основ до продвинутых тем - полное покрытие HTML, CSS, JS, TypeScript, React и Node.js',
            'features.instant.title': 'Мгновенный результат',
            'features.instant.text': 'Пиши код и сразу видь результат своей работы в реальном времени',

            // Achievements Section
            'achievements.title': 'Собирай достижения',
            'achievements.subtitle': '30+ уникальных наград за твои успехи',
            'achievements.more': 'И многое другое...',
            'achievement.first_steps': 'Первые шаги',
            'achievement.veteran': 'Ветеран',
            'achievement.speed': 'Скорострел',
            'achievement.perfect': 'Перфекционист',
            'achievement.marathon': 'Недельный марафон',

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

            // Errors / Validator
            'error.answers_mismatch': 'Количество ответов не совпадает',
            'error.has_errors': 'Есть ошибки, попробуй ещё раз',
            'error.all_correct': 'Отлично! Всё верно!',
            'error.select_answer': 'Выберите ответ!',
            'error.correct': 'Верно!',
            'error.incorrect': 'Неверно, попробуйте ещё раз!',

            // Progress labels
            'progress.complete': 'Завершено',
            'progress.levels': 'Уровней',
            'progress.total_xp': 'Всего XP',
            'progress.rank': 'Ранг',

            // Time formatting
            'time.sec': 'сек',
            'time.min': 'мин',
            'time.hour': 'ч',
            'time.just_now': 'только что',
            'time.min_ago': 'мин. назад',
            'time.hours_ago': 'ч. назад',
            'time.days_ago': 'дн. назад',

            // Notifications
            'notification.new_achievement': 'Новое достижение:',
            'notification.not_enough_xp': 'Недостаточно XP для подсказки',

            // Daily Challenge
            'daily.title': 'Ежедневный челлендж',
            'daily.description': 'Проверь свои навыки и получи двойной XP!',
            'daily.play': 'Играть',
            'daily.completed': 'Выполнено сегодня!',
            'daily.timer': 'Обновится через:',
            'daily.level': 'Уровень',

            // Profile Page
            'profile.title': 'Профиль',
            'profile.edit': 'Редактировать',
            'profile.stats': 'Статистика',
            'profile.course_progress': 'Прогресс по курсам',
            'profile.achievements': 'Достижения',
            'profile.weekly': 'Прогресс за неделю',
            'profile.detail_stats': 'Детальная статистика',
            'profile.recent': 'Недавняя активность',
            'profile.learning_path': 'Путь к Junior разработчику',
            'profile.streak': 'Дней подряд',
            'profile.levels_done': 'Уровней пройдено',
            'profile.first_try': 'С первой попытки',
            'profile.fast': 'Быстрых решений',
            'profile.continue': 'Продолжить',
            'profile.start': 'Начать',
            'profile.completed': 'Завершено',
            'profile.save': 'Сохранить',
            'profile.cancel': 'Отмена',
            'profile.name': 'Имя',
            'profile.email': 'Email (опционально)',
            'profile.about': 'О себе',
            'profile.daily_goal': 'Дневная цель XP',
            'profile.avatar': 'Выберите аватар',
            'profile.data_mgmt': 'Управление данными',
            'profile.export': 'Экспорт',
            'profile.import': 'Импорт',
            'profile.reset': 'Сброс',
            'profile.reset_confirm': 'Сбросить прогресс?',
            'profile.reset_warning': 'Это действие удалит весь ваш прогресс, XP и достижения. Это нельзя отменить!',
            'profile.confirm_reset': 'Да, сбросить',
            'profile.saved': 'Профиль сохранён!',
            'profile.progress_reset': 'Прогресс сброшен!',
            'profile.edit_profile': 'Редактировать профиль',
            'profile.xp_to_next': 'XP до следующего ранга',
            'profile.weekly_total': 'XP за неделю',
            'profile.weekly_avg': 'Среднее в день',
            'profile.goals_reached': 'Целей достигнуто',
            'profile.no_activity': 'Начни проходить уровни, чтобы увидеть свою активность!',
            'profile.level_passed': 'Пройден уровень',
            'profile.in_course': 'в курсе',
            'profile.earned': 'Получено',

            // Table headers
            'table.course': 'Курс',
            'table.completed': 'Пройдено',
            'table.remaining': 'Осталось',
            'table.progress': 'Прогресс',
            'table.xp': 'XP',

            // Levels page
            'levels.search': 'Поиск по уровням...',
            'levels.quiz': 'Тест',
            'levels.fill_blank': 'Заполни пропуски',
            'levels.code_editor': 'Редактор кода',

            // Achievement names (for achievements.js)
            'ach.first-steps.name': 'Первые шаги',
            'ach.first-steps.desc': 'Пройди свой первый уровень',
            'ach.getting-started.name': 'Начало пути',
            'ach.getting-started.desc': 'Пройди 5 уровней',
            'ach.dedicated.name': 'Целеустремлённый',
            'ach.dedicated.desc': 'Пройди 25 уровней',
            'ach.veteran.name': 'Ветеран',
            'ach.veteran.desc': 'Пройди 50 уровней',
            'ach.master.name': 'Мастер',
            'ach.master.desc': 'Пройди 100 уровней',
            'ach.html-starter.name': 'HTML Ученик',
            'ach.html-starter.desc': 'Пройди 10 уровней HTML',
            'ach.html-master.name': 'HTML Строитель',
            'ach.html-master.desc': 'Пройди все уровни HTML',
            'ach.css-starter.name': 'CSS Ученик',
            'ach.css-starter.desc': 'Пройди 10 уровней CSS',
            'ach.css-master.name': 'CSS Художник',
            'ach.css-master.desc': 'Пройди все уровни CSS',
            'ach.js-starter.name': 'JS Ученик',
            'ach.js-starter.desc': 'Пройди 10 уровней JavaScript',
            'ach.js-master.name': 'JS Космонавт',
            'ach.js-master.desc': 'Пройди все уровни JavaScript',
            'ach.polyglot.name': 'Полиглот',
            'ach.polyglot.desc': 'Пройди по 10 уровней каждого языка',
            'ach.full-stack.name': 'Fullstack разработчик',
            'ach.full-stack.desc': 'Пройди все уровни всех языков',
            'ach.quick-learner.name': 'Быстрый ученик',
            'ach.quick-learner.desc': 'Пройди 5 уровней менее чем за минуту каждый',
            'ach.speed-demon.name': 'Скорострел',
            'ach.speed-demon.desc': 'Пройди 20 уровней менее чем за минуту каждый',
            'ach.accurate.name': 'Меткий',
            'ach.accurate.desc': 'Пройди 10 уровней с первой попытки',
            'ach.perfectionist.name': 'Перфекционист',
            'ach.perfectionist.desc': 'Пройди 30 уровней с первой попытки',
            'ach.xp-100.name': 'Начинающий',
            'ach.xp-100.desc': 'Набери 100 XP',
            'ach.xp-500.name': 'Опытный',
            'ach.xp-500.desc': 'Набери 500 XP',
            'ach.xp-1000.name': 'Коллекционер',
            'ach.xp-1000.desc': 'Набери 1000 XP',
            'ach.xp-2500.name': 'Легенда',
            'ach.xp-2500.desc': 'Набери 2500 XP',
            'ach.streak-3.name': 'В ритме',
            'ach.streak-3.desc': 'Занимайся 3 дня подряд',
            'ach.streak-7.name': 'Недельный марафон',
            'ach.streak-7.desc': 'Занимайся 7 дней подряд',
            'ach.streak-30.name': 'Железная воля',
            'ach.streak-30.desc': 'Занимайся 30 дней подряд',
            'ach.rank-developer.name': 'Разработчик',
            'ach.rank-developer.desc': 'Достигни ранга "Разработчик"',
            'ach.rank-expert.name': 'Эксперт',
            'ach.rank-expert.desc': 'Достигни ранга "Эксперт"',
            'ach.rank-legend.name': 'Легенда кода',
            'ach.rank-legend.desc': 'Достигни максимального ранга',

            // Course names for levels page
            'course.html.subtitle': 'Строитель',
            'course.css.subtitle': 'Художник',
            'course.js.subtitle': 'Космонавт',
            'course.ts.subtitle': 'Инженер',
            'course.react.subtitle': 'Архитектор',
            'course.node.subtitle': 'Backend Инженер',
            'course.figma.subtitle': 'Дизайнер',
            'course.python.subtitle': 'Укротитель змей',
            'course.git.subtitle': 'Хранитель версий'
        },

        en: {
            // Navigation
            'nav.profile': 'Profile',
            'nav.xp': 'XP',
            'nav.levels': 'All levels',
            'nav.theory': 'Theory',

            // Hero Section
            'hero.badge': 'Free learning',
            'hero.title': 'Learn to code<br>by playing',
            'hero.subtitle': '300+ interactive lessons in HTML, CSS, JavaScript, TypeScript, React and Node.js.<br>From beginner to Fullstack developer.',
            'hero.start': 'Start learning',
            'hero.profile': 'My profile',
            'hero.levels': 'Levels',
            'hero.languages': 'Technologies',
            'hero.achievements': 'Achievements',

            // Quick Stats
            'stats.streak': 'Day streak',
            'stats.xp': 'XP Points',
            'stats.rank': 'Your rank',
            'stats.levels': 'Levels completed',
            'stats.total_xp': 'Total XP',
            'stats.total_levels': 'Levels completed',
            'stats.current_rank': 'Current rank',
            'stats.achievements': 'Achievements',

            // Languages Section
            'languages.title': 'Choose your path',
            'languages.subtitle': '6 technologies - 6 unique worlds. Start your journey!',
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

            // TypeScript
            'ts.title': 'TypeScript',
            'ts.subtitle': 'Engineer',
            'ts.description': 'Type your code. Fewer bugs, more confidence!',

            // React
            'react.title': 'React',
            'react.subtitle': 'Architect',
            'react.description': 'Build interfaces from components. UI is your superpower!',

            // Node.js
            'node.title': 'Node.js',
            'node.subtitle': 'Backend',
            'node.description': 'Create servers and APIs. Full stack in your hands!',

            // Figma
            'figma.title': 'Figma',
            'figma.subtitle': 'Designer',
            'figma.description': 'Master the #1 tool for UI/UX design. Theory + quizzes!',
            'figma.prototypes': 'Prototypes',

            // Python
            'python.title': 'Python',
            'python.subtitle': 'Snake Tamer',
            'python.description': 'Universal language for everything: web, AI, automation!',
            'python.syntax': 'Syntax',
            'python.lists': 'Lists',
            'python.functions': 'Functions',

            // Git
            'git.title': 'Git',
            'git.subtitle': 'Version Keeper',
            'git.description': 'Version control for teamwork. A must-have skill!',

            // Common card labels
            'card.new': 'NEW',

            // Learning Path
            'path.title': 'Learning Path',
            'path.subtitle': 'Structured course from basics to mastery',
            'path.html.title': 'HTML Basics',
            'path.html.desc': 'Learn web page structure',
            'path.css.title': 'CSS Styling',
            'path.css.desc': 'Style your pages beautifully',
            'path.js.title': 'JavaScript Logic',
            'path.js.desc': 'Add interactivity',
            'path.ts.title': 'TypeScript',
            'path.ts.desc': 'Type your code',
            'path.react.title': 'React',
            'path.react.desc': 'Build UI components',
            'path.node.title': 'Node.js',
            'path.node.desc': 'Build servers and APIs',
            'path.final.title': 'Fullstack Developer',
            'path.final.desc': 'Build full-fledged web applications!',

            // Features
            'features.title': 'Why CodeQuest?',
            'features.subtitle': 'A unique approach to learning programming',
            'features.game.title': 'Game-based learning',
            'features.game.text': 'Learn programming through interactive tasks and mini-games. Each level is a new challenge!',
            'features.progress.title': 'Track progress',
            'features.progress.text': 'XP, ranks, achievements and leaderboards motivate you to keep moving forward',
            'features.levels.title': '300+ levels',
            'features.levels.text': 'From basics to advanced topics - full coverage of HTML, CSS, JS, TypeScript, React and Node.js',
            'features.instant.title': 'Instant results',
            'features.instant.text': 'Write code and see the results of your work in real time',

            // Achievements Section
            'achievements.title': 'Collect achievements',
            'achievements.subtitle': '30+ unique rewards for your success',
            'achievements.more': 'And much more...',
            'achievement.first_steps': 'First steps',
            'achievement.veteran': 'Veteran',
            'achievement.speed': 'Speed demon',
            'achievement.perfect': 'Perfectionist',
            'achievement.marathon': 'Weekly marathon',

            // CTA
            'cta.title': 'Ready to start?',
            'cta.text': 'Join thousands of developers already learning with CodeQuest',
            'cta.button': 'Start for free',

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
            'game.all_levels': 'All levels',

            // Success
            'success.title': 'Excellent!',
            'success.subtitle': 'Level completed',
            'success.xp': 'XP',
            'success.attempt': 'Attempt',
            'success.next': 'Next level',
            'success.retry': 'Try again',

            // Auth
            'auth.login': 'Sign in',
            'auth.subtitle': 'Save your progress in the cloud',
            'auth.github': 'Sign in with GitHub',
            'auth.google': 'Sign in with Google',
            'auth.or': 'or',
            'auth.email': 'Email',
            'auth.password': 'Password',
            'auth.submit': 'Sign in',
            'auth.no_account': 'No account?',
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

            // Errors / Validator
            'error.answers_mismatch': 'Number of answers does not match',
            'error.has_errors': 'There are errors, try again',
            'error.all_correct': 'Excellent! All correct!',
            'error.select_answer': 'Select an answer!',
            'error.correct': 'Correct!',
            'error.incorrect': 'Incorrect, try again!',

            // Progress labels
            'progress.complete': 'Complete',
            'progress.levels': 'Levels',
            'progress.total_xp': 'Total XP',
            'progress.rank': 'Rank',

            // Time formatting
            'time.sec': 'sec',
            'time.min': 'min',
            'time.hour': 'h',
            'time.just_now': 'just now',
            'time.min_ago': 'min ago',
            'time.hours_ago': 'h ago',
            'time.days_ago': 'd ago',

            // Notifications
            'notification.new_achievement': 'New achievement:',
            'notification.not_enough_xp': 'Not enough XP for a hint',

            // Daily Challenge
            'daily.title': 'Daily Challenge',
            'daily.description': 'Test your skills and earn double XP!',
            'daily.play': 'Play',
            'daily.completed': 'Completed today!',
            'daily.timer': 'Refreshes in:',
            'daily.level': 'Level',

            // Profile Page
            'profile.title': 'Profile',
            'profile.edit': 'Edit',
            'profile.stats': 'Statistics',
            'profile.course_progress': 'Course Progress',
            'profile.achievements': 'Achievements',
            'profile.weekly': 'Weekly Progress',
            'profile.detail_stats': 'Detailed Statistics',
            'profile.recent': 'Recent Activity',
            'profile.learning_path': 'Path to Junior Developer',
            'profile.streak': 'Day streak',
            'profile.levels_done': 'Levels completed',
            'profile.first_try': 'First try',
            'profile.fast': 'Fast solutions',
            'profile.continue': 'Continue',
            'profile.start': 'Start',
            'profile.completed': 'Completed',
            'profile.save': 'Save',
            'profile.cancel': 'Cancel',
            'profile.name': 'Name',
            'profile.email': 'Email (optional)',
            'profile.about': 'About me',
            'profile.daily_goal': 'Daily XP goal',
            'profile.avatar': 'Choose avatar',
            'profile.data_mgmt': 'Data Management',
            'profile.export': 'Export',
            'profile.import': 'Import',
            'profile.reset': 'Reset',
            'profile.reset_confirm': 'Reset progress?',
            'profile.reset_warning': 'This will delete all your progress, XP and achievements. This cannot be undone!',
            'profile.confirm_reset': 'Yes, reset',
            'profile.saved': 'Profile saved!',
            'profile.progress_reset': 'Progress reset!',
            'profile.edit_profile': 'Edit Profile',
            'profile.xp_to_next': 'XP to next rank',
            'profile.weekly_total': 'Weekly XP',
            'profile.weekly_avg': 'Daily average',
            'profile.goals_reached': 'Goals reached',
            'profile.no_activity': 'Start completing levels to see your activity!',
            'profile.level_passed': 'Completed level',
            'profile.in_course': 'in course',
            'profile.earned': 'Earned',

            // Table headers
            'table.course': 'Course',
            'table.completed': 'Completed',
            'table.remaining': 'Remaining',
            'table.progress': 'Progress',
            'table.xp': 'XP',

            // Levels page
            'levels.search': 'Search levels...',
            'levels.quiz': 'Quiz',
            'levels.fill_blank': 'Fill in the blanks',
            'levels.code_editor': 'Code editor',

            // Achievement names
            'ach.first-steps.name': 'First Steps',
            'ach.first-steps.desc': 'Complete your first level',
            'ach.getting-started.name': 'Getting Started',
            'ach.getting-started.desc': 'Complete 5 levels',
            'ach.dedicated.name': 'Dedicated',
            'ach.dedicated.desc': 'Complete 25 levels',
            'ach.veteran.name': 'Veteran',
            'ach.veteran.desc': 'Complete 50 levels',
            'ach.master.name': 'Master',
            'ach.master.desc': 'Complete 100 levels',
            'ach.html-starter.name': 'HTML Student',
            'ach.html-starter.desc': 'Complete 10 HTML levels',
            'ach.html-master.name': 'HTML Builder',
            'ach.html-master.desc': 'Complete all HTML levels',
            'ach.css-starter.name': 'CSS Student',
            'ach.css-starter.desc': 'Complete 10 CSS levels',
            'ach.css-master.name': 'CSS Artist',
            'ach.css-master.desc': 'Complete all CSS levels',
            'ach.js-starter.name': 'JS Student',
            'ach.js-starter.desc': 'Complete 10 JavaScript levels',
            'ach.js-master.name': 'JS Astronaut',
            'ach.js-master.desc': 'Complete all JavaScript levels',
            'ach.polyglot.name': 'Polyglot',
            'ach.polyglot.desc': 'Complete 10 levels in each language',
            'ach.full-stack.name': 'Fullstack Developer',
            'ach.full-stack.desc': 'Complete all levels in all languages',
            'ach.quick-learner.name': 'Quick Learner',
            'ach.quick-learner.desc': 'Complete 5 levels in under a minute each',
            'ach.speed-demon.name': 'Speed Demon',
            'ach.speed-demon.desc': 'Complete 20 levels in under a minute each',
            'ach.accurate.name': 'Accurate',
            'ach.accurate.desc': 'Complete 10 levels on the first try',
            'ach.perfectionist.name': 'Perfectionist',
            'ach.perfectionist.desc': 'Complete 30 levels on the first try',
            'ach.xp-100.name': 'Beginner',
            'ach.xp-100.desc': 'Earn 100 XP',
            'ach.xp-500.name': 'Experienced',
            'ach.xp-500.desc': 'Earn 500 XP',
            'ach.xp-1000.name': 'Collector',
            'ach.xp-1000.desc': 'Earn 1000 XP',
            'ach.xp-2500.name': 'Legend',
            'ach.xp-2500.desc': 'Earn 2500 XP',
            'ach.streak-3.name': 'In the Groove',
            'ach.streak-3.desc': 'Study 3 days in a row',
            'ach.streak-7.name': 'Weekly Marathon',
            'ach.streak-7.desc': 'Study 7 days in a row',
            'ach.streak-30.name': 'Iron Will',
            'ach.streak-30.desc': 'Study 30 days in a row',
            'ach.rank-developer.name': 'Developer',
            'ach.rank-developer.desc': 'Reach the "Developer" rank',
            'ach.rank-expert.name': 'Expert',
            'ach.rank-expert.desc': 'Reach the "Expert" rank',
            'ach.rank-legend.name': 'Code Legend',
            'ach.rank-legend.desc': 'Reach the maximum rank',

            // Course names for levels page
            'course.html.subtitle': 'Builder',
            'course.css.subtitle': 'Artist',
            'course.js.subtitle': 'Astronaut',
            'course.ts.subtitle': 'Engineer',
            'course.react.subtitle': 'Architect',
            'course.node.subtitle': 'Backend Engineer',
            'course.figma.subtitle': 'Designer',
            'course.python.subtitle': 'Snake Tamer',
            'course.git.subtitle': 'Version Keeper'
        }
    },

    /**
     * Initialize i18n - load saved language preference
     */
    init() {
        if (typeof Storage !== 'undefined' && Storage.getSettings) {
            const settings = Storage.getSettings();
            this.currentLang = settings.language || 'ru';
        }
        document.documentElement.lang = this.currentLang;
    },

    /**
     * Get translation by key
     */
    t(key) {
        const lang = this.translations[this.currentLang];
        if (lang && lang[key]) return lang[key];
        // Fallback to Russian
        const ru = this.translations['ru'];
        if (ru && ru[key]) return ru[key];
        return key;
    },

    /**
     * Update page with translations (for data-i18n attributes)
     */
    updatePage() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = this.t(key);
            if (translation !== key) {
                el.innerHTML = translation;
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            el.placeholder = this.t(key);
        });
    },

    /**
     * Set language and update everything
     */
    setLanguage(lang) {
        this.currentLang = lang;
        document.documentElement.lang = lang;

        // Save to settings
        if (typeof Storage !== 'undefined' && Storage.getSettings) {
            const settings = Storage.getSettings();
            settings.language = lang;
            Storage.saveSettings(settings);
        }

        // Update all data-i18n elements
        this.updatePage();

        // Dispatch event for JS-rendered content
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    },

    /**
     * Toggle between Russian and English
     */
    toggleLanguage() {
        this.setLanguage(this.currentLang === 'ru' ? 'en' : 'ru');
    },

    /**
     * Setup language toggle button (call on every page)
     */
    setupToggle() {
        const toggle = document.getElementById('langToggle');
        const flag = document.getElementById('langFlag');
        if (!toggle || !flag) return;

        // Set initial state
        flag.textContent = this.currentLang.toUpperCase();

        // Click handler
        toggle.addEventListener('click', () => {
            this.toggleLanguage();
            flag.textContent = this.currentLang.toUpperCase();
        });
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
