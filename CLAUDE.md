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
- Components live flat in `src/` (no `components/` folder) and share one stylesheet, `src/App.css`. Data flows one way: `App` holds the data and passes it down as props, and children report changes back through callbacks.
  - `App.jsx`: owns the transaction list via `useState` (hard-coded seed data, held only in memory and lost on reload) and `handleAdd`, which appends using a functional update (`prev => [...prev, t]`). It renders the three children below.
  - `Summary.jsx`: receives `transactions` and derives total income, total expenses and the balance on each render. It holds no state.
  - `AddTransaction.jsx`: receives `categories` and `onAdd`. It owns the form-field state, builds the new transaction (`id: Date.now()`, today's date) and calls `onAdd`, then resets the form.
  - `TransactionList.jsx`: receives `transactions` and `categories`. It owns the type/category filter state and derives the filtered list it renders as a table.
- Transaction shape: `{ id, description, amount, type: "income" | "expense", category, date: "YYYY-MM-DD" }`. `amount` is a **number**; the form's number input yields a string, so `AddTransaction`'s `handleSubmit` converts it with `Number()` before storing.
- The `categories` list is a module-level constant in `App.jsx`, passed as a prop to both `AddTransaction` (form dropdown) and `TransactionList` (filter dropdown).

## Lint rules worth knowing

The flat config (`eslint.config.js`) enables the `react-hooks` and `react-refresh` (Vite) presets. `no-unused-vars` is an error, except for names that start with an uppercase letter or `_`.
