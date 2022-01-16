import { getRepository } from 'typeorm';
import { Board } from '../db/entities/Boards';
import { IBoard } from '../types';

/**
 * Returns all boards
 * @returns All boards (type Promise<Array<IBoard>> {@link IBoard})
 */
export const getAllBoards = async ():Promise<Array<IBoard>> => {
  const repository = getRepository(Board);
  const allBoards = await repository.find();
  return allBoards;
};

/**
 * Returns board
 * @returns Board (type Promise<IBoard | undefined> {@link IBoard})
 */
 export const getBoardById = async (id: string):Promise<IBoard | undefined> => {
  const repository = getRepository(Board);
  const currentBoard = await repository.findOne(id);
  return currentBoard;
};

/**
 * Saves a new board
 * 
 * * @remarks
 * push a new object of board to array of boards
 * 
 * @param newBoard {@link IBoard} - data of the new board
 * @returns Promise<void>
 */
export const addNewBoard = async (newBoard: IBoard): Promise<void> => {
  const repository = getRepository(Board);
  const newBoardDB = repository.create(newBoard);
  await repository.save(newBoardDB);
};

/**
 * Updates a date of existing board
 * @param {string} id - identifier of a board
 * @param data {@link IBoard} - new data of the board, which needs update
 * @returns Board (type Promise<IBoard | undefined> {@link IBoard})
 */
export const updateBoardData = async (
  id:string,
  data:IBoard
):Promise<IBoard | undefined> => {
  const repository = getRepository(Board);
  const currentBoard = await repository.findOne(id);

  if (currentBoard) {
    await repository.update(id, {...currentBoard, ...data});
  }
  const updatedBoard = await repository.findOne(id)
  return updatedBoard;
};

/**
 * Removes existing board
 * @param {string} id - identifier of a board
 * @returns boolean value (true or false), was removed object or not
 */
export const deleteBoardData = async (id: string):Promise<boolean> => {
  let result = false;
  const repository = getRepository(Board);
  const currentBoard = await repository.findOne(id);

  if (currentBoard) {
    await repository.delete(id);
    result = true
  }

  return result;
};