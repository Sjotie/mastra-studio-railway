FROM node:22.23.4-slim

WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY start.mjs ./

EXPOSE 3000
CMD ["npm", "start"]
