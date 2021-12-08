import path from 'path';
import fastify, { FastifyInstance } from 'fastify';
import SwaggerPlugin from 'fastify-swagger'

import usersRoutes from './routers/users.router';
import boardsRoutes from './routers/boards.router';
import tasksRoutes from './routers/tasks.router';

const app: FastifyInstance = fastify({
  logger: {
    prettyPrint: {
      translateTime: true,
      ignore: 'pid,hostname,reqId,responseTime,req,res',
    }
  }
});

// @ts-ignore
app.register(SwaggerPlugin, {
  exposeRoute: true,
  routePrefix: '/doc',
  mode: 'static',
  specification: {
    path: path.join(__dirname, '../doc/api.yaml'),
  },
  swagger: {
    info: { title: 'fastify-api' },
    description: 'testing the fastify swagger api',
  }
});

app.register(usersRoutes);
app.register(boardsRoutes);
app.register(tasksRoutes, { prefix: '/boards/:boardId' });

export default app;