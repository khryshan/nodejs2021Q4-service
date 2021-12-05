const { URLS } = require('../lib/constants');

const {
  GET_TASKS,
  GET_TASK,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK
} = URLS;

const {
  addTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask
} = require('../controllers/tasks.controller');


const Task = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    order: { type: 'integer' },
    description: { type: 'string' },
    userId: { type: 'string', nullable: true },
    boardId: { type: 'string', nullable: true },
    columnId: { type: 'string', nullable: true },
  },
};

const getTasksOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Task,
      },
    },
  },
  handler: getTasks
};

const getTaskOpts = {
  schema: {
    response: {
      200:  Task,
    },
  },
  handler: getTask
};

const postTasksOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['title', 'order', 'description'],
      properties: {
        title: { type: 'string' },
        order: { type: 'integer' },
        description: { type: 'string' },
        userId: { type: 'string', nullable: true },
        boardId: { type: 'string', nullable: true },
        columnId: { type: 'string', nullable: true },
      },
    },
    response: {
      201: Task
    },
  },
  handler: addTask
};

const putTaskOpts = {
  schema: {
    response: {
      200: Task
    },
  },
  handler: updateTask
}

const deleteTaskOpts = {
  schema: {
    response: {
      204: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
  handler: deleteTask
}

function boardsRoutes(app, options, done) {
  app.get(GET_TASKS, getTasksOpts);
  app.get(GET_TASK, getTaskOpts);
  app.post(ADD_TASK, postTasksOpts)
  app.put(UPDATE_TASK, putTaskOpts);
  app.delete(DELETE_TASK, deleteTaskOpts);
  
  done();
};

module.exports = boardsRoutes;
