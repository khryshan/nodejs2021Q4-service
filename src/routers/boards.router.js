const { URLS } = require('../lib/constants');

const {
  GET_BOARDS,
  GET_BOARD,
  ADD_BOARD,
  UPDATE_BOARD,
  DELETE_BOARD
} = URLS;

const {
  addBoard,
  deleteBoard,
  getBoard,
  getBoards,
  updateBoard
} = require('../controllers/boards.controller');

const Column = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    order: { type: 'integer' },
  },
};

const Board = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    columns: { 
      type: 'array',
      items: Column,
     },
  },
};

const getBoardsOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Board,
      },
    },
  },
  handler: getBoards
};
const getBoardOpts = {
  schema: {
    response: {
      200: Board
    },
  },
  handler: getBoard
};

const postBoardOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['title'],
      properties: {
        title: { type: 'string' },
        columns: { 
          type: 'array',
          items: Column,
         },
      },
    },
    response: {
      201: Board
    },
  },
  handler: addBoard
};

const putBoardOpts = {
  schema: {
    response: {
      200: Board
    },
  },
  handler: updateBoard
}

const deleteBoardOpts = {
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
  handler: deleteBoard
}


function boardsRoutes(app, options, done) {
  app.get(GET_BOARDS, getBoardsOpts);
  app.get(GET_BOARD, getBoardOpts);
  app.post(ADD_BOARD, postBoardOpts)
  app.put(UPDATE_BOARD, putBoardOpts);
  app.delete(DELETE_BOARD, deleteBoardOpts);
  
  done();
};

module.exports = boardsRoutes;



