##> BASE <##
FROM node:21-alpine3.18 AS base

RUN apk add --no-cache bash speedtest-cli
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

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json .
COPY --from=builder /usr/src/app/.env* .

RUN npm ci --only=production && npm cache clean --force

CMD ["npm", "run", "start:prod"]
##< PRODUCTION >##
