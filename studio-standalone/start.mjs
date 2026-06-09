import { spawn } from "node:child_process";

// Builds the `mastra studio` command from environment variables so the
// static Studio UI can be pointed at any running Mastra server.
const args = ["studio", "--port", process.env.PORT ?? "3000"];

// MASTRA_SERVER_URL accepts a full URL (e.g. https://my-mastra.up.railway.app).
// When omitted, Studio shows a connect form on first load.
const serverUrl = process.env.MASTRA_SERVER_URL;
if (serverUrl) {
  const url = new URL(/^https?:\/\//.test(serverUrl) ? serverUrl : `https://${serverUrl}`);
  args.push("--server-protocol", url.protocol.replace(":", ""));
  args.push("--server-host", url.hostname);
  args.push("--server-port", url.port || (url.protocol === "http:" ? "80" : "443"));
}

if (process.env.MASTRA_SERVER_API_PREFIX) {
  args.push("--server-api-prefix", process.env.MASTRA_SERVER_API_PREFIX);
}

const child = spawn("mastra", args, { stdio: "inherit" });
child.on("exit", (code) => process.exit(code ?? 0));
