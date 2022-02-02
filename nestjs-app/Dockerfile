FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --no-optional && npm cache clean --force
# RUN npm install

COPY . .

EXPOSE ${PORT}

ENTRYPOINT [ "npm", "run", "dev" ]