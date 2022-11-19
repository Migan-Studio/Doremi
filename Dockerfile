FROM node:18.11.0
RUN mkdir app
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build

ENV SHELL=/bin/bash

CMD yarn start