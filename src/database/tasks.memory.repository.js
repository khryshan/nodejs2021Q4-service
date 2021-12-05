let tasks = [
  {
    id: '630eb68f-e0fa-5ecc-887a-7c7a62614681',
    title: 'Autotest task',
    order: 1,
    description: 'Lorem ipsum',
    userId: 'c106a26a-21bb-5538-8bf2-57095d1976c1',
    boardId: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
    columnId: null,
  },
];


const getAllTasks = () => tasks;

const addNewTask = (newTask) => {
  tasks = [...tasks, newTask];
};


const updateTaskData = (id, data) => {
  let updatedTask = {};
  
  tasks = tasks.map(task => {
    if (task.id === id) {
      updatedTask = {
        ...task,
        ...data
      };
      return updatedTask
    }

    return task;
  });

  return updatedTask;
};

const deleteTaskData = (id) => {
  let result = false;
  tasks = tasks.filter(task => {
    if(task.id !== id) {
      return true;
    }
      result = true;
      return false;
  });

  return result;
};

const deleteTasksOfBoard = (boardId) => {
  tasks = tasks.filter(task => task.boardId !== boardId)
};

const updateTasks = (callback) => {
  tasks = tasks.map(callback)
}


module.exports = {
  addNewTask,
  deleteTasksOfBoard,
  deleteTaskData,
  getAllTasks,
  updateTaskData,
  updateTasks,
};