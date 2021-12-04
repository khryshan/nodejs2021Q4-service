const fastify = require('fastify')({
  logger: {
    prettyPrint: {
      translateTime: true,
      ignore: 'pid,hostname,reqId,responseTime,req,res',
    }
  }
});
const usersRoutes = require('./routers/users.router');
const boardsRoutes = require('./routers/boards.router');
const tasksRoutes = require('./routers/tasks.router');

// const path = require('path');

const app = fastify;

app.register(require('fastify-swagger'), {
  exposeRoute: true,
  // routePrefix: '/docs',
  // mode: 'static',
  // specification: {
  //   path: path.join(__dirname, '../docs/api.yaml'),
  // },
  swagger: {
    info: { title: 'fastify-api' },
    description: 'testing the fastify swagger api',
  }
});

app.register(usersRoutes);
app.register(boardsRoutes);
app.register(tasksRoutes);

module.exports = app;
