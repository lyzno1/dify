# AGENTS.md

## Project Overview

Dify is an open-source platform for developing LLM applications with an intuitive interface combining agentic AI workflows, RAG pipelines, agent capabilities, and model management.

The codebase is split into:

- **Backend API** (`/api`): Python Flask application organized with Domain-Driven Design
- **Frontend Web** (`/web`): Next.js 15 application using TypeScript and React 19
- **Docker deployment** (`/docker`): Containerized deployment configurations

## Backend Workflow

- Run backend CLI commands through `uv run --project api <command>`.

- Before submission, all backend modifications must pass local checks: `make lint`, `make type-check`, and `uv run --project api --dev dev/pytest/pytest_unit_tests.sh`.

- Use Makefile targets for linting and formatting; `make lint` and `make type-check` cover the required checks.

- Integration tests are CI-only and are not expected to run in the local environment.

## Frontend Workflow

```bash
cd web
pnpm lint
pnpm lint:fix
pnpm test
```

## Testing & Quality Practices

- Follow TDD: red → green → refactor.
- Use `pytest` for backend tests with Arrange-Act-Assert structure.
- Enforce strong typing; avoid `Any` and prefer explicit type annotations.
- Write self-documenting code; only add comments that explain intent.

## Language Style

- **Python**: Keep type hints on functions and attributes, and implement relevant special methods (e.g., `__repr__`, `__str__`).
- **TypeScript**: Use the strict config, lean on ESLint + Prettier workflows, and avoid `any` types.

## General Practices

- Prefer editing existing files; add new documentation only when requested.
- Inject dependencies through constructors and preserve clean architecture boundaries.
- Handle errors with domain-specific exceptions at the correct layer.

## Project Conventions

- Backend architecture adheres to DDD and Clean Architecture principles.
- Async work runs through Celery with Redis as the broker.
- Frontend user-facing strings must use `web/i18n/en-US/`; avoid hardcoded text.

## Cursor Cloud specific instructions

PostgreSQL 16 and Redis 7 are installed on the VM and match `api/.env.example` (`postgres` / `difyai123456`, database `dify`, Redis on `127.0.0.1:6379` with that password). systemd is not running in this image, so services are started with `pg_ctlcluster` and `redis-server`, not `systemctl`. Do not start `docker/docker-compose.middleware.yaml` alongside them; it binds the same ports.

On boot, the environment start script migrates the database and launches:

- API on port 5001 (`/tmp/dify-api.log`)
- Celery worker (`/tmp/dify-worker.log`)
- Next.js dev server on port 3000 (`/tmp/dify-web.log`)

`curl http://127.0.0.1:5001/health` checks the API. A fresh database opens http://localhost:3000/install to create the admin account. Backend commands use `uv run --project api`. Frontend commands run in `web/` with pnpm 10.19.0.

Weaviate, the code sandbox, and the plugin daemon are not part of this environment. The studio can show a plugin-daemon connection error; account setup and the apps page still work. Dataset indexing and plugin installs need those extra services.
