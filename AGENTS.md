# AGENTS.md

Dify is an open-source platform for building LLM applications, agentic workflows, and RAG pipelines. This monorepo contains the backend API (`api/`), frontend application (`web/`), deployment assets (`docker/`), standalone agent backend (`dify-agent/`), CLI (`cli/`), and end-to-end suite (`e2e/`). Follow the nearest scoped `AGENTS.md` for the files being changed. Apply its guidance within the user's requested scope; explicit user instructions take precedence over workflow defaults.

## Repository Gotchas

- Run backend commands through `uv run --project api <command>`.
- Backend integration tests are CI-only and are not expected to run locally.
- Keep `docker/.env.example` limited to variables required for a default Docker Compose deployment to start. Put optional and provider-specific settings in the matching `docker/envs/*.env.example` file; `docker/.env` overrides those service-specific env files.

## Cursor Cloud specific instructions

Before changing code, sync `langgenius/dify` `main`. The environment start script adds an `upstream` remote when it is missing, fetches `upstream/main`, fast-forwards when the current checkout contains no local commits, and otherwise merges `upstream/main`. If that merge changes `pnpm-lock.yaml` or `api/uv.lock`, it refreshes dependencies.

Web development runs from the repository root through Vite+. `vp`, `vpr`, and `vpx` are installed globally from the `vite-plus` version in `pnpm-workspace.yaml`. Start the frontend and the dev proxy together with:

```bash
vpr dev
```

`vpr dev` is `vp run dev`. It runs vinext and `web` `dev:proxy` together. The app is at `http://localhost:3000`. The proxy listens on `127.0.0.1:5001` and reads `web/.env.local`.

`DEV_PROXY_TARGET` defaults to `https://saas.dify.dev`. The same file lists the other backends:

- `https://agent.dify.dev` for Agent v2
- `https://saas.dify.dev` for SaaS dev
- `https://console-staging.dify.dev` for pre-production staging

Change `DEV_PROXY_TARGET` and `DEV_PROXY_PUBLIC_TARGET` together, then restart `vpr dev`. The proxy owns port 5001, so leave the local API stopped while it is running.

Node `24.22.1`, pnpm `12.10.1`, and Python `3.13` match the repository pins. API dependencies are installed with `uv sync --project api --group dev` for backend work and are not started by default. Frontend tests use `vp test --project unit` from `web/`.
