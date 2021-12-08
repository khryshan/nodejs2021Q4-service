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

export const getAllBoards = ():Array<IBoard> => boards;

export const addNewBoard = (newBoard:IBoard):void => {
  boards = [...boards, newBoard];
};

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