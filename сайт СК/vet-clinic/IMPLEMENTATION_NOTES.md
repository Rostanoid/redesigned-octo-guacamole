# Инструкции по запуску проекта

## Требования
- Node.js 18.17+ или Node.js 20+
- PostgreSQL 14+
- npm или yarn

## Установка Node.js

1. Скачайте Node.js с официального сайта: https://nodejs.org
2. Выберите LTS версию (рекомендуется)
3. Установите, следуя инструкциям установщика
4. Проверьте установку:
   ```bash
   node --version
   npm --version
   ```

## Установка зависимостей

```bash
npm install
```

## Настройка базы данных

1. Создайте файл `.env` на основе `.env.example`:
   ```bash
   cp .env.example .env
   ```

2. Установите переменную DATABASE_URL в `.env`:
   ```
   DATABASE_URL="postgresql://postgres:password@localhost:5432/vet_clinic?schema=public"
   ```
   
   Замените `password` на ваш пароль PostgreSQL и убедитесь, что база `vet_clinic` создана.

3. Примените схему к базе данных:
   ```bash
   npm run db:push
   ```

4. Сгенерируйте Prisma Client:
   ```bash
   npm run db:generate
   ```

5. Заполните базу начальными данными (если есть seed файл):
   ```bash
   npm run db:seed
   ```

## Запуск сервера разработки

```bash
npm run dev
```

Сервер будет доступен по адресу http://localhost:3000

## Сборка для продакшена

```bash
npm run build
npm run start
```

## Структура проекта

```
vet-clinic/
├── src/
│   ├── app/
│   │   ├── api/           # Route Handlers (Next.js 14 API)
│   │   │   ├── auth/      # Авторизация
│   │   │   ├── pets/      # Управление питомцами
│   │   │   ├── appointments/ # Записи на прием
│   │   │   ├── subscriptions/ # Подписки
│   │   │   └── ...        
│   │   ├── dashboard/     # Личный кабинет
│   │   ├── globals.css    # Глобальные стили
│   │   ├── layout.tsx     # Корневой layout
│   │   └── ...            # Публичные страницы
│   ├── components/
│   │   ├── layout/        # Header, Footer, Sidebar
│   │   ├── sections/      # Hero, карточки, формы
│   │   └── ui/           # UI компоненты
│   ├── lib/
│   │   ├── prisma.ts      # Prisma клиент
│   │   ├── auth.ts        # JWT helpers
│   │   └── validations.ts # Zod схемы
│   └── types/
│       └── index.ts       # TypeScript типы
├── prisma/
│   └── schema.prisma      # Схема БД
├── package.json
└── tailwind.config.js
```

## Архитектура

- **App Router**: используется Next.js 14 с App Router
- **Серверные компоненты**: данные загружаются в серверных компонентах через async функции
- **Route Handlers**: API роуты в `src/app/api/*/route.ts`
- **Без UI библиотек**: только Tailwind CSS + кастомные компоненты
- **TypeScript**: строгая типизация наружу

## Переменные окружения

| Переменная | Описание |
|-----------|----------|
| DATABASE_URL | Строка подключения к PostgreSQL |
| JWT_SECRET | Секрет для подписи JWT токенов |
| STRIPE_SECRET_KEY | Ключ Stripe для платежей |
| NEXT_PUBLIC_APP_URL | URL приложения (для fetch запросов) |