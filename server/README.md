# CodeQuest Backend - Инструкция по установке

Подробное руководство по настройке бэкенда CodeQuest с MongoDB.

---

## Содержание

1. [Установка MongoDB](#1-установка-mongodb)
2. [Настройка проекта](#2-настройка-проекта)
3. [Конфигурация окружения](#3-конфигурация-окружения)
4. [Запуск сервера](#4-запуск-сервера)
5. [Создание администратора](#5-создание-администратора)
6. [Деплой на Railway](#6-деплой-на-railway)
7. [Подключение фронтенда](#7-подключение-фронтенда)

---

## 1. Установка MongoDB

### Вариант A: Локальная установка (для разработки)

#### Windows:

1. Скачайте MongoDB Community Server:
   - Перейдите на https://www.mongodb.com/try/download/community
   - Выберите версию для Windows
   - Скачайте MSI installer

2. Установите MongoDB:
   - Запустите скачанный .msi файл
   - Выберите "Complete" installation
   - ✅ Отметьте "Install MongoDB as a Service"
   - ✅ Отметьте "Install MongoDB Compass" (GUI для базы данных)

3. Проверьте установку:
   ```bash
   # Откройте PowerShell или CMD
   mongod --version
   ```

4. MongoDB автоматически запускается как Windows Service.

#### macOS:

```bash
# Установка через Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Запуск MongoDB
brew services start mongodb-community
```

#### Linux (Ubuntu/Debian):

```bash
# Импорт ключа
curl -fsSL https://pgp.mongodb.com/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

# Добавление репозитория
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Установка
sudo apt update
sudo apt install -y mongodb-org

# Запуск
sudo systemctl start mongod
sudo systemctl enable mongod
```

---

### Вариант B: MongoDB Atlas (облачная база данных - РЕКОМЕНДУЕТСЯ)

MongoDB Atlas - бесплатный облачный хостинг для MongoDB. Идеально подходит для продакшена.

1. **Создайте аккаунт:**
   - Перейдите на https://www.mongodb.com/cloud/atlas
   - Нажмите "Try Free"
   - Зарегистрируйтесь (можно через Google)

2. **Создайте кластер:**
   - Нажмите "Build a Database"
   - Выберите **FREE** (M0 Sandbox) - бесплатно навсегда!
   - Выберите провайдера (AWS, Google Cloud, Azure)
   - Выберите регион (ближайший к вам)
   - Нажмите "Create"

3. **Настройте доступ:**

   a) Создайте пользователя базы данных:
   - Перейдите в "Database Access" (левое меню)
   - Нажмите "Add New Database User"
   - Введите имя пользователя: `codequest_user`
   - Введите пароль (сохраните его!)
   - Роль: "Read and write to any database"
   - Нажмите "Add User"

   b) Разрешите IP-адреса:
   - Перейдите в "Network Access" (левое меню)
   - Нажмите "Add IP Address"
   - Нажмите "Allow Access from Anywhere" (0.0.0.0/0)
   - Нажмите "Confirm"

4. **Получите строку подключения:**
   - Перейдите в "Database" (левое меню)
   - Нажмите "Connect" на вашем кластере
   - Выберите "Connect your application"
   - Скопируйте строку подключения:

   ```
   mongodb+srv://codequest_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

   - Замените `<password>` на ваш пароль
   - Добавьте имя базы данных перед `?`:

   ```
   mongodb+srv://codequest_user:ВашПароль@cluster0.xxxxx.mongodb.net/codequest?retryWrites=true&w=majority
   ```

---

## 2. Настройка проекта

1. **Перейдите в папку сервера:**
   ```bash
   cd code-quest/server
   ```

2. **Установите зависимости:**
   ```bash
   npm install
   ```

   Будут установлены:
   - `express` - веб-фреймворк
   - `mongoose` - ODM для MongoDB
   - `bcryptjs` - хеширование паролей
   - `jsonwebtoken` - JWT токены
   - `cors` - Cross-Origin Resource Sharing
   - `dotenv` - переменные окружения
   - `express-validator` - валидация данных

---

## 3. Конфигурация окружения

1. **Создайте файл `.env`:**
   ```bash
   # Скопируйте пример
   cp .env.example .env
   ```

2. **Отредактируйте `.env`:**

   ```env
   # Порт сервера
   PORT=5000

   # Режим работы (development / production)
   NODE_ENV=development

   # Строка подключения к MongoDB
   # Для локальной MongoDB:
   MONGODB_URI=mongodb://localhost:27017/codequest

   # Для MongoDB Atlas (замените на вашу строку):
   # MONGODB_URI=mongodb+srv://codequest_user:ВашПароль@cluster0.xxxxx.mongodb.net/codequest?retryWrites=true&w=majority

   # Секретный ключ для JWT (сгенерируйте случайную строку!)
   JWT_SECRET=ваш-супер-секретный-ключ-минимум-32-символа

   # URL фронтенда для CORS
   CLIENT_URL=http://localhost:3000
   ```

3. **Генерация JWT_SECRET:**
   ```bash
   # В Node.js консоли:
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

   Или просто придумайте длинную случайную строку (минимум 32 символа).

---

## 4. Запуск сервера

### Режим разработки (с автоперезагрузкой):
```bash
npm run dev
```

### Продакшен режим:
```bash
npm start
```

### Проверка работы:
Откройте в браузере: http://localhost:5000/api/health

Должен вернуться ответ:
```json
{
  "status": "ok",
  "message": "CodeQuest API is running"
}
```

---

## 5. Создание администратора

После запуска сервера, создайте первого администратора:

### Способ 1: Через MongoDB Compass (GUI)

1. Откройте MongoDB Compass
2. Подключитесь к базе данных
3. Выберите базу `codequest` → коллекцию `users`
4. Найдите вашего пользователя
5. Измените поле `role` с `"user"` на `"admin"`

### Способ 2: Через MongoDB Shell

```bash
# Подключитесь к MongoDB
mongosh

# Выберите базу данных
use codequest

# Обновите роль пользователя
db.users.updateOne(
  { email: "ваш@email.com" },
  { $set: { role: "admin" } }
)
```

### Способ 3: Создайте скрипт

Создайте файл `create-admin.js`:

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    username: String,
    role: String,
    xp: Number,
    rank: Number,
    progress: Object,
    achievements: Array,
    stats: Object,
    createdAt: Date
});

const User = mongoose.model('User', userSchema);

async function createAdmin() {
    await mongoose.connect(process.env.MONGODB_URI);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    const admin = new User({
        email: 'admin@codequest.com',
        password: hashedPassword,
        username: 'Admin',
        role: 'admin',
        xp: 0,
        rank: 1,
        progress: {
            html: { completed: [], current: 1 },
            css: { completed: [], current: 1 },
            js: { completed: [], current: 1 },
            ts: { completed: [], current: 1 },
            react: { completed: [], current: 1 },
            node: { completed: [], current: 1 }
        },
        achievements: [],
        stats: { totalLevels: 0, streakDays: 0 },
        createdAt: new Date()
    });

    await admin.save();
    console.log('Admin created! Email: admin@codequest.com, Password: admin123');
    process.exit(0);
}

createAdmin();
```

Запустите:
```bash
node create-admin.js
```

---

## 6. Деплой на Railway

Railway позволяет бесплатно задеплоить бэкенд.

1. **Создайте аккаунт:**
   - Перейдите на https://railway.app
   - Войдите через GitHub

2. **Создайте новый проект:**
   - Нажмите "New Project"
   - Выберите "Deploy from GitHub repo"
   - Выберите ваш репозиторий

3. **Настройте сервис:**
   - Railway автоматически определит папку `server`
   - Если нет, укажите Root Directory: `server`

4. **Добавьте переменные окружения:**
   - Перейдите в Settings → Variables
   - Добавьте:
     ```
     PORT=5000
     NODE_ENV=production
     MONGODB_URI=mongodb+srv://...ваша строка подключения...
     JWT_SECRET=ваш-секретный-ключ
     CLIENT_URL=https://ваш-фронтенд.railway.app
     ```

5. **Получите URL бэкенда:**
   - Перейдите в Settings → Networking
   - Нажмите "Generate Domain"
   - Скопируйте URL (например: `https://codequest-server.up.railway.app`)

---

## 7. Подключение фронтенда

1. **Откройте файл `js/modules/api.js`**

2. **Измените baseURL:**

   Для разработки:
   ```javascript
   baseURL: 'http://localhost:5000/api',
   ```

   Для продакшена:
   ```javascript
   baseURL: 'https://ваш-бэкенд.up.railway.app/api',
   ```

3. **Или используйте переменную окружения:**
   ```javascript
   baseURL: window.API_URL || 'http://localhost:5000/api',
   ```

---

## Структура API

### Авторизация

| Метод | Endpoint | Описание |
|-------|----------|----------|
| POST | `/api/auth/register` | Регистрация |
| POST | `/api/auth/login` | Вход |
| GET | `/api/auth/me` | Текущий пользователь |
| POST | `/api/auth/logout` | Выход |

### Пользователи

| Метод | Endpoint | Описание |
|-------|----------|----------|
| PUT | `/api/users/profile` | Обновить профиль |
| POST | `/api/users/progress` | Сохранить прогресс |
| POST | `/api/users/achievements` | Добавить достижение |
| POST | `/api/users/reset` | Сбросить прогресс |
| GET | `/api/users/leaderboard` | Таблица лидеров |

### Админ-панель (требует роль admin)

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/api/admin/users` | Все пользователи |
| GET | `/api/admin/stats` | Статистика |
| GET | `/api/admin/activity` | Активность |
| PUT | `/api/admin/users/:id/role` | Изменить роль |
| DELETE | `/api/admin/users/:id` | Удалить пользователя |

---

## Решение проблем

### MongoDB не запускается

```bash
# Windows - перезапустите службу
net stop MongoDB
net start MongoDB

# Linux
sudo systemctl restart mongod
```

### Ошибка подключения к Atlas

- Проверьте, что IP разрешён в Network Access
- Проверьте правильность пароля (нет спецсимволов? закодируйте их)
- Проверьте формат строки подключения

### CORS ошибки

- Убедитесь, что CLIENT_URL в .env указан правильно
- Для разработки можно временно разрешить все:
  ```javascript
  app.use(cors({ origin: '*' }));
  ```

### JWT ошибки

- Проверьте, что JWT_SECRET одинаковый на клиенте и сервере
- Токен истекает через 7 дней, пользователю нужно перелогиниться

---

## Контакты

Если возникли вопросы, создайте Issue в репозитории.
