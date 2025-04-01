FROM node:latest AS base

WORKDIR /app

COPY . .

RUN npm install \
    && npm run build

FROM base AS api
CMD ["npm", "run", "start"]

FROM base AS db-init
CMD ["node", "dist/index.js", "--initialize"]