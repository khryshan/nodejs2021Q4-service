let boards = [
  {
    id: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
    title: 'Autotest board',
    columns: [
      { title: 'Backlog', order: 1 },
      { title: 'Sprint', order: 2 }
    ]
  },
];

const getAllBoards = () => boards;

const addNewBoard = (newBoard) => {
  boards = [...boards, newBoard];
};

const updateBoardData = (id, data) => {
  let updatedBoard = {};
  
  boards = boards.map(board => {
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

const deleteBoardData = (id) => {
  let result = false;
  boards = boards.filter(board => {
    if(board.id !== id) {
      return true;
    }
      result = true;
      return false;
  });

  return result;
}

module.exports = { 
  addNewBoard,
  getAllBoards,
  deleteBoardData,
  updateBoardData
};
