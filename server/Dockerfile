##> BASE <##
FROM node:22.5-bookworm AS base

RUN apt-get install bash curl

RUN curl -s https://packagecloud.io/install/repositories/ookla/speedtest-cli/script.deb.sh | bash
RUN apt-get install speedtest
RUN speedtest --accept-license --accept-gdpr

RUN npm i -g npm@10.8.2
##< BASE >##

##> BUILDER <##
FROM base AS builder

WORKDIR /usr/src/app

COPY ./package*.json .
RUN npm ci

COPY . .
RUN npm run build
##< BUILDER >##

##> PRODUCTION <##
FROM base AS production

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json .
COPY --from=builder /usr/src/app/.env .
COPY --from=builder /usr/src/app/dist ./dist

RUN npm ci --only=production && npm cache clean --force

CMD ["npm", "run", "start:prod"]
##< PRODUCTION >##
