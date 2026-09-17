# ==== client builder ====
FROM node:24.7-bookworm AS client-builder

WORKDIR /app

COPY ./client/package*.json .
RUN npm ci

COPY ./client .
RUN npm run build
# ==== client builder ====

# ==== server builder ====
FROM node:24.7-bookworm AS server-builder

WORKDIR /app

COPY ./server/package*.json .
RUN npm ci

COPY ./server .
RUN npm run build

RUN npm prune --omit=dev && npm cache clean --force
# ==== server builder ====

# ==== runner ====
FROM node:24.7-bookworm-slim AS runner

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates curl tini

RUN curl -s https://packagecloud.io/install/repositories/ookla/speedtest-cli/script.deb.sh | bash \
    && apt-get install -y speedtest \
    && speedtest --accept-license --accept-gdpr

RUN rm -rf /var/lib/apt/lists/*

COPY --from=server-builder /app/node_modules ./node_modules
COPY --from=server-builder /app/package*.json .

COPY --from=server-builder /app/dist ./dist
COPY --from=client-builder /app/dist ./dist/public

RUN mkdir -p storage && chown -R node:node /app/storage
VOLUME /app/storage

ENV NODE_ENV=production
ENV SERVER_PORT=8080
ENV DATABASE_PATH=/app/storage/sqlite.db
ENV DATABASE_SYNCHRONIZE=true

USER node

ENTRYPOINT ["tini", "--"]
CMD ["node", "dist/main"]
# ==== runner ====
