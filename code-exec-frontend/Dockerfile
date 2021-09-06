FROM node:16-alpine3.11

WORKDIR /app

COPY package.json package.json
copy package-lock.json package-lock.json

RUN npm install

COPY . .
