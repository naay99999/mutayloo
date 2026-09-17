# Elysia with Bun runtime

## Getting Started
To get started with this template, simply paste this command into your terminal:
```bash
bun create elysia ./elysia-example
```

## Development
To start the development server run:
```bash
bun run dev
```

Open http://localhost:6767/ with your browser to see the result.

From the repository root, run `bun install` then `bun run dev` to start both apps.
The storefront app uses Eden Treaty and imports the API type from the `api` workspace.
Its default API URL is `http://localhost:6767`; set `VITE_API_URL` in
`apps/storefront/.env.local` to override it (see `apps/storefront/.env.example`).
CORS allows localhost and 127.0.0.1 on storefront ports 5173/4173 and
admin ports 5174/4174. Run `bun run dev:admin` from the root to start only admin.
