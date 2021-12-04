let boards = [
  {
    id: 'df5fae3e-470f-4b93-000f-00d7390c3a9d',
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
