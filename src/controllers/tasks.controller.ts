import { FastifyReply, FastifyRequest } from 'fastify';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid'; 
import { addNewTask, deleteTaskData, getAllTasks, updateTaskData } from '../database/tasks.memory.repository';
import { ITask } from '../types';

type CustomTasksRequest = FastifyRequest<{
  Params: { 
    boardId: string,
    taskId: string
  },
  Body: ITask;
}>;

export const validatedId = (ids: Array<string>) => {
  ids.forEach((id: string): void =>{
    if (!uuidValidate(id)) {
      throw new Error('Not Found')
    };
  });
}

export const getTasks = (request: CustomTasksRequest, reply: FastifyReply) => {
  try {
    const { boardId } = request.params;
    validatedId([boardId]);
    
    const tasks: Array<ITask> = getAllTasks();
    reply.send(tasks);
  } catch(err){
    reply.code(404).send({message: (err as Error).message});
  }
};

export const getTask = (request: CustomTasksRequest, reply: FastifyReply) => {
  try {
    const { boardId, taskId } = request.params;
    validatedId([boardId, taskId]);
    const tasks: Array<ITask> = getAllTasks();
    const currentTask: Array<ITask> = tasks.filter((task:ITask):boolean => (task.id === taskId));
    
    if (currentTask?.length !== 0) {
      reply.send(currentTask[0]);
    } else {
      reply.code(404).send({message: 'Not Found'});
    };
  } catch(err){
    reply.code(404).send({message: (err as Error).message});
  }
};

export const addTask = (request: CustomTasksRequest, reply: FastifyReply) => {
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

    const newTask: ITask = {
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
    reply.code(404).send({message: (err as Error).message});
  }
};

export const updateTask = (request: CustomTasksRequest, reply: FastifyReply) => {
  try {
    const { boardId, taskId } = request.params;
    validatedId([boardId, taskId]);
    const newTaskData = request.body;
    const updatedTask: ITask = updateTaskData(taskId, newTaskData);

    reply.send(updatedTask)
  } catch(err){
    reply.code(404).send({message: (err as Error).message});
  }
};

export const deleteTask = (request: CustomTasksRequest, reply: FastifyReply) => {
  try {
    const { boardId, taskId } = request.params;
    validatedId([boardId, taskId]);

    const result: boolean = deleteTaskData(taskId);
  
    if(result) {
      reply.send({message: 'Task has been removed'});
    } else {
      reply.code(404).send({message: 'Not Found'});
    };
  } catch(err) {
    reply.code(404).send({message: (err as Error).message});
  };
};