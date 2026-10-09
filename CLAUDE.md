# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project context

This is the starter project for a Claude Code course: a small React expense tracker that intentionally ships with a bug, a weak UI and messy code, which get fixed over the course. Treat existing quirks as things to improve, not as conventions to copy.

## Commands

```bash
npm install       # install dependencies
npm run dev       # Vite dev server at http://localhost:5173
npm run build     # production build into dist/
npm run preview   # serve the built dist/
npm run lint      # ESLint over the whole project (dist/ is ignored)
```

No test runner is configured yet; there is no `test` script.

## Architecture

- Stack: React 19 + Vite 7, plain JavaScript (`.jsx`), no TypeScript, no router, no state library, no backend.
- Entry: `index.html` loads `src/main.jsx`, which renders `<App />` in `StrictMode` and imports the global styles in `src/index.css`.
- The entire app lives in one component, `src/App.jsx`, styled by `src/App.css`. That component owns all state through `useState`: the transaction list (hard-coded seed data, held only in memory and lost on reload), the add-transaction form fields, and the type/category filters. Totals (income, expenses, balance) and the filtered list are derived on each render.
- Transaction shape: `{ id, description, amount, type: "income" | "expense", category, date: "YYYY-MM-DD" }`. `amount` is stored as a **string**, both in the seed data and from the form's number input, so any arithmetic on it has to convert it to a number first.
- The categories list is a constant inside `App` and is used by both the form and the filter dropdowns.

## Lint rules worth knowing

The flat config (`eslint.config.js`) enables the `react-hooks` and `react-refresh` (Vite) presets. `no-unused-vars` is an error, except for names that start with an uppercase letter or `_`.
