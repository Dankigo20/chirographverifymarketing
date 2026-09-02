# Chirograph Verify — Marketing Website

The public marketing website for **Chirograph Verify**, a device-biometric bot-prevention API built on WebAuthn.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite 5** (build tool)
- **Tailwind CSS 3** (styling)
- **Lucide React** (icons)

No backend dependencies. This is a static frontend marketing site.

## Getting Started

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`.

## Build

```bash
npm run build
```

Production output is written to `dist/`. The build is a static SPA using hash-based routing, so it works on any static host without server-side route configuration.

## Type Check

```bash
npm run typecheck
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

| Variable | Description | Default |
|---|---|---|
| `VITE_APP_URL` | URL of the existing Chirograph Verify application (dashboard, API) | `https://app.chirographverify.com` |

No secret keys are needed in the frontend. The browser only uses publishable widget keys (loaded from the app domain). Secret API keys are never embedded in client-side code.

## Deployment

This project is designed to deploy from GitHub to **Vercel** or **Netlify**.

### Vercel

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Install command:** `npm install`
- No rewrites needed — the app uses hash-based routing (`/#/security`, etc.)

### Netlify

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- No `_redirects` file needed — hash-based routing works on any static host

## Architecture

```
chirographverify.com        → this marketing frontend (static SPA)
app.chirographverify.com    → existing Chirograph Verify application (Railway)
```

The marketing frontend links to the application via `VITE_APP_URL`. It does not implement authentication, billing, or verification — those are handled by the existing backend.

## Pages

| Route | Page |
|---|---|
| `/` | Home (hero, product, how it works, capabilities, developers, use cases, security, pricing, FAQ) |
| `/#/security` | Security architecture |
| `/#/developers` | Developer documentation |
| `/#/pricing` | Pricing plans and feature comparison |
| `/#/terms` | Terms of Use |
| `/#/privacy` | Privacy Policy |
| `/#/cookies` | Cookie Policy |

## Contact

- General: hello@chirographverify.com
- Support: support@chirographverify.com
- Admin: admin@chirographverify.com
- X/Twitter: [@chirograph_V](https://x.com/chirograph_V)
