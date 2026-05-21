# Battlefy Competitive Gaming Platform

<p align="center">
  <img src="https://img.logo.dev/battlefy.com?token=pk_TuM4vPV-TuG_vvYdK_k_Mw&retina=true" alt="Battlefy Logo" height="80"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vue-3.5-42b883?style=for-the-badge&logo=vue.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/PrimeVue-4-3B82F6?style=for-the-badge&logo=primevue&logoColor=white" />
  <img src="https://img.shields.io/badge/Pinia-2-F7D336?style=for-the-badge&logo=pinia&logoColor=black" />
  <img src="https://img.shields.io/badge/i18n-EN%20%7C%20ES-4CAF50?style=for-the-badge" />
</p>

---

## Description

Web application for **Battlefy** — a tournament planning and management platform for competitive esports events.

Organizers can browse tournaments, manage their registered games, add new games sourced from the [FreeToGame API](https://www.freetogame.com/api-doc), and remove them with confirmation. All content is available in English and Spanish.

---

## Features

| View | Route | Description |
|------|-------|-------------|
| **Home** | `/home` | Landing page with platform introduction |
| **Tournaments** | `/planning/tournaments` | Browse all tournaments with player and game stats |
| **Edit Tournament** | `/planning/tournaments/:id/edit` | Manage games registered to a tournament |
| **New Tournament Game** | `/planning/tournaments/:id/games/new` | Add a game sourced from FreeToGame API |
| **Page Not Found** | `/*` | Displays the attempted route with a back-to-home button |

- **FreeToGame integration** — Real game catalog to populate tournaments
- **i18n** — Full English and Spanish support via `vue-i18n`
- **Language Switcher** — Toggle EN / ES from the toolbar
- **Delete with confirmation** — PrimeVue ConfirmDialog before removing a game
- **Responsive Design** — PrimeFlex grid adapts to any screen size
- **Dark Mode** — Lara dark theme applied globally

---

## Tech Stack

| Technology | Version | Role |
|---|---|---|
| [Vue 3](https://vuejs.org) | 3.5 | Front-end framework (Composition API) |
| [Vite](https://vitejs.dev) | 5 | Build tool & dev server |
| [PrimeVue](https://primevue.org) | 4 | UI component library (Lara preset) |
| [PrimeFlex](https://primeflex.org) | 3 | CSS utility classes |
| [PrimeIcons](https://primevue.org/icons) | 7 | Icon library |
| [Pinia](https://pinia.vuejs.org) | 2 | State management |
| [Vue Router](https://router.vuejs.org) | 4 | Client-side routing |
| [Axios](https://axios-http.com) | 1.6 | HTTP client |
| [Vue I18n](https://vue-i18n.intlify.dev) | 9 | Internationalization |
| [json-server](https://github.com/typicode/json-server) | 0.17 | Local fake REST API |
| [FreeToGame API](https://www.freetogame.com/api-doc) | — | External game catalog |
| [Logo.dev](https://www.logo.dev) | — | Brand logo resolution |

---

## Architecture

The project follows **Domain-Driven Design (DDD)** with a layered architecture organized by bounded context:

```
src/
├── shared/                         # Cross-cutting concerns
│   ├── infrastructure/
│   │   ├── http.service.js         # Axios base instance
│   │   ├── i18n/                   # Locale files (en.js, es.js)
│   │   └── router/                 # Vue Router configuration
│   └── presentation/
│       └── views/
│           ├── home-view.vue
│           └── not-found-view.vue
│
├── tournamenting/                  # Bounded context: tournaments
│   ├── domain/
│   │   ├── tournament.entity.js
│   │   └── tournament-game.entity.js
│   ├── infrastructure/
│   │   ├── tournament.api.js
│   │   ├── tournament-game.api.js
│   │   ├── tournament.assembler.js
│   │   └── tournament-game.assembler.js
│   ├── application/
│   │   └── tournament.store.js     # Pinia store
│   └── presentation/
│       ├── components/
│       │   └── tournament-summary.vue
│       └── views/
│           ├── tournament-list-view.vue
│           ├── tournament-edit-view.vue
│           └── tournament-game-new-view.vue
│
└── gaming/                         # Bounded context: game catalog
    └── infrastructure/
        └── free-to-game.api.js     # FreeToGame external API
```

**Design patterns applied:** Store (Pinia) · Assembler · API/Endpoint · Repository

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>= 18`
- npm `>= 9`

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/brianna-salinas/Battlefy.git
cd Battlefy

# 2. Install dependencies
npm install
```

### Running locally

Both servers must run simultaneously. Open **two terminals**:

**Terminal 1 — Fake REST API (json-server)**
```bash
npx json-server --watch server/db.json --port 3000
# API available at http://localhost:3000
# Endpoints:
#   GET  /tournaments
#   GET  /tournament-games
#   POST /tournament-games
#   DELETE /tournament-games/:id
```

**Terminal 2 — Vue dev server**
```bash
npm run dev
# App available at http://localhost:5173
```

### Available scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server at `localhost:5173` |
| `npm run build` | Build for production (output: `dist/`) |
| `npm run preview` | Preview the production build locally |

---

## Environment Variables

Create a `.env` file in the root of the project (already included):

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_FREETOGAME_API_URL=/freetogame-api
VITE_LOGO_DEV_URL=https://img.logo.dev
VITE_LOGO_DEV_TOKEN=pk_TuM4vPV-TuG_vvYdK_k_Mw
```

> The FreeToGame API is proxied through Vite (`/freetogame-api`) to avoid CORS issues in development. See `vite.config.js` for the proxy configuration.

---

## Internationalization

Translation files are located in `src/shared/infrastructure/i18n/`:

| File | Language |
|------|----------|
| `en.js` | English |
| `es.js` | Spanish |

To add a new language, create a new JS file in that folder and register it in `src/shared/infrastructure/i18n/index.js`.

---

## API Reference (json-server)

Base URL: `http://localhost:3000`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/tournaments` | List all tournaments |
| `GET` | `/tournament-games?tournamentId=:id` | Get games for a tournament |
| `POST` | `/tournament-games` | Register a new game to a tournament |
| `DELETE` | `/tournament-games/:id` | Remove a game from a tournament |

Seed data is defined in `server/db.json`.

---

## Author

**Brianna Salinas Guzman**
- Course: Aplicaciones Web — May 2026

---

## 📄 License

This project was developed for academic purposes as part of the Web Applications course.
