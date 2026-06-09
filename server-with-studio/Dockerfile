FROM node:22-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
# Bundles the server and copies the Studio UI into .mastra/output/studio.
# The build also installs the output's own production dependencies.
RUN npx mastra build --studio

FROM node:22-slim

WORKDIR /app
ENV NODE_ENV=production \
    MASTRA_STUDIO_PATH=/app/studio \
    MASTRA_AUTO_DETECT_URL=true \
    MASTRA_HOST=0.0.0.0

COPY --from=build /app/.mastra/output ./

EXPOSE 4111
CMD ["node", "index.mjs"]
