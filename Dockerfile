FROM node:20.12.2-slim as base
ARG NODE_ENV
WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl

FROM base as deps
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm ci

FROM deps as build
COPY . /app
RUN npm run build

FROM base as run
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=deps /app/package.json /app/package.json

COPY --from=build /app/public /app/public
COPY --from=build /app/.next /app/.next
COPY --from=build /app/.env /app/.env

ENV HOST=0.0.0.0
EXPOSE 3000
