# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
# Admin development

Run `bun install` from the repository root, then `bun run dev` to start API,
storefront, and admin together. To start only admin, use `bun run dev:admin`.

Admin runs at http://localhost:5174 (preview: 4174), storefront at
http://localhost:5173 (preview: 4173), and the API at http://localhost:6767.
Ports are fixed; Vite exits if a port is occupied.

The admin uses Eden Treaty with the `App` type from the `api` workspace.
Set `VITE_API_URL` in `apps/admin/.env.local` to override the API URL;
see `.env.example`. The home page displays the API response or a connection error.
