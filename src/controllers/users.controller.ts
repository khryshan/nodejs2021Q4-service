import { FastifyReply, FastifyRequest } from 'fastify';
import { v4 as uuidv4 } from 'uuid';
import { updateTasks } from '../database/tasks.memory.repository';
import { addNewUser, getAllUsers, updateUserData, deleteUserData } from '../database/users.memory.repository';
import { IUser } from '../types';

type CustomUsersRequest = FastifyRequest<{
  Params: { 
    userId: string,
  },
  Body: IUser;
}>;

export const getUsers = async (request: CustomUsersRequest, reply: FastifyReply) => {
  const users: Array<IUser> = getAllUsers();
  reply.send(users);
};

export const getUser = async (request: CustomUsersRequest, reply: FastifyReply) => {
  const users: Array<IUser> = getAllUsers();
  const { userId } = request.params;
  const currentUser: Array<IUser> = users.filter((user: IUser):boolean => (user.id === userId));

  if (currentUser?.length !== 0) {
    reply.send(currentUser[0]);
  } else {
    reply.code(404).send({message: 'Not Found'});
  };
};

export const addUser = async (request: CustomUsersRequest, reply: FastifyReply) => {
  const { login, name, password } = request.body;
  const newUser: IUser = {
    id: uuidv4(),
    login,
    name,
    password
  };
  
  addNewUser(newUser);
  reply.code(201).send(newUser);
};

export const updateUser = async (request: CustomUsersRequest, reply: FastifyReply) => {
  const { userId } = request.params;
  const newUserData = request.body;

  const updatedUser: IUser = updateUserData(userId, newUserData);

  reply.send(updatedUser)
};

export const deleteUser = async (request: CustomUsersRequest, reply: FastifyReply) => {
  const { userId } = request.params;

  const result: boolean = deleteUserData(userId);
  await updateTasks((task) => {
    if(task.userId === userId) {
      return { ...task, userId: null };
    };
    return task;
  })

  if(result) {
    reply.send({message: 'User has been removed'});
  } else {
    reply.code(404).send({message: 'Not Found'});
  };
};
