import 'reflect-metadata';
import fastify, { FastifyInstance } from 'fastify';
import swagger from 'fastify-swagger';
import path from 'path';

import { checkAuthToken } from './common/checkAuthToken';
import { logger, parserReqBody, parserResError } from './common/logger';
import { handleAllErrors, handleFatalError } from './lib/helpers/error';
import pluginConnectionDB from './db/pluginConnectionDB';

import authRoutes from './routers/auth.router';
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

// HELPER: If an error occurs, the container should restart automatically
// setTimeout(()=>{ throw new Error('oops!')}, 2000);

process.on('uncaughtException', handleFatalError);
process.on('unhandledRejection', handleFatalError);

app.addHook('preHandler', (request, reply, done) => {
  parserReqBody(request);
  checkAuthToken(request, reply);
  done();
});

app.addHook('onResponse', parserResError);

app.register(pluginConnectionDB);

app.register(authRoutes);

app.register(usersRoutes);
app.register(boardsRoutes);
app.register(tasksRoutes, { prefix: '/boards/:boardId' });

app.setErrorHandler(handleAllErrors);

export default app;