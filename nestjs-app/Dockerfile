FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --no-optional && npm cache clean --force

COPY . .

EXPOSE ${PORT}

ENTRYPOINT [ "npm", "run", "dev" ]