##> BASE <##
FROM node:21.6.1-bookworm AS base

RUN apt-get install bash curl

RUN curl -s https://packagecloud.io/install/repositories/ookla/speedtest-cli/script.deb.sh | bash
RUN apt-get install speedtest
RUN speedtest --accept-license --accept-gdpr

RUN npm i npm@latest -g
##< BASE >##

##> DEVELOPMENT <##
FROM base AS development

WORKDIR /usr/src/app

COPY package*.json .
RUN npm ci

COPY . .

ENV TSC_WATCHFILE PriorityPollingInterval
ENTRYPOINT ["npm", "run", "start:dev"]
##< DEVELOPMENT >##

##> BUILDER <##
FROM base AS builder

COPY package*.json /tmp/network-monitor/
RUN cd /tmp/network-monitor && npm ci

WORKDIR /usr/src/app

RUN cp -a /tmp/network-monitor/node_modules .
COPY . .

RUN npm run build
##< BUILDER >##

##> PRODUCTION <##
FROM base AS production

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json .
COPY --from=builder /usr/src/app/.env* .

RUN npm ci --only=production && npm cache clean --force

CMD ["npm", "run", "start:prod"]
##< PRODUCTION >##
