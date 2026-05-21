# ea10203u202410239

## Battlefy Competitive Gaming Platform

A Vue 3 web application for managing esports tournaments and competitive gaming events.

## Description

This application provides a Tournament Planning & Management platform for Battlefy, allowing organizers to:
- Browse all tournaments with player and game statistics
- Edit tournaments by managing their registered games
- Add new games to tournaments (sourced from the FreeToGame API)
- Delete existing tournament games with confirmation
- Full i18n support in English and Spanish

## Stack

| Layer | Technology |
|---|---|
| Framework | Vue 3.5 (Composition API) |
| Build Tool | Vite 5 |
| UI Library | PrimeVue 4 (Lara preset) |
| CSS Utilities | PrimeFlex |
| Icons | PrimeIcons |
| State Management | Pinia |
| Routing | Vue Router 4 |
| HTTP Client | Axios |
| i18n | Vue I18n 9 |
| Mock Backend | json-server 0.17.4 |

## Project Structure (Domain-Driven)

```
src/
├── shared/                       # Shared/common elements
│   ├── infrastructure/
│   │   ├── http.service.js       # Axios base instance
│   │   ├── i18n/                 # Locale files (en, es)
│   │   └── router/               # Vue Router config
│   └── presentation/
│       └── views/
│           ├── home-view.vue
│           └── not-found-view.vue
├── tournamenting/                # Tournament bounded context
│   ├── domain/
│   │   ├── tournament.entity.js
│   │   └── tournament-game.entity.js
│   ├── infrastructure/
│   │   ├── tournament.api.js
│   │   ├── tournament-game.api.js
│   │   ├── tournament.assembler.js
│   │   └── tournament-game.assembler.js
│   ├── application/
│   │   └── tournament.store.js   # Pinia store
│   └── presentation/
│       ├── components/
│       │   └── tournament-summary.vue
│       └── views/
│           ├── tournament-list-view.vue
│           ├── tournament-edit-view.vue
│           └── tournament-game-new-view.vue
└── gaming/                       # Gaming bounded context (FreeToGame API)
    └── infrastructure/
        └── free-to-game.api.js
```

## Configuration

### Environment Variables (`.env`)

```
VITE_API_BASE_URL=http://localhost:3000
VITE_FREETOGAME_API_URL=https://www.freetogame.com/api
VITE_LOGO_DEV_URL=https://img.logo.dev
```

### Setup & Running

```bash
# 1. Start the mock backend
cd server
cd server && json-server --watch db.json

# 2. Install frontend dependencies
npm install

# 3. Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

## Navigation Routes

| Route | View |
|---|---|
| `/` | Redirects to `/home` |
| `/home` | Home view |
| `/planning/tournaments` | Tournaments list |
| `/planning/tournaments/:id/edit` | Edit Tournament |
| `/planning/tournaments/:id/games/new` | New Tournament Game |
| `/*` | Page Not Found |

## Author

Brianna Salinas Guzman
Course: Aplicaciones Web
Date: May 2026
