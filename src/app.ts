import fastify, { FastifyInstance } from 'fastify';
import swagger from 'fastify-swagger';
import path from 'path';

import { logger, parserReqBody, parserResError } from './common/logger';
import { handleAllErrors, handleFatalError } from './lib/helpers/error';

import usersRoutes from './routers/users.router';
import boardsRoutes from './routers/boards.router';
import tasksRoutes from './routers/tasks.router';

const app: FastifyInstance = fastify({logger});

app.register(swagger, {
  exposeRoute: true,
  routePrefix: '/doc',
  mode: 'static',
  specification: {
    path: path.join(__dirname, '../doc/api.yaml'),
    baseDir: __dirname,
  }
});

process.on('uncaughtException', handleFatalError);
process.on('unhandledRejection', handleFatalError);

app.addHook('preHandler', parserReqBody);
app.addHook('onResponse', parserResError);

app.register(usersRoutes);
app.register(boardsRoutes);
app.register(tasksRoutes, { prefix: '/boards/:boardId' });

app.setErrorHandler(handleAllErrors);

export default app;