# ==== base ====
FROM node:24-bookworm-slim AS base

WORKDIR /app

# install the Ookla Speedtest CLI
RUN apt-get update \
    && apt-get install -y --no-install-recommends curl ca-certificates \
    && curl -s https://packagecloud.io/install/repositories/ookla/speedtest-cli/script.deb.sh | bash \
    && apt-get install -y --no-install-recommends speedtest \
    && apt-get purge -y curl \
    && apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/*

RUN timeout 4 speedtest --accept-license --accept-gdpr || true

RUN mkdir -p /home/node/.config/ookla \
    && cp /root/.config/ookla/speedtest-cli.json /home/node/.config/ookla/speedtest-cli.json \
    && chown -R node:node /home/node/.config
# ==== base ====

# ==== development ====
FROM base AS development

CMD ["npm", "run", "start:dev"]
# ==== development ====

# ==== client-builder ====
FROM base AS client-builder

COPY client/package*.json ./
RUN npm ci

COPY client/ ./
RUN npm run build
# ==== client-builder ====

# ==== server-builder ====
FROM base AS server-builder

COPY server/package*.json ./
RUN npm ci

COPY server/ ./
RUN npm run build

COPY --from=client-builder /app/dist ./dist/public
# ==== server-builder ====

# ==== production ====
FROM base AS production

RUN mkdir -p /app/storage
RUN chown -R node:node /app

USER node

COPY --chown=node:node server/package*.json ./
RUN npm ci --omit=dev

COPY --chown=node:node server/.env.default ./.env
COPY --chown=node:node --from=server-builder /app/dist ./dist

CMD ["node", "dist/main"]
# ==== production ====
