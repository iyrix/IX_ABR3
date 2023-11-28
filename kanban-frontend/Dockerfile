
FROM node:18.18.2 as builder

WORKDIR /usr/src/app


COPY package*.json ./


RUN npm install


COPY . .

RUN npm run build

FROM node:18.18.2-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist /usr/src/app/dist

RUN npm install -g http-server

EXPOSE 3000


CMD ["http-server", "-p", "3000", "dist"]
