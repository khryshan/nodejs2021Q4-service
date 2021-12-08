import { FastifyReply, FastifyRequest } from 'fastify';
import { v4 as uuidv4 } from 'uuid';
import { deleteTasksOfBoard } from '../database/tasks.memory.repository';
import { addNewBoard, deleteBoardData, getAllBoards, updateBoardData } from '../database/boards.memory.repository';
import { IBoard } from '../types';


type CustomBoardsRequest = FastifyRequest<{
  Params: { 
    boardId: string,
  },
  Body: IBoard;
}>;

export const getBoards = async (request: CustomBoardsRequest, reply: FastifyReply) => {
  const boards: Array<IBoard> = getAllBoards();
  reply.send(boards);
};

export const getBoard = async (request: CustomBoardsRequest, reply: FastifyReply) => {
  const boards: Array<IBoard> = getAllBoards();
  const { boardId } = request.params;
  const currentBoard: Array<IBoard> = boards.filter((board: IBoard):boolean => (board.id === boardId));
  
  if (currentBoard?.length !== 0) {
    reply.send(currentBoard[0]);
  } else {
    reply.code(404).send({message: 'Not Found'});
  };
};

export const addBoard = async (request: CustomBoardsRequest, reply: FastifyReply) => {
  const { title, columns = [] } = request.body;
  const newBoard: IBoard = {
    id: uuidv4(),
    title,
    columns
  };
  
  addNewBoard(newBoard);
  reply.code(201).send(newBoard);
};

export const updateBoard = async (request: CustomBoardsRequest, reply: FastifyReply) => {
  const { boardId } = request.params;
  const newBoardData = request.body;

  const updatedBoard: IBoard = updateBoardData(boardId, newBoardData);

  reply.send(updatedBoard)
};

export const deleteBoard = async (request: CustomBoardsRequest, reply: FastifyReply) => {
  const { boardId } = request.params;
  const result: boolean = deleteBoardData(boardId);
  await deleteTasksOfBoard(boardId);

  if(result) {
    reply.send({message: 'Board has been removed'});
  } else {
    reply.code(404).send({message: 'Not Found'});
  };
};