FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./
# RUN npm install
RUN npm install --no-optional && npm cache clean --force

COPY . .

ENV FASTIFY_HOST=0.0.0.0

EXPOSE ${PORT}

ENTRYPOINT [ "npm", "run", "dev2" ]
