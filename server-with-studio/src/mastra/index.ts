import { Mastra } from "@mastra/core";
import { SimpleAuth } from "@mastra/core/server";
import { LibSQLStore } from "@mastra/libsql";

import { assistant } from "./agents/assistant";

// When STUDIO_AUTH_KEY is set, Studio shows a login screen and every API
// route requires the key as a Bearer token. Without it, Studio and the API
// are publicly accessible — fine locally, not recommended on the internet.
const studioAuthKey = process.env.STUDIO_AUTH_KEY;

export const mastra = new Mastra({
  agents: { assistant },
  storage: new LibSQLStore({
    id: "mastra-storage",
    // On Railway this points at a volume (file:/data/mastra.db) so agent
    // memory and Studio data survive redeploys.
    url: process.env.DATABASE_URL ?? "file:./mastra.db",
  }),
  server: {
    // Bind all interfaces so the server is reachable inside a container.
    // PORT is picked up automatically (Railway injects it); defaults to 4111.
    host: process.env.MASTRA_HOST ?? "0.0.0.0",
    ...(studioAuthKey
      ? {
          auth: new SimpleAuth({
            tokens: {
              [studioAuthKey]: { id: "admin", name: "Admin", role: "admin" },
            },
          }),
        }
      : {}),
  },
});
