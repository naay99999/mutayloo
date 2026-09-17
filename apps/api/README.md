# API

The API is an Elysia application running on Bun.

## Commands

```bash
bun --filter api dev
bun --filter api test
bun --filter api typecheck
bun --filter api lint
```

## Configuration

Copy `.env.example` to `.env.local` when needed. The defaults are `HOST=0.0.0.0` and `PORT=6767`.

For production, set `NODE_ENV=production` and `CORS_ORIGINS` to a comma-separated list of exact frontend origins. Startup fails if the allowlist is absent. CORS credentials are disabled until an authentication design explicitly requires them.

## Endpoints

- `GET /` returns the existing welcome response.
- `GET /health` returns `{ "status": "ok" }` for liveness checks.

Errors use `{ "code", "message" }` and never expose internal stack traces to clients.
