const { v4: uuidv4 } = require('uuid');
const { deleteTasksOfBoard } =require('../database/tasks.memory.repository')
const { addNewBoard, deleteBoardData, getAllBoards, updateBoardData } = require('../database/boards.memory.repository');

const getBoards = (request, reply) => {
  const boards = getAllBoards();
  reply.send(boards);
};

const getBoard = (request, reply) => {
  const boards = getAllBoards();
  const { boardId } = request.params;
  const currentBoard = boards.filter(board => (board.id === boardId));
  
  if (currentBoard?.length !== 0) {
    reply.send(currentBoard[0]);
  } else {
    reply.code(404).send({message: 'Not Found'});
  };
};

const addBoard = (request, reply) => {
  const { title, columns = [] } = request.body;
  const newBoard = {
    id: uuidv4(),
    title,
    columns
  };
  
  addNewBoard(newBoard);
  reply.code(201).send(newBoard);
};

const updateBoard = (request, reply) => {
  const { boardId } = request.params;
  const newBoardData = request.body;

  const updatedBoard = updateBoardData(boardId, newBoardData);

  reply.send(updatedBoard)
};

const deleteBoard = async (request, reply) => {
  const { boardId } = request.params;
  const result = deleteBoardData(boardId);
  await deleteTasksOfBoard(boardId);

  if(result) {
    reply.send({message: 'Board has been removed'});
  } else {
    reply.code(404).send({message: 'Not Found'});
  };
};

module.exports = {
  addBoard,
  deleteBoard,
  getBoard,
  getBoards,
  updateBoard
}