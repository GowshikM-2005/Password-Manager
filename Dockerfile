FROM ubuntu as build

WORKDIR /src

COPY package*.json ./


RUN apt-get update && \
    apt-get install -y curl gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get install -y build-essential && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* 

RUN npm install

COPY . .


RUN  npm run build 

FROM node:18-alpine
#./dist can Be Used for the TO Get Secific Directory From the Base Image
COPY --from=build /src/dsit ./dsit

ENTRYPOINT [ "node" ]

CMD [ "dist/index.js","0.0.0.0:8080" ]
