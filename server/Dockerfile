##> BASE <##
FROM node:24.7-bookworm AS base

RUN apt-get install bash curl

RUN curl -s https://packagecloud.io/install/repositories/ookla/speedtest-cli/script.deb.sh | bash
RUN apt-get install speedtest
RUN speedtest --accept-license --accept-gdpr

RUN npm i -g npm@11.1.0
##< BASE >##

##> BUILDER <##
FROM base AS builder

WORKDIR /usr/src/app

COPY ./package*.json .
RUN npm ci

COPY . .
RUN npm run build
##< BUILDER >##

##> RUNNER <##
FROM base AS runner

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json .
COPY --from=builder /usr/src/app/.env .
COPY --from=builder /usr/src/app/dist ./dist

RUN npm ci --omit=dev && npm cache clean --force

CMD ["npm", "run", "start:prod"]
##< RUNNER >##
