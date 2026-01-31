/**
 * Figma Levels for CodeQuest
 * Theme: Designer / Creative
 * Type: Quiz/Theory
 */

const figmaLevels = [
    // ===== Module 1: Основы интерфейса =====
    {
        id: 'figma-01',
        module: 'Основы интерфейса',
        title: 'Что такое Figma?',
        difficulty: 1,
        type: 'quiz',
        description: '<strong>Figma</strong> — это браузерный инструмент для дизайна интерфейсов и прототипирования.<br><br>Главные преимущества Figma:<br>• Работает в браузере (не нужно устанавливать)<br>• Совместная работа в реальном времени<br>• Бесплатная версия для личных проектов<br>• Кроссплатформенность (Windows, Mac, Linux)',
        question: 'Где работает Figma?',
        options: ['В браузере', 'Только на Mac', 'Только в Photoshop', 'В командной строке'],
        correct: 0,
        hint: 'Figma работает прямо в браузере, что делает его доступным везде',
        xp: 10
    },
    {
        id: 'figma-02',
        module: 'Основы интерфейса',
        title: 'Панель инструментов',
        difficulty: 1,
        type: 'quiz',
        description: 'Панель инструментов находится в верхней части экрана. Основные инструменты:<br><br>• <strong>Move Tool (V)</strong> — перемещение объектов<br>• <strong>Frame Tool (F)</strong> — создание фреймов<br>• <strong>Rectangle Tool (R)</strong> — прямоугольники<br>• <strong>Text Tool (T)</strong> — текст<br>• <strong>Pen Tool (P)</strong> — рисование путей',
        question: 'Какая горячая клавиша активирует инструмент перемещения (Move)?',
        options: ['V', 'M', 'P', 'T'],
        correct: 0,
        hint: 'V = Move (как в Photoshop)',
        xp: 10
    },
    {
        id: 'figma-03',
        module: 'Основы интерфейса',
        title: 'Левая панель',
        difficulty: 1,
        type: 'quiz',
        description: 'Левая панель содержит:<br><br>• <strong>Layers</strong> — дерево слоёв (все объекты на холсте)<br>• <strong>Assets</strong> — компоненты и стили проекта<br>• <strong>Pages</strong> — страницы файла<br><br>Слои организованы иерархически: фреймы содержат другие элементы.',
        question: 'Где находится список всех слоёв проекта?',
        options: ['Левая панель', 'Правая панель', 'Верхняя панель', 'Нижняя панель'],
        correct: 0,
        hint: 'Слои всегда слева — это стандарт в дизайн-программах',
        xp: 10
    },
    {
        id: 'figma-04',
        module: 'Основы интерфейса',
        title: 'Правая панель',
        difficulty: 1,
        type: 'quiz',
        description: 'Правая панель (<strong>Design Panel</strong>) показывает свойства выбранного объекта:<br><br>• <strong>Position</strong> — координаты X, Y<br>• <strong>Size</strong> — ширина и высота<br>• <strong>Fill</strong> — заливка (цвет, градиент)<br>• <strong>Stroke</strong> — обводка<br>• <strong>Effects</strong> — тени и размытия',
        question: 'Какое свойство отвечает за цвет заливки объекта?',
        options: ['Fill', 'Stroke', 'Effects', 'Position'],
        correct: 0,
        hint: 'Fill = заливка (от англ. "заполнять")',
        xp: 10
    },
    {
        id: 'figma-05',
        module: 'Основы интерфейса',
        title: 'Навигация по холсту',
        difficulty: 1,
        type: 'quiz',
        description: 'Способы навигации по холсту:<br><br>• <strong>Пробел + перетаскивание</strong> — панорамирование<br>• <strong>Ctrl/Cmd + колёсико</strong> — масштабирование<br>• <strong>Ctrl/Cmd + 0</strong> — показать всё (Zoom to Fit)<br>• <strong>Ctrl/Cmd + 1</strong> — масштаб 100%<br>• <strong>Shift + 1</strong> — выбранный объект на весь экран',
        question: 'Как перемещаться по холсту?',
        options: ['Пробел + перетаскивание', 'Alt + клик', 'Ctrl + клик', 'Shift + перетаскивание'],
        correct: 0,
        hint: 'Пробел временно включает режим "рука" для перемещения',
        xp: 10
    },
    {
        id: 'figma-06',
        module: 'Основы интерфейса',
        title: 'Создание фигур',
        difficulty: 1,
        type: 'quiz',
        description: 'Горячие клавиши для создания фигур:<br><br>• <strong>R</strong> — прямоугольник (Rectangle)<br>• <strong>O</strong> — эллипс (Oval)<br>• <strong>L</strong> — линия (Line)<br>• <strong>P</strong> — перо (Pen)<br>• <strong>Shift</strong> при рисовании — сохраняет пропорции',
        question: 'Какая клавиша создаёт прямоугольник?',
        options: ['R', 'O', 'L', 'S'],
        correct: 0,
        hint: 'R = Rectangle (прямоугольник)',
        xp: 10
    },
    {
        id: 'figma-07',
        module: 'Основы интерфейса',
        title: 'Текст',
        difficulty: 1,
        type: 'quiz',
        description: 'Для создания текста используй клавишу <strong>T</strong>.<br><br>Типы текстовых блоков:<br>• <strong>Auto width</strong> — ширина подстраивается под текст<br>• <strong>Auto height</strong> — высота подстраивается<br>• <strong>Fixed size</strong> — фиксированный размер<br><br>Свойства текста: шрифт, размер, вес, межстрочный интервал.',
        question: 'Какая клавиша активирует текстовый инструмент?',
        options: ['T', 'W', 'F', 'A'],
        correct: 0,
        hint: 'T = Text (текст)',
        xp: 10
    },
    // 🏆 Контрольное задание модуля 1
    {
        id: 'figma-07-challenge',
        module: 'Основы интерфейса',
        title: '🏆 Контрольное: Интерфейс Figma',
        difficulty: 3,
        type: 'quiz',
        description: '<strong>🏆 КОНТРОЛЬНОЕ ЗАДАНИЕ</strong><br><br>Проверь свои знания об интерфейсе Figma!<br><br>Вспомни:<br>• Расположение панелей<br>• Горячие клавиши инструментов<br>• Способы навигации',
        question: 'Какая комбинация клавиш показывает весь холст (Zoom to Fit)?',
        options: ['Ctrl/Cmd + 0', 'Ctrl/Cmd + 1', 'Ctrl/Cmd + Z', 'Ctrl/Cmd + S'],
        correct: 0,
        hint: '0 — показать всё, 1 — масштаб 100%',
        xp: 50
    },

    // ===== Module 2: Фреймы и слои =====
    {
        id: 'figma-08',
        module: 'Фреймы и слои',
        title: 'Что такое Frame?',
        difficulty: 1,
        type: 'quiz',
        description: '<strong>Frame</strong> (фрейм) — основной контейнер в Figma.<br><br>Особенности фреймов:<br>• Могут содержать другие элементы<br>• Имеют собственные размеры<br>• Поддерживают Auto Layout<br>• Могут обрезать содержимое (Clip content)<br><br>Горячая клавиша: <strong>F</strong>',
        question: 'Что такое Frame в Figma?',
        options: ['Контейнер для элементов', 'Тип шрифта', 'Анимация', 'Цветовая схема'],
        correct: 0,
        hint: 'Frame — это как "коробка", в которую кладут элементы',
        xp: 10
    },
    {
        id: 'figma-09',
        module: 'Фреймы и слои',
        title: 'Preset размеры',
        difficulty: 1,
        type: 'quiz',
        description: 'При создании Frame (F) справа появляются готовые размеры:<br><br>• <strong>Phone</strong> — iPhone, Android (390×844, 360×800)<br>• <strong>Tablet</strong> — iPad (820×1180)<br>• <strong>Desktop</strong> — компьютер (1440×900)<br>• <strong>Presentation</strong> — слайды (1920×1080)<br><br>Можно создать свой размер вручную.',
        question: 'Какой типичный размер для десктопа?',
        options: ['1440×900', '390×844', '64×64', '100×100'],
        correct: 0,
        hint: 'Десктоп обычно шире и ниже, чем мобильные устройства',
        xp: 10
    },
    {
        id: 'figma-10',
        module: 'Фреймы и слои',
        title: 'Группы vs Фреймы',
        difficulty: 2,
        type: 'quiz',
        description: 'Группы и фреймы — разные вещи!<br><br><strong>Group (Ctrl/Cmd + G):</strong><br>• Просто объединяет элементы<br>• Размер определяется содержимым<br>• Нет Auto Layout<br><br><strong>Frame (Ctrl/Cmd + Alt + G):</strong><br>• Контейнер с собственными размерами<br>• Поддерживает Auto Layout<br>• Может обрезать содержимое',
        question: 'Чем Frame отличается от Group?',
        options: ['Frame поддерживает Auto Layout', 'Group поддерживает Auto Layout', 'Ничем не отличаются', 'Frame только для текста'],
        correct: 0,
        hint: 'Auto Layout — главное преимущество фреймов',
        xp: 15
    },
    {
        id: 'figma-11',
        module: 'Фреймы и слои',
        title: 'Иерархия слоёв',
        difficulty: 2,
        type: 'quiz',
        description: 'Слои организованы как дерево:<br><br>• Элемент выше в списке — находится поверх<br>• Элементы внутри Frame — его дети<br>• Перетаскивание меняет порядок<br><br>Горячие клавиши:<br>• <strong>Ctrl/Cmd + ]</strong> — поднять выше<br>• <strong>Ctrl/Cmd + [</strong> — опустить ниже',
        question: 'Элемент выше в списке слоёв находится...',
        options: ['Поверх других', 'Под другими', 'Сбоку', 'Не влияет'],
        correct: 0,
        hint: 'Как стопка бумаг: верхний лист виден',
        xp: 15
    },
    {
        id: 'figma-12',
        module: 'Фреймы и слои',
        title: 'Constraints',
        difficulty: 2,
        type: 'quiz',
        description: '<strong>Constraints</strong> определяют, как элемент ведёт себя при изменении размера родителя.<br><br>Горизонтальные: Left, Right, Left & Right, Center, Scale<br>Вертикальные: Top, Bottom, Top & Bottom, Center, Scale<br><br>Пример: кнопка с "Right" останется у правого края при расширении.',
        question: 'Что делают Constraints?',
        options: ['Управляют поведением при изменении размера', 'Меняют цвет', 'Добавляют анимацию', 'Создают компоненты'],
        correct: 0,
        hint: 'Constraints = ограничения, привязки к краям',
        xp: 15
    },
    // 🏆 Контрольное задание модуля 2
    {
        id: 'figma-12-challenge',
        module: 'Фреймы и слои',
        title: '🏆 Контрольное: Фреймы',
        difficulty: 3,
        type: 'quiz',
        description: '<strong>🏆 КОНТРОЛЬНОЕ ЗАДАНИЕ</strong><br><br>Проверь понимание фреймов и слоёв!',
        question: 'Как создать Frame из выделенных элементов?',
        options: ['Ctrl/Cmd + Alt + G', 'Ctrl/Cmd + G', 'Ctrl/Cmd + F', 'Ctrl/Cmd + N'],
        correct: 0,
        hint: 'Alt добавляется к стандартной группировке',
        xp: 50
    },

    // ===== Module 3: Auto Layout =====
    {
        id: 'figma-13',
        module: 'Auto Layout',
        title: 'Что такое Auto Layout?',
        difficulty: 2,
        type: 'quiz',
        description: '<strong>Auto Layout</strong> — автоматическое выравнивание элементов внутри фрейма.<br><br>Преимущества:<br>• Элементы автоматически выстраиваются<br>• Размер фрейма подстраивается под контент<br>• Легко менять отступы и порядок<br><br>Горячая клавиша: <strong>Shift + A</strong>',
        question: 'Какая клавиша добавляет Auto Layout?',
        options: ['Shift + A', 'Ctrl + A', 'Alt + A', 'A'],
        correct: 0,
        hint: 'Shift + A = Auto Layout',
        xp: 15
    },
    {
        id: 'figma-14',
        module: 'Auto Layout',
        title: 'Направление Auto Layout',
        difficulty: 2,
        type: 'quiz',
        description: 'Auto Layout может располагать элементы:<br><br>• <strong>Horizontal</strong> — в строку (слева направо)<br>• <strong>Vertical</strong> — в столбец (сверху вниз)<br>• <strong>Wrap</strong> — с переносом на новую строку<br><br>Направление выбирается в правой панели после применения Auto Layout.',
        question: 'Какое направление располагает элементы сверху вниз?',
        options: ['Vertical', 'Horizontal', 'Diagonal', 'Circular'],
        correct: 0,
        hint: 'Vertical = вертикальный (сверху вниз)',
        xp: 15
    },
    {
        id: 'figma-15',
        module: 'Auto Layout',
        title: 'Gap и Padding',
        difficulty: 2,
        type: 'quiz',
        description: 'В Auto Layout есть два типа отступов:<br><br>• <strong>Gap</strong> — расстояние между элементами<br>• <strong>Padding</strong> — отступы от краёв фрейма до контента<br><br>Padding можно задать одинаковым для всех сторон или разным для каждой.',
        question: 'Что такое Gap в Auto Layout?',
        options: ['Расстояние между элементами', 'Отступы от краёв', 'Размер шрифта', 'Толщина обводки'],
        correct: 0,
        hint: 'Gap = разрыв, промежуток между элементами',
        xp: 15
    },
    {
        id: 'figma-16',
        module: 'Auto Layout',
        title: 'Alignment',
        difficulty: 2,
        type: 'quiz',
        description: 'Выравнивание элементов в Auto Layout:<br><br>• По главной оси (направление Auto Layout)<br>• По поперечной оси (перпендикулярно)<br><br>Варианты: Start, Center, End, Space Between<br><br>9 точек в UI позволяют быстро выбрать положение.',
        question: 'Space Between распределяет элементы...',
        options: ['С равными промежутками', 'В центре', 'Слева', 'Справа'],
        correct: 0,
        hint: 'Space Between — равномерные промежутки между элементами',
        xp: 15
    },
    {
        id: 'figma-17',
        module: 'Auto Layout',
        title: 'Resizing',
        difficulty: 2,
        type: 'quiz',
        description: 'Режимы изменения размера в Auto Layout:<br><br>• <strong>Hug contents</strong> — размер по содержимому<br>• <strong>Fixed</strong> — фиксированный размер<br>• <strong>Fill container</strong> — заполнить родителя<br><br>Можно задать отдельно для ширины и высоты.',
        question: 'Какой режим подстраивает размер под содержимое?',
        options: ['Hug contents', 'Fixed', 'Fill container', 'Auto'],
        correct: 0,
        hint: 'Hug = обнимать, т.е. "обхватить" содержимое',
        xp: 15
    },
    // 🏆 Контрольное задание модуля 3
    {
        id: 'figma-17-challenge',
        module: 'Auto Layout',
        title: '🏆 Контрольное: Auto Layout',
        difficulty: 3,
        type: 'quiz',
        description: '<strong>🏆 КОНТРОЛЬНОЕ ЗАДАНИЕ</strong><br><br>Проверь знание Auto Layout!',
        question: 'Как добавить Auto Layout к выделенному фрейму?',
        options: ['Shift + A', 'Ctrl + Shift + A', 'Alt + A', 'A'],
        correct: 0,
        hint: 'Shift + A — главная комбинация для Auto Layout',
        xp: 50
    },

    // ===== Module 4: Компоненты =====
    {
        id: 'figma-18',
        module: 'Компоненты',
        title: 'Что такое компонент?',
        difficulty: 2,
        type: 'quiz',
        description: '<strong>Компонент</strong> — переиспользуемый элемент дизайна.<br><br>• <strong>Main Component</strong> — оригинал (с иконкой ромба)<br>• <strong>Instance</strong> — копия, связанная с оригиналом<br><br>Изменения в Main Component автоматически применяются ко всем Instance.<br><br>Создать компонент: <strong>Ctrl/Cmd + Alt + K</strong>',
        question: 'Что происходит при изменении Main Component?',
        options: ['Все Instance обновляются', 'Ничего не происходит', 'Main Component удаляется', 'Создаётся новый файл'],
        correct: 0,
        hint: 'Main = главный, изменения распространяются на все копии',
        xp: 15
    },
    {
        id: 'figma-19',
        module: 'Компоненты',
        title: 'Создание Instance',
        difficulty: 2,
        type: 'quiz',
        description: 'Способы создания Instance (копии компонента):<br><br>• <strong>Copy-Paste</strong> — скопировать компонент<br>• <strong>Alt + перетаскивание</strong> — дублирование<br>• <strong>Из панели Assets</strong> — перетащить на холст<br><br>Instance можно переопределять (Override) без влияния на Main Component.',
        question: 'Откуда можно перетащить компонент на холст?',
        options: ['Панель Assets', 'Панель Layers', 'Панель Pages', 'Панель Plugins'],
        correct: 0,
        hint: 'Assets содержит все компоненты и стили проекта',
        xp: 15
    },
    {
        id: 'figma-20',
        module: 'Компоненты',
        title: 'Overrides',
        difficulty: 2,
        type: 'quiz',
        description: '<strong>Override</strong> — изменение Instance без влияния на Main Component.<br><br>Можно переопределять:<br>• Текст<br>• Заливку и обводку<br>• Вложенные компоненты<br>• Видимость слоёв<br><br>Значок "отличается" показывает, что Instance изменён.',
        question: 'Что такое Override в контексте компонентов?',
        options: ['Изменение Instance', 'Удаление компонента', 'Экспорт в PNG', 'Создание анимации'],
        correct: 0,
        hint: 'Override = переопределить, изменить копию',
        xp: 15
    },
    {
        id: 'figma-21',
        module: 'Компоненты',
        title: 'Variants',
        difficulty: 3,
        type: 'quiz',
        description: '<strong>Variants</strong> — вариации одного компонента.<br><br>Примеры:<br>• Кнопка: Default, Hover, Active, Disabled<br>• Чекбокс: Checked, Unchecked<br>• Иконка: Filled, Outlined<br><br>Варианты объединяются в один компонент с переключателями свойств.',
        question: 'Для чего используются Variants?',
        options: ['Для разных состояний компонента', 'Для экспорта', 'Для комментариев', 'Для версионирования'],
        correct: 0,
        hint: 'Variants — разные "версии" одного компонента (кнопка нажата/не нажата)',
        xp: 20
    },
    {
        id: 'figma-22',
        module: 'Компоненты',
        title: 'Компонентные свойства',
        difficulty: 3,
        type: 'quiz',
        description: '<strong>Component Properties</strong> позволяют настраивать Instance без Overrides:<br><br>• <strong>Boolean</strong> — показать/скрыть элемент<br>• <strong>Instance swap</strong> — замена вложенного компонента<br>• <strong>Text</strong> — редактируемый текст<br><br>Свойства отображаются в правой панели при выборе Instance.',
        question: 'Какое свойство позволяет показать/скрыть элемент?',
        options: ['Boolean', 'Instance swap', 'Text', 'Number'],
        correct: 0,
        hint: 'Boolean — true/false, вкл/выкл',
        xp: 20
    },
    // 🏆 Контрольное задание модуля 4
    {
        id: 'figma-22-challenge',
        module: 'Компоненты',
        title: '🏆 Контрольное: Компоненты',
        difficulty: 4,
        type: 'quiz',
        description: '<strong>🏆 КОНТРОЛЬНОЕ ЗАДАНИЕ</strong><br><br>Проверь знание компонентов!',
        question: 'Как создать компонент из выделенного элемента?',
        options: ['Ctrl/Cmd + Alt + K', 'Ctrl/Cmd + K', 'Ctrl/Cmd + C', 'Ctrl/Cmd + G'],
        correct: 0,
        hint: 'K — от слова "Komponent" :)',
        xp: 50
    },

    // ===== Module 5: Стили и переменные =====
    {
        id: 'figma-23',
        module: 'Стили',
        title: 'Цветовые стили',
        difficulty: 2,
        type: 'quiz',
        description: '<strong>Color Styles</strong> — сохранённые цвета для переиспользования.<br><br>Преимущества:<br>• Единое место для изменения цвета<br>• Консистентность дизайна<br>• Быстрое применение<br><br>Создать: выбрать объект → иконка стиля в Fill → "+"',
        question: 'Зачем нужны Color Styles?',
        options: ['Для единообразия цветов', 'Для анимации', 'Для экспорта', 'Для комментариев'],
        correct: 0,
        hint: 'Стили обеспечивают consistency (единообразие)',
        xp: 15
    },
    {
        id: 'figma-24',
        module: 'Стили',
        title: 'Текстовые стили',
        difficulty: 2,
        type: 'quiz',
        description: '<strong>Text Styles</strong> сохраняют настройки текста:<br><br>• Шрифт и размер<br>• Вес (Regular, Bold, etc.)<br>• Межстрочный интервал<br>• Межбуквенный интервал<br><br>Применяй стили для заголовков, параграфов, подписей.',
        question: 'Что НЕ сохраняется в Text Style?',
        options: ['Цвет текста', 'Размер шрифта', 'Шрифт', 'Межстрочный интервал'],
        correct: 0,
        hint: 'Цвет — отдельный Color Style, не часть Text Style',
        xp: 15
    },
    {
        id: 'figma-25',
        module: 'Стили',
        title: 'Effect Styles',
        difficulty: 2,
        type: 'quiz',
        description: '<strong>Effect Styles</strong> сохраняют визуальные эффекты:<br><br>• <strong>Drop Shadow</strong> — тень снаружи<br>• <strong>Inner Shadow</strong> — тень внутри<br>• <strong>Layer Blur</strong> — размытие слоя<br>• <strong>Background Blur</strong> — размытие фона за объектом',
        question: 'Какой эффект создаёт тень снаружи объекта?',
        options: ['Drop Shadow', 'Inner Shadow', 'Layer Blur', 'Background Blur'],
        correct: 0,
        hint: 'Drop = падать, тень "падает" от объекта',
        xp: 15
    },
    {
        id: 'figma-26',
        module: 'Стили',
        title: 'Variables',
        difficulty: 3,
        type: 'quiz',
        description: '<strong>Variables</strong> — переменные для дизайн-токенов.<br><br>Типы:<br>• <strong>Color</strong> — цвета<br>• <strong>Number</strong> — размеры, отступы<br>• <strong>String</strong> — текст<br>• <strong>Boolean</strong> — true/false<br><br>Variables поддерживают режимы (Light/Dark theme).',
        question: 'Что могут хранить Variables?',
        options: ['Все перечисленное', 'Только цвета', 'Только числа', 'Только текст'],
        correct: 0,
        hint: 'Variables — универсальное хранилище для разных типов данных',
        xp: 20
    },
    // 🏆 Контрольное задание модуля 5
    {
        id: 'figma-26-challenge',
        module: 'Стили',
        title: '🏆 Контрольное: Стили',
        difficulty: 3,
        type: 'quiz',
        description: '<strong>🏆 КОНТРОЛЬНОЕ ЗАДАНИЕ</strong><br><br>Проверь знание стилей и переменных!',
        question: 'Какой стиль используется для теней и размытий?',
        options: ['Effect Style', 'Color Style', 'Text Style', 'Grid Style'],
        correct: 0,
        hint: 'Effect = эффект (тени, размытия)',
        xp: 50
    },

    // ===== Module 6: Прототипирование =====
    {
        id: 'figma-27',
        module: 'Прототипирование',
        title: 'Режим Prototype',
        difficulty: 2,
        type: 'quiz',
        description: 'Вкладка <strong>Prototype</strong> в правой панели позволяет:<br><br>• Создавать связи между экранами<br>• Настраивать анимации переходов<br>• Добавлять интерактивность<br>• Просматривать прототип<br><br>Связи создаются перетаскиванием от элемента к целевому фрейму.',
        question: 'Где находится вкладка Prototype?',
        options: ['В правой панели', 'В левой панели', 'В верхней панели', 'В отдельном окне'],
        correct: 0,
        hint: 'Правая панель: Design и Prototype — две вкладки',
        xp: 15
    },
    {
        id: 'figma-28',
        module: 'Прототипирование',
        title: 'Trigger и Action',
        difficulty: 2,
        type: 'quiz',
        description: '<strong>Trigger</strong> — что запускает действие:<br>• On Click, On Hover, On Drag, While Pressing<br><br><strong>Action</strong> — что происходит:<br>• Navigate To — переход на другой фрейм<br>• Open Overlay — открыть как модальное окно<br>• Back — вернуться назад<br>• Close Overlay — закрыть оверлей',
        question: 'Какой триггер срабатывает при наведении мыши?',
        options: ['On Hover', 'On Click', 'On Drag', 'On Press'],
        correct: 0,
        hint: 'Hover = наведение курсора',
        xp: 15
    },
    {
        id: 'figma-29',
        module: 'Прототипирование',
        title: 'Анимации переходов',
        difficulty: 2,
        type: 'quiz',
        description: 'Типы анимаций перехода:<br><br>• <strong>Instant</strong> — мгновенно<br>• <strong>Dissolve</strong> — плавное затухание<br>• <strong>Move In/Out</strong> — движение<br>• <strong>Push</strong> — выталкивание<br>• <strong>Slide In/Out</strong> — скольжение<br>• <strong>Smart Animate</strong> — умная анимация',
        question: 'Какая анимация автоматически анимирует изменения между состояниями?',
        options: ['Smart Animate', 'Dissolve', 'Instant', 'Push'],
        correct: 0,
        hint: 'Smart = умный, Figma сам определяет что анимировать',
        xp: 15
    },
    {
        id: 'figma-30',
        module: 'Прототипирование',
        title: 'Overlay',
        difficulty: 2,
        type: 'quiz',
        description: '<strong>Overlay</strong> — фрейм, который открывается поверх текущего экрана.<br><br>Используется для:<br>• Модальных окон<br>• Dropdown меню<br>• Tooltip<br>• Bottom sheets<br><br>Настройки: позиция, затемнение фона, закрытие по клику вне.',
        question: 'Для чего используется Overlay?',
        options: ['Для модальных окон', 'Для навигации', 'Для экспорта', 'Для комментариев'],
        correct: 0,
        hint: 'Overlay = наложение, что-то поверх основного экрана',
        xp: 15
    },
    // 🏆 Контрольное задание модуля 6
    {
        id: 'figma-30-challenge',
        module: 'Прототипирование',
        title: '🏆 Контрольное: Прототипы',
        difficulty: 3,
        type: 'quiz',
        description: '<strong>🏆 КОНТРОЛЬНОЕ ЗАДАНИЕ</strong><br><br>Проверь знание прототипирования!',
        question: 'Как запустить просмотр прототипа?',
        options: ['Кнопка Play или Ctrl/Cmd + Alt + Enter', 'Ctrl/Cmd + P', 'Ctrl/Cmd + R', 'F5'],
        correct: 0,
        hint: 'Кнопка Play в правом верхнем углу',
        xp: 50
    },

    // ===== Module 7: Плагины и интеграции =====
    {
        id: 'figma-31',
        module: 'Плагины',
        title: 'Что такое плагины?',
        difficulty: 2,
        type: 'quiz',
        description: '<strong>Плагины</strong> расширяют функциональность Figma:<br><br>Популярные плагины:<br>• <strong>Unsplash</strong> — бесплатные фото<br>• <strong>Iconify</strong> — тысячи иконок<br>• <strong>Lorem Ipsum</strong> — текст-заглушка<br>• <strong>Contrast</strong> — проверка контраста<br><br>Установка: меню Resources → Plugins',
        question: 'Где найти плагины в Figma?',
        options: ['Resources → Plugins', 'File → Plugins', 'Edit → Plugins', 'View → Plugins'],
        correct: 0,
        hint: 'Resources (ресурсы) содержит плагины и виджеты',
        xp: 15
    },
    {
        id: 'figma-32',
        module: 'Плагины',
        title: 'Dev Mode',
        difficulty: 2,
        type: 'quiz',
        description: '<strong>Dev Mode</strong> — режим для разработчиков.<br><br>Возможности:<br>• Просмотр CSS свойств<br>• Копирование кода<br>• Измерение отступов<br>• Просмотр структуры компонентов<br><br>Переключение: кнопка "&lt;/&gt;" в правом верхнем углу.',
        question: 'Для кого предназначен Dev Mode?',
        options: ['Для разработчиков', 'Для дизайнеров', 'Для менеджеров', 'Для маркетологов'],
        correct: 0,
        hint: 'Dev = Developer (разработчик)',
        xp: 15
    },
    {
        id: 'figma-33',
        module: 'Плагины',
        title: 'Экспорт',
        difficulty: 2,
        type: 'quiz',
        description: 'Экспорт элементов из Figma:<br><br>Форматы:<br>• <strong>PNG</strong> — растровое изображение с прозрачностью<br>• <strong>JPG</strong> — сжатое изображение<br>• <strong>SVG</strong> — векторная графика<br>• <strong>PDF</strong> — документ<br><br>Масштаб: 1x, 2x, 3x и т.д.',
        question: 'Какой формат лучше для иконок на сайте?',
        options: ['SVG', 'PNG', 'JPG', 'PDF'],
        correct: 0,
        hint: 'SVG — векторный, масштабируется без потери качества',
        xp: 15
    },
    // 🏆 Финальное контрольное задание
    {
        id: 'figma-33-challenge',
        module: 'Плагины',
        title: '🏆 Финальное: Мастер Figma',
        difficulty: 5,
        type: 'quiz',
        description: '<strong>🏆 ФИНАЛЬНОЕ КОНТРОЛЬНОЕ ЗАДАНИЕ</strong><br><br>Поздравляем! Ты прошёл весь курс по Figma!<br><br>Вспомни всё, что узнал:<br>• Интерфейс и навигация<br>• Фреймы и Auto Layout<br>• Компоненты и Variants<br>• Стили и переменные<br>• Прототипирование',
        question: 'Какая команда дублирует выделенный элемент?',
        options: ['Ctrl/Cmd + D', 'Ctrl/Cmd + C', 'Ctrl/Cmd + V', 'Ctrl/Cmd + X'],
        correct: 0,
        hint: 'D = Duplicate (дублировать)',
        xp: 75
    },

    // ===== Дополнительные уровни =====
    {
        id: 'figma-34',
        module: 'Горячие клавиши',
        title: 'Zoom',
        difficulty: 1,
        type: 'quiz',
        description: 'Горячие клавиши масштабирования:<br><br>• <strong>Ctrl/Cmd + +</strong> — приблизить<br>• <strong>Ctrl/Cmd + -</strong> — отдалить<br>• <strong>Ctrl/Cmd + 0</strong> — показать всё<br>• <strong>Ctrl/Cmd + 1</strong> — масштаб 100%<br>• <strong>Ctrl/Cmd + 2</strong> — выделенное на экран',
        question: 'Как приблизить холст?',
        options: ['Ctrl/Cmd + +', 'Ctrl/Cmd + -', 'Ctrl/Cmd + 0', 'Ctrl/Cmd + 1'],
        correct: 0,
        hint: '+ = увеличить, - = уменьшить',
        xp: 10
    },
    {
        id: 'figma-35',
        module: 'Горячие клавиши',
        title: 'Копирование',
        difficulty: 1,
        type: 'quiz',
        description: 'Команды для работы с элементами:<br><br>• <strong>Ctrl/Cmd + C</strong> — копировать<br>• <strong>Ctrl/Cmd + V</strong> — вставить<br>• <strong>Ctrl/Cmd + D</strong> — дублировать<br>• <strong>Ctrl/Cmd + X</strong> — вырезать<br>• <strong>Alt + перетаскивание</strong> — дублировать и переместить',
        question: 'Как скопировать элемент?',
        options: ['Ctrl/Cmd + C', 'Ctrl/Cmd + D', 'Ctrl/Cmd + V', 'Ctrl/Cmd + X'],
        correct: 0,
        hint: 'C = Copy (копировать)',
        xp: 10
    },
    {
        id: 'figma-36',
        module: 'Горячие клавиши',
        title: 'Отмена действий',
        difficulty: 1,
        type: 'quiz',
        description: 'История изменений:<br><br>• <strong>Ctrl/Cmd + Z</strong> — отменить (Undo)<br>• <strong>Ctrl/Cmd + Shift + Z</strong> — повторить (Redo)<br>• <strong>Ctrl/Cmd + Y</strong> — альтернативный Redo<br><br>Figma сохраняет историю автоматически!',
        question: 'Как отменить последнее действие?',
        options: ['Ctrl/Cmd + Z', 'Ctrl/Cmd + Y', 'Ctrl/Cmd + R', 'Ctrl/Cmd + S'],
        correct: 0,
        hint: 'Z = отмена (стандарт во всех программах)',
        xp: 10
    },
    {
        id: 'figma-37',
        module: 'Горячие клавиши',
        title: 'Выделение',
        difficulty: 1,
        type: 'quiz',
        description: 'Способы выделения:<br><br>• <strong>Клик</strong> — выделить один элемент<br>• <strong>Shift + клик</strong> — добавить к выделению<br>• <strong>Ctrl/Cmd + A</strong> — выделить всё<br>• <strong>Ctrl/Cmd + клик</strong> — выбрать элемент внутри группы<br>• <strong>Enter</strong> — войти внутрь группы',
        question: 'Как добавить элемент к текущему выделению?',
        options: ['Shift + клик', 'Ctrl + клик', 'Alt + клик', 'Просто клик'],
        correct: 0,
        hint: 'Shift добавляет к выделению (как в любой программе)',
        xp: 10
    },
    {
        id: 'figma-38',
        module: 'Горячие клавиши',
        title: 'Сохранение',
        difficulty: 1,
        type: 'quiz',
        description: '<strong>Figma сохраняет автоматически!</strong><br><br>Но полезные команды:<br>• <strong>Ctrl/Cmd + S</strong> — принудительное сохранение<br>• <strong>Ctrl/Cmd + Shift + E</strong> — экспорт<br>• <strong>Ctrl/Cmd + Shift + K</strong> — вставить как PNG<br><br>Все изменения синхронизируются в облако.',
        question: 'Нужно ли вручную сохранять в Figma?',
        options: ['Нет, сохраняется автоматически', 'Да, обязательно', 'Только раз в час', 'Только при закрытии'],
        correct: 0,
        hint: 'Figma — облачный инструмент с автосохранением',
        xp: 10
    },
    {
        id: 'figma-39',
        module: 'Горячие клавиши',
        title: 'Булевые операции',
        difficulty: 2,
        type: 'quiz',
        description: '<strong>Boolean Operations</strong> — объединение фигур:<br><br>• <strong>Union</strong> — объединить<br>• <strong>Subtract</strong> — вычесть<br>• <strong>Intersect</strong> — пересечение<br>• <strong>Exclude</strong> — исключить пересечение<br><br>Доступны в верхней панели при выборе нескольких фигур.',
        question: 'Какая операция объединяет фигуры?',
        options: ['Union', 'Subtract', 'Intersect', 'Exclude'],
        correct: 0,
        hint: 'Union = союз, объединение',
        xp: 15
    },
    {
        id: 'figma-40',
        module: 'Горячие клавиши',
        title: 'Выравнивание',
        difficulty: 2,
        type: 'quiz',
        description: 'Команды выравнивания (при выделении нескольких элементов):<br><br>• <strong>Alt + A</strong> — по левому краю<br>• <strong>Alt + D</strong> — по правому краю<br>• <strong>Alt + W</strong> — по верхнему краю<br>• <strong>Alt + S</strong> — по нижнему краю<br>• <strong>Alt + V/H</strong> — по центру',
        question: 'Как выровнять элементы по левому краю?',
        options: ['Alt + A', 'Alt + D', 'Alt + W', 'Alt + S'],
        correct: 0,
        hint: 'A = слева (на клавиатуре слева от D)',
        xp: 15
    }
];

// Make available globally
window.figmaLevels = figmaLevels;
