import { FastifyReply, FastifyRequest } from 'fastify';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid'; 
import { addNewTask, deleteTaskData, getAllTasks, updateTaskData } from '../repositories/tasks.memory.repository';
import { ITask } from '../types';

type CustomTasksRequest = FastifyRequest<{
  Params: { 
    boardId: string,
    taskId: string
  },
  Body: ITask;
}>;

/**
 * Handles validating id
 * 
 * * @remarks
 * if id is invalid the function will throw an error
 * 
 * @param {Array<string>} ids - array of identifiers
 * @returns void
 */
export const validatedId = (ids: Array<string>): void => {
  ids.forEach((id: string): void =>{
    if (!uuidValidate(id)) {
      throw new Error('Not Found')
    };
  });
}

/**
 * Handles getting list of tasks and using as reply of the request
 * 
 * * @remarks
 * also handle error, e.g.if id is invalid
 * 
 * @param request {@link CustomTasksRequest} - request of query
 * @param reply {@link FastifyReply} - response of query
 * @returns Promise<void>
 */
export const getTasks = async (
  request: CustomTasksRequest,
  reply: FastifyReply
): Promise<void> => {
  try {
    const { boardId } = request.params;
    validatedId([boardId]);
    
    const tasks: Array<ITask> = getAllTasks();
    reply.send(tasks);
  } catch(err){
    reply.code(404).send({message: (err as Error).message});
  }
};

/**
 * Handles getting the object of task and using as reply of the request
 * 
 * * @remarks
 * also handle error, e.g.if id is invalid or nothing was find
 * 
 * @param request {@link CustomTasksRequest} - request of query
 * @param reply {@link FastifyReply} - response of query
 * @returns Promise<void>
 */
export const getTask = async (
  request: CustomTasksRequest,
  reply: FastifyReply
): Promise<void> => {
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

/**
 * Handles adding new task and using as reply of the request
 * 
 * * @remarks
 * also handle error, e.g.if id is invalid
 * 
 * @param request {@link CustomTasksRequest} - request of query
 * @param reply {@link FastifyReply} - response of query
 * @returns Promise<void>
 */
export const addTask = async (
  request: CustomTasksRequest,
  reply: FastifyReply
): Promise<void> => {
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

/**
 * Handles updating the object of task and using as reply of the request
 * 
 * * @remarks
 * also handle error, e.g.if id is invalid
 * 
 * @param request {@link CustomTasksRequest} - request of query
 * @param reply {@link FastifyReply} - response of query
 * @returns Promise<void>
 */
export const updateTask = async (
  request: CustomTasksRequest,
  reply: FastifyReply
): Promise<void> => {
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

/**
 * Handles removing the object of task and repling of the request
 * 
 * * @remarks
 * also handle error, e.g.if id is invalid or nothing was find
 * 
 * @param request {@link CustomTasksRequest} - request of query
 * @param reply {@link FastifyReply} - response of query
 * @returns Promise<void>
 */
export const deleteTask = async (
  request: CustomTasksRequest,
  reply: FastifyReply
): Promise<void> => {
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