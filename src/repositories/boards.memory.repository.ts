import { IBoard } from '../types';

let boards:Array<IBoard> = [
  {
    id: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
    title: 'Autotest board',
    columns: [
      { title: 'Backlog', order: 1 },
      { title: 'Sprint', order: 2 }
    ]
  },
];

/**
 * Returns all boards
 * @returns Array of all boards (type {@link IBoard}) or empty array
 */
export const getAllBoards = ():Array<IBoard> => boards;

/**
 * Saves a new board
 * 
 * * @remarks
 * push a new object of board to array of boards
 * 
 * @param newBoard {@link IBoard} - data of the new board
 * @returns {void} does not return any value
 */
export const addNewBoard = (newBoard:IBoard):void => {
  boards = [...boards, newBoard];
};

/**
 * Updates a date of existing board
 * @param {string} id - identifier of a board
 * @param data {@link IBoard} - new data of the board, which needs update
 * @returns object of the updated board (type {@link IBoard})
 */
export const updateBoardData = (id:string, data:IBoard):IBoard => {
  let updatedBoard:IBoard = {};
  
  boards = boards.map((board:IBoard):IBoard => {
    if (board.id === id) {
      updatedBoard = {
        ...board,
        ...data
      };
      return updatedBoard
    }

    return board;
  });

  return updatedBoard;
};

/**
 * Removes existing board
 * @param {string} id - identifier of a board
 * @returns boolean value (true or false), was removed object or not
 */
export const deleteBoardData = (id: string):boolean => {
  let result = false;
  boards = boards.filter((board:IBoard):boolean => {
    if(board.id !== id) {
      return true;
    }
      result = true;
      return false;
  });

  return result;
};