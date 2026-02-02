# sk_admin_frontend

Админ-панель на Next.js: авторизация, CRUD для новостей, отзывов, продукции, команды, вакансий, портфолио, сертификатов, заявок и SEO-настроек.

## Стек

- **Next.js 16** (App Router), **React 19**
- **TanStack Query** — запросы и кэш
- **React Hook Form** — формы
- **Axios** — HTTP, JWT в заголовках и refresh
- **Radix UI** + **Tailwind** — UI (через shadcn)
- **Biome** — линт и форматирование

## Запуск

```bash
pnpm install
pnpm dev
```

Открыть [http://localhost:3000](http://localhost:3000).

Бэкенд по умолчанию: `http://localhost:8000` (задаётся в `src/constants.ts`). Для входа и работы API бэкенд должен быть запущен.

## Скрипты

| Команда   | Действие        |
|-----------|-----------------|
| `pnpm dev`   | Режим разработки |
| `pnpm build` | Сборка           |
| `pnpm start` | Запуск продакшена |
| `pnpm lint`  | Проверка (Biome)  |
| `pnpm format`| Форматирование   |

## Структура

- `src/app/` — страницы (dashboard, login), layout, провайдеры
- `src/components/` — UI, DataTable, загрузчики, навигация
- `src/hooks/`, `src/services/` — данные и мутации по сущностям
- `src/types/` — типы для API
- `src/config/` — маршруты дашборда, бакеты медиа
- `src/shared/` — общие UI-компоненты и утилиты

Вход в панель — `/login`, после авторизации — `/dashboard`.
