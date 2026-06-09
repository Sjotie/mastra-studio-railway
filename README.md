# Mastra Studio on Railway

Railway templates for deploying [Mastra Studio](https://mastra.ai/docs/studio/overview) — the interactive UI for building, testing, and managing AI agents and workflows.

Mastra Studio can be deployed in two configurations, each available as a separate Railway template from its own directory in this repo:

| Directory | Template | What it deploys |
|---|---|---|
| [`server-with-studio/`](server-with-studio/) | **Mastra Server With Studio** | A complete Mastra server (starter agent included) that serves the Studio UI alongside its API. One service, batteries included. |
| [`studio-standalone/`](studio-standalone/) | **Mastra Studio Standalone** | Only the static Studio UI. Point it at any Mastra server you already run elsewhere. |

## Mastra Server With Studio

A full [Mastra](https://mastra.ai) project built with `mastra build --studio`, so a single service serves both the REST API and the Studio UI. Comes with one example agent (with conversation memory) you can chat with in Studio and replace with your own.

### Environment variables

| Variable | Required | Description |
|---|---|---|
| `OPENAI_API_KEY` | Yes* | API key for the model provider. *Required for the default `openai/...` model. When you change `MODEL` to a different provider, set that provider's key variable instead (e.g. `ANTHROPIC_API_KEY`). |
| `MODEL` | No | Model for the starter agent in `provider/model` format. Defaults to `openai/gpt-5.4-mini`. |
| `STUDIO_AUTH_KEY` | Recommended | When set, Studio shows a login screen and all API routes require this key as a Bearer token. The Railway template generates one for you. Without it, Studio (and your agents) are publicly accessible. |
| `DATABASE_URL` | No | LibSQL URL for storage. The Railway template sets `file:/data/mastra.db` backed by a volume so memory and Studio data survive redeploys. |

### Run locally

```bash
cd server-with-studio
npm install
npm run dev          # Studio + API on http://localhost:4111
```

### Production build (what the Dockerfile does)

```bash
npm run build        # mastra build --studio
MASTRA_STUDIO_PATH=.mastra/output/studio node .mastra/output/index.mjs
```

## Mastra Studio Standalone

Serves the Studio UI as a static site via the `mastra studio` command. Use this when your Mastra server already runs elsewhere (Railway, your own infra, or locally) and you only want a hosted UI for it.

### Environment variables

| Variable | Required | Description |
|---|---|---|
| `MASTRA_SERVER_URL` | No | Full URL of the Mastra server to connect to (e.g. `https://my-mastra.up.railway.app`). When omitted, Studio shows a connect form on first load. |
| `MASTRA_SERVER_API_PREFIX` | No | API route prefix of the server. Defaults to `/api`. |

> **Note:** your Mastra server must allow CORS requests from the Studio domain, and Studio has full access to the agents on the server it connects to — secure the server with [authentication](https://mastra.ai/docs/studio/auth).

### Run locally

```bash
cd studio-standalone
npm install
PORT=3000 MASTRA_SERVER_URL=http://localhost:4111 npm start
```

## License

MIT
