FROM node:16.19.0
RUN mkdir app
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build

ENV SHELL=/bin/bash

ENTRYPOINT ["yarn", "start"]