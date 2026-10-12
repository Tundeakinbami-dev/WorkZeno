# Development

Install JavaScript dependencies with `npm install`, then use `npm run dev`. The web server defaults to `http://localhost:3000`.

Copy `.env.example` to `apps/web/.env.local` or an equivalent local environment file. Values are configuration only; the current UI does not yet submit network transactions.

Before contributing, run `npm run validate`. Run `npm run contract:test` after installing Rust/Soroban.
