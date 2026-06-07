# Sport Blueprint v2

Современное React-приложение для управления спортивными программами с использованием передовых технологий.

## 🚀 Технологический стек

- **React 19** - Последняя версия React
- **TypeScript** - Типобезопасность
- **Vite** - Быстрая сборка
- **React Compiler** - Автоматическая оптимизация производительности ⚡
- **Redux Toolkit + RTK Query** - Управление состоянием и API запросами
- **React Router v7** - Маршрутизация
- **Tailwind CSS v4** - Стилизация
- **SCSS** - Дополнительные стили

## ✨ Особенности

### GitHub Pages + SPA Routing
Приложение использует `BrowserRouter`, поэтому для корректной работы deep-links (например, `/s_blueprint/login`) на GitHub Pages добавлен SPA fallback:
- `public/404.html` перенаправляет 404-запросы на формат, который может восстановить клиентский роут.
- `index.html` содержит скрипт, который восстанавливает исходный путь через `history.replaceState`.

Без этого при прямом открытии или перезагрузке вложенного маршрута GitHub Pages возвращает 404, и приложение не отображается.

### React Compiler (Автоматическая оптимизация)
Проект использует **React Compiler** для автоматической оптимизации компонентов:
- ✅ Не нужны ручные `useMemo` и `useCallback`
- ✅ Автоматическая мемоизация вычислений
- ✅ Меньше багов с зависимостями
- ✅ Проще и чище код

📖 Подробнее: [REACT_COMPILER_GUIDE.md](./REACT_COMPILER_GUIDE.md)

### RTK Query (API Management)
Все API запросы управляются через Redux Toolkit Query:
- 🔄 Автоматическое кеширование
- 🔄 Фоновые обновления
- 🔄 Оптимистичные обновления
- 🔄 Встроенные состояния загрузки

📖 Подробнее: [RTK_QUERY_MIGRATION.md](./RTK_QUERY_MIGRATION.md)

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
