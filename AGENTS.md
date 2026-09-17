# Repository Guidelines

## Project Structure & Module Organization

This Bun workspace contains deployable applications under `apps/`:

- `apps/api/` is the Elysia HTTP API. Define routes and exported API types in `src/app.ts`; `src/index.ts` starts the server.
- `apps/storefront/` is the customer-facing React/Vite application.
- `apps/admin/` is the React/Vite administration application.

In each frontend app, keep UI in `src/`, API clients in `src/lib/`, static public files in `public/`, and imported images in `src/assets/`. Frontends consume the API through Eden Treaty and the `App` type exported by the `api` workspace.

## Build, Test, and Development Commands

Install dependencies once from the repository root:

```bash
bun install
bun run dev              # start API, storefront, and admin in parallel
bun run dev:storefront   # start only the storefront (port 5173)
bun run dev:admin        # start only admin (port 5174)
bun run dev:api          # start only API (port 6767)
bun --filter storefront build
bun --filter admin lint
```

Run each changed frontend's `build` and `lint` before submitting work. `build` type-checks with TypeScript and produces a Vite bundle. There is currently no automated test suite; do not use `apps/api`'s placeholder `test` script as validation.

## Coding Style & Naming Conventions

Use TypeScript for application code. Match the existing style: two-space indentation, single quotes, no semicolons, and trailing commas where the surrounding code uses them. Use PascalCase for React components (`App.tsx`), camelCase for functions, variables, and hooks (`loadMessage`), and concise lowercase directory names. Keep route changes reflected in the exported `App` type so typed API clients remain accurate.

## Configuration and Local Development

Copy the relevant `.env.example` to `.env.local` when overriding `VITE_API_URL`; never commit local environment files or secrets. The API CORS list is intentionally limited to the documented localhost frontend and preview ports—update it deliberately when adding a new client origin.

## Commit & Pull Request Guidelines

The available history contains only `init`, so no repository-specific commit syntax is established. Write short imperative subjects, such as `Add product route` or `Fix admin API status`. Keep commits focused. Pull requests should explain the user-visible change, note validation commands run, link the relevant issue when applicable, and include screenshots for storefront or admin UI changes.
