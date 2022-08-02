FROM node:lts-alpine as base

FROM base as build

WORKDIR /build

COPY package*.json ./
#COPY package.json ./package.json

RUN npm i

COPY src ./src
COPY public ./public
COPY tsconfig.json ./tsconfig.json

RUN npm run build


FROM base as runTime
WORKDIR /app
COPY --from=build /build/build ./build

RUN npm i -g serve
EXPOSE 80
CMD serve -s -p $PORT build