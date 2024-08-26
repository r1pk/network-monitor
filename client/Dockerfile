##> BASE <##
FROM node:22.5-bookworm AS base

ARG VITE_API_URL

RUN apt-get install bash

RUN npm i -g npm@10.8.2 serve@14.2.3
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

COPY --from=builder /usr/src/app/dist ./dist

CMD ["serve", "-s", "dist", "-l", "3000"]
##< PRODUCTION >##
