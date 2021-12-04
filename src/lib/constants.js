const URLS = {
  // /users
  GET_USERS: '/users',
  GET_USER: '/users/:userId',
  ADD_USER: '/users',
  UPDATE_USER: '/users/:userId',
  DELETE_USER: '/users/:userId',

  // boards
  GET_BOARDS: '/boards',
  GET_BOARD: '/boards/:boardId',
  ADD_BOARD: '/boards',
  UPDATE_BOARD: '/boards/:boardId',
  DELETE_BOARD: '/boards/:boardId',

  // tasks
  GET_TASKS: '/boards/:boardId/tasks',
  GET_TASK: '/boards/:boardId/tasks/:taskId',
  ADD_TASK: '/boards/:boardId/tasks',
  UPDATE_TASK: '/boards/:boardId/tasks/:taskId',
  DELETE_TASK: '/boards/:boardId/tasks/:taskId'
}

module.exports = { URLS }