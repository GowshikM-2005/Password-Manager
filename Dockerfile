FROM Ubuntu as Build

COPY package.json ./

RUN mkdir /app

WORKDIR /app

COPY . /app

RUN npm install

FROM node:18-alpine

COPY --from=Build /app /app

ENTRYPOINT [ "node", "/app","8200"]
