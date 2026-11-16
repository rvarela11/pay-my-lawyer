# Pay My Lawyer

## About

Secure payment processing for law firms, and a simple way for clients to pay their attorney.

## Prerequisites

- Node.js (LTS)
- npm

## Getting Started

1. `git clone git@github.com:rvarela11/pay-my-lawyer.git`
2. `npm install`
3. `npm run dev` (serves at http://localhost:3000)

## Scripts

| Command           | Description                                                 |
| ----------------- | ----------------------------------------------------------- |
| `npm run dev`     | Start the dev server                                        |
| `npm run build`   | Type-check and build to `dist/`                             |
| `npm run lint`    | Run ESLint                                                  |
| `npm test`        | Run the tests in watch mode (`npm test -- --run` runs once) |
| `npm run preview` | Preview the production build                                |

## Deployment

Every pull request runs lint, tests and the build (`.github/workflows/ci.yml`).
Pushes to `main` run the tests and deploy to GitHub Pages (`.github/workflows/deploy.yml`).

## Stack

- Vite
- React
- TypeScript
- React Router
- Material UI
- See `package.json` for everything else
