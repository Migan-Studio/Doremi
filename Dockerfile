FROM node:16.19.1
RUN mkdir /app
WORKDIR /app
COPY . .
RUN yarn install --immutable --immutable-cache
RUN yarn build

ENV SHELL=/bin/bash

ENTRYPOINT ["yarn", "start"]
