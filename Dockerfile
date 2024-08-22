# Stage 1: Build
FROM ubuntu AS build
WORKDIR /App

COPY package*.json ./

# Install dependencies and Node.js in a single command
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y --no-install-recommends nodejs build-essential && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN npm install

COPY . .

RUN npm run build

# Inspect directory contents after build
RUN ls -la

# Stage 2: Production
FROM node:18-alpine
WORKDIR /App

# Assuming the build output is in a different directory, adjust this path accordingly
COPY --from=build /App/dist /App  # Adjust this path based on your build output

ENTRYPOINT ["node"]
CMD ["index.js", "0.0.0.0:8080"]  # Adjust this command based on your entry point
