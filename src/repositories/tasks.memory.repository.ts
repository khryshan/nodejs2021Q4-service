import { getRepository } from 'typeorm';
import { Task } from '../db/entities/Tasks';
import { ITask } from '../types';

/**
 * Returns all tasks
 * @returns All tasks (type Promise<Array<ITask>> {@link ITask}) 
 */
export const getAllTasks = async (id: string):Promise<Array<ITask>> => {
  const repository = getRepository(Task);
  const allTasks = await repository.find({ where: { boardId: id } });
  return allTasks;
};

/**
 * Returns task
 * @returns Task (type Promise<ITask | undefined> {@link ITask})
 */
 export const getTaskById = async (id: string):Promise<ITask | undefined> => {
  const repository = getRepository(Task);
  const currentTask = await repository.findOne(id);
  return currentTask;
};

/**
 * Saves a new task
 * 
 * * @remarks
 * push a new object of task to array of tasks
 * 
 * @param newTask {@link ITask} - data of the new task
 * @returns Promise<void>
 */
export const addNewTask = async (newTask:ITask): Promise<void> => {
  const repository = getRepository(Task);
  const newTaskDB = repository.create(newTask);
  await repository.save(newTaskDB);
};

/**
 * Updates a date of existing task
 * @param {string} id - identifier of a task
 * @param data {@link ITask} - new data of the task, which needs update
 * @returns Updated user (type Promise<ITask | undefined> {@link ITask}
 */
export const updateTaskData = async (id:string, data:ITask):Promise<ITask | undefined> => {
  const repository = getRepository(Task);
  const currentTask = await repository.findOne(id);

  if (currentTask) {
    await repository.update(id, {...currentTask, ...data});
  }
  const updatedTask = await repository.findOne(id)
  return updatedTask;
};

/**
 * Removes existing task
 * @param {string} id - identifier of a task
 * @returns boolean value (true or false), was removed object or not
 */
export const deleteTaskData = async (id: string):Promise<boolean> => {
  let result = false;
  const repository = getRepository(Task);
  const currentTask = await repository.findOne(id);

  if (currentTask) {
    await repository.delete(id);
    result = true
  }

  return result;
};

/**
 * Removes existing task
 * 
 * * @remarks
 * removes a task which has relate to removing board
 * if removes board which uses current task it means 
 * that we need to remove all related tasks
 * 
 * @param {string} id - identifier of a board
 * @returns {void} does not return any value
 */
export const deleteTasksOfBoard = async (id: string): Promise<void> => {
  const repository = getRepository(Task);
  await repository.delete({ boardId: id });
};

 /**
 * Set userId equel null after delete user
 * @param {string} id - identifier of a user
 * Promise<void>
 */
export const setDefaultUserId = async (id:string):Promise<void> => {
  const repository = getRepository(Task);
  await repository.update({userId: id}, {userId: null});
};
