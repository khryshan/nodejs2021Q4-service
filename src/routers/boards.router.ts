import { FastifyInstance, FastifyPluginAsync } from 'fastify';

import { URLS } from '../lib/constants';
import {
  addBoard,
  deleteBoard,
  getBoard,
  getBoards,
  updateBoard
} from '../controllers/boards.controller';


const {
  GET_BOARDS,
  GET_BOARD,
  ADD_BOARD,
  UPDATE_BOARD,
  DELETE_BOARD
} = URLS;

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

/**
 * Declare a routes of boards
 * 
 * * @remarks
 * This function handle some endpoints of boards, which to help get board or 
 * all boards, add new board, update board and delete board
 * 
 * @param app {@link FastifyInstance } - instance of framework (fastify)
 * @returns Promise<void>
 */
const boardsRoutes: FastifyPluginAsync = async (
  app: FastifyInstance,
): Promise<void> => {
  app.get(GET_BOARDS, getBoardsOpts);
  app.get(GET_BOARD, getBoardOpts);
  app.post(ADD_BOARD, postBoardOpts)
  app.put(UPDATE_BOARD, putBoardOpts);
  app.delete(DELETE_BOARD, deleteBoardOpts);
};

export default boardsRoutes;



