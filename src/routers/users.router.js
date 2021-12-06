const { URLS } = require('../lib/constants');

const {
  GET_USER,
  GET_USERS,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER
} = URLS;

const { 
  addUser,
  deleteUser,
  getUsers,
  getUser,
  updateUser
} = require('../controllers/users.controller');

const User = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    login: { type: 'string' },
    name: { type: 'string' },
  },
};

const getUsersOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: User,
      },
    },
  },
  handler: getUsers
};
const getUserOpts = {
  schema: {
    response: {
      200: User
    },
  },
  handler: getUser
};

const postUsersOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['name', 'login', 'password'],
      properties: {
        name: { type: 'string' },
        login: { type: 'string' },
        password: { type: 'string' },
      },
    },
    response: {
      201: User
    },
  },
  handler: addUser
};

const putUserOpts = {
  schema: {
    response: {
      200: User
    },
  },
  handler: updateUser
}

const deleteUserOpts = {
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
  handler: deleteUser
}


function usersRoutes(app, options, done) {
  app.get(GET_USERS, getUsersOpts);
  app.get(GET_USER, getUserOpts);
  app.post(ADD_USER, postUsersOpts)
  app.put(UPDATE_USER, putUserOpts);
  app.delete(DELETE_USER, deleteUserOpts);
  
  done();
};

module.exports = usersRoutes;



