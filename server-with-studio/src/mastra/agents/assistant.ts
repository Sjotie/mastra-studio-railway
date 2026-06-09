import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";

export const assistant = new Agent({
  id: "assistant",
  name: "Assistant",
  description: "A general-purpose starter assistant. Replace or extend it with your own agents.",
  instructions: `You are a helpful, concise assistant.

Answer questions directly and accurately. When you don't know something, say so.
This agent is a starting point — its owner is encouraged to customize these
instructions, add tools, and create additional agents.`,
  model: process.env.MODEL ?? "openai/gpt-5.4-mini",
  memory: new Memory({
    options: {
      lastMessages: 20,
    },
  }),
});
