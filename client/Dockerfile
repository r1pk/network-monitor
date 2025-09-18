##> BASE <##
FROM node:24.7-bookworm AS base

RUN apt-get install bash

RUN npm i -g npm@11.1.0 serve@14.2.4
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

COPY --from=builder /usr/src/app/dist ./dist

CMD ["serve", "-s", "dist", "-l", "3000"]
##< RUNNER >##
