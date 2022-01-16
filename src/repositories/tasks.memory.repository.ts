import { ITask, TCallback } from '../types';

let tasks: Array<ITask> = [
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

/**
 * Returns all tasks
 * @returns Array of all tasks (type {@link ITask}) or empty array
 */
export const getAllTasks = ():Array<ITask> => tasks;

/**
 * Saves a new task
 * 
 * * @remarks
 * push a new object of task to array of tasks
 * 
 * @param newTask {@link ITask} - data of the new task
 * @returns {void} does not return any value
 */
export const addNewTask = (newTask:ITask):void => {
  tasks = [...tasks, newTask];
};

/**
 * Updates a date of existing task
 * @param {string} id - identifier of a task
 * @param data {@link ITask} - new data of the task, which needs update
 * @returns object of the updated task (type {@link ITask})
 */
export const updateTaskData = (id:string, data:ITask):ITask => {
  let updatedTask:ITask = {};
  
  tasks = tasks.map((task:ITask):ITask => {
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

/**
 * Removes existing task
 * @param {string} id - identifier of a task
 * @returns boolean value (true or false), was removed object or not
 */
export const deleteTaskData = (id: string):boolean => {
  let result = false;
  tasks = tasks.filter((task:ITask):boolean => {
    if(task.id !== id) {
      return true;
    }
      result = true;
      return false;
  });

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
export const deleteTasksOfBoard = (boardId: string) => {
  tasks = tasks.filter((task:ITask):boolean => task.boardId !== boardId)
};

 /**
 * Update array of tasks
 * @param callback {@link TCallback<ITask>} - the callback that handles updating tasks into array
 * @returns {void} does not return any value
 */
export const updateTasks = (callback:TCallback<ITask>) => {
  tasks = tasks.map(callback)
};