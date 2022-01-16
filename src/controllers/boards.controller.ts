import { FastifyReply, FastifyRequest } from 'fastify';
import { v4 as uuidv4 } from 'uuid';
import { deleteTasksOfBoard } from '../repositories/tasks.memory.repository';
import { addNewBoard, deleteBoardData, getAllBoards, updateBoardData } from '../repositories/boards.memory.repository';
import { IBoard } from '../types';


type CustomBoardsRequest = FastifyRequest<{
  Params: { 
    boardId: string,
  },
  Body: IBoard;
}>;

/**
 * Handles getting list of boards and using as reply of the request
 * @param request {@link CustomBoardsRequest} - request of query
 * @param reply {@link FastifyReply} - response of query
 * @returns Promise<void>
 */
export const getBoards = async (
  request: CustomBoardsRequest,
  reply: FastifyReply
): Promise<void> => {
  const boards: Array<IBoard> = getAllBoards();
  reply.send(boards);
};

/**
 * Handles getting the object of board and using as reply of the request
 * 
 * * @remarks
 * also handle error, e.g.if nothing was find
 * 
 * @param request {@link CustomBoardsRequest} - request of query
 * @param reply {@link FastifyReply} - response of query
 * @returns Promise<void>
 */
export const getBoard = async (
  request: CustomBoardsRequest,
  reply: FastifyReply
): Promise<void> => {
  const boards: Array<IBoard> = getAllBoards();
  const { boardId } = request.params;
  const currentBoard: Array<IBoard> = boards.filter((board: IBoard):boolean => (board.id === boardId));
  
  if (currentBoard?.length !== 0) {
    reply.send(currentBoard[0]);
  } else {
    reply.code(404).send({message: 'Not Found'});
  };
};

/**
 * Handles adding new board and using as reply of the request
 * @param request {@link CustomBoardsRequest} - request of query
 * @param reply {@link FastifyReply} - response of query
 * @returns Promise<void>
 */
export const addBoard = async (
  request: CustomBoardsRequest,
  reply: FastifyReply
): Promise<void> => {
  const { title, columns = [] } = request.body;
  const newBoard: IBoard = {
    id: uuidv4(),
    title,
    columns
  };
  
  addNewBoard(newBoard);
  reply.code(201).send(newBoard);
};

/**
 * Handles updating the object of board and using as reply of the request
 * @param request {@link CustomBoardsRequest} - request of query
 * @param reply {@link FastifyReply} - response of query
 * @returns Promise<void>
 */
export const updateBoard = async (
  request: CustomBoardsRequest,
  reply: FastifyReply
): Promise<void> => {
  const { boardId } = request.params;
  const newBoardData = request.body;

  const updatedBoard: IBoard = updateBoardData(boardId, newBoardData);

  reply.send(updatedBoard)
};

/**
 * Handles removing the object of board and repling of the request
 * 
 * * @remarks
 * also handle error, e.g.if nothing was find
 * 
 * @param request {@link CustomBoardsRequest} - request of query
 * @param reply {@link FastifyReply} - response of query
 * @returns Promise<void>
 */
export const deleteBoard = async (
  request: CustomBoardsRequest,
  reply: FastifyReply
): Promise<void> => {
  const { boardId } = request.params;
  const result: boolean = deleteBoardData(boardId);
  await deleteTasksOfBoard(boardId);

  if(result) {
    reply.send({message: 'Board has been removed'});
  } else {
    reply.code(404).send({message: 'Not Found'});
  };
};