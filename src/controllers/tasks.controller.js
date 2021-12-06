const { v4: uuidv4, validate: uuidValidate } = require('uuid'); 
const { addNewTask, deleteTaskData, getAllTasks, updateTaskData } = require('../database/tasks.memory.repository');

const validatedId = (ids) => {
  ids.forEach(id =>{
    if (!uuidValidate(id)) {
      throw new Error('Not Found')
    };
  });
}

const getTasks = (request, reply) => {
  try {
    const { boardId } = request.params;
    validatedId([boardId]);
    
    const tasks = getAllTasks();
    reply.send(tasks);
  } catch(err){
    reply.code(404).send({message: err.message});
  }
};

const getTask = (request, reply) => {
  try {
    const { boardId, taskId } = request.params;
    validatedId([boardId, taskId]);
    const tasks = getAllTasks();
    const currentTask = tasks.filter(task => (task.id === taskId));
    
    if (currentTask?.length !== 0) {
      reply.send(currentTask[0]);
    } else {
      reply.code(404).send({message: 'Not Found'});
    };
  } catch(err){
    reply.code(404).send({message: err.message});
  }
};

const addTask = (request, reply) => {
  try {
    const { boardId: boardURLId } = request.params;
    validatedId([boardURLId]);
    const { 
      title,
      order,
      description,
      userId = null,
      columnId = null
     } = request.body;

    const newTask = {
      id: uuidv4(),
      title,
      order,
      description,
      userId,
      boardId: boardURLId,
      columnId
    };
    
    addNewTask(newTask);
    reply.code(201).send(newTask);
  } catch (err) {
    reply.code(404).send({message: err.message});
  }
};

const updateTask = (request, reply) => {
  try {
    const { boardId, taskId } = request.params;
    validatedId([boardId, taskId]);
    const newTaskData = request.body;
    const updatedTask = updateTaskData(taskId, newTaskData);

    reply.send(updatedTask)
  } catch(err){
    reply.code(404).send({message: err.message});
  }
};

const deleteTask = (request, reply) => {
  try {
    const { boardId, taskId } = request.params;
    validatedId([boardId, taskId]);

    const result = deleteTaskData(taskId);
  
    if(result) {
      reply.send({message: 'Task has been removed'});
    } else {
      reply.code(404).send({message: 'Not Found'});
    };
  } catch(err) {
    reply.code(404).send({message: err.message});
  };
};


module.exports = {
  addTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask
}