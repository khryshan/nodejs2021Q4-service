import { ITask } from '../types';

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


export const getAllTasks = ():Array<ITask> => tasks;

export const addNewTask = (newTask:ITask):void => {
  tasks = [...tasks, newTask];
};


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

export const deleteTasksOfBoard = (boardId: string) => {
  tasks = tasks.filter((task:ITask):boolean => task.boardId !== boardId)
};
// @ts-ignore
export const updateTasks = (callback) => {
  tasks = tasks.map(callback)
};