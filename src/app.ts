import fastify, { FastifyInstance } from 'fastify';
import swagger from 'fastify-swagger';
import path from 'path';

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

app.register(swagger, {
  exposeRoute: true,
  routePrefix: '/doc',
  mode: 'static',
  specification: {
    path: path.join(__dirname, '../doc/api.yaml'),
    baseDir: __dirname,
  }
});

app.register(usersRoutes);
app.register(boardsRoutes);
app.register(tasksRoutes, { prefix: '/boards/:boardId' });

export default app;