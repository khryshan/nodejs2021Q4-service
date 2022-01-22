export const URLS = {
  // login
  LOGIN: '/login',

  // users
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
  GET_TASKS: '/tasks',
  GET_TASK: '/tasks/:taskId',
  ADD_TASK: '/tasks',
  UPDATE_TASK: '/tasks/:taskId',
  DELETE_TASK: '/tasks/:taskId'
}

export const SALT_ROUNDS = 10;
export const SECRET_KEY_JWT = 'shhhhh';
