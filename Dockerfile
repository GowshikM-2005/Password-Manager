FROM node:18-alpine

COPY package.json ./

RUN mkdir /app

WORKDIR /app

COPY . /app

RUN npm install &&\
    npm run build 
    
ENTRYPOINT ["node"]
EXPOSE 8200
CMD ["/app/app.jsx", "0.0.0.0:8200"]
