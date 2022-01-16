import { FastifyReply, FastifyRequest } from 'fastify';
import { v4 as uuidv4 } from 'uuid';
import { updateTasks } from '../repositories/tasks.memory.repository';
import { addNewUser, getAllUsers, getUserById, updateUserData, deleteUserData } from '../repositories/users.memory.repository';
import { IUser } from '../types';

type CustomUsersRequest = FastifyRequest<{
  Params: { 
    userId: string,
  },
  Body: IUser;
}>;

/**
 * Handles getting list of users and using as reply of the request
 * @param request {@link CustomUsersRequest} - request of query
 * @param reply {@link FastifyReply} - response of query
 * @returns Promise<void>
 */
export const getUsers = async (
  request: CustomUsersRequest,
  reply: FastifyReply
): Promise<void> => {
  const users = await getAllUsers();
  reply.send(users);
};

/**
 * Handles getting the object of user and using as reply of the request
 * 
 * * @remarks
 * also handle error, e.g.if nothing was find
 * 
 * @param request {@link CustomUsersRequest} - request of query
 * @param reply {@link FastifyReply} - response of query
 * @returns Promise<void>
 */
export const getUser = async (
  request: CustomUsersRequest,
  reply: FastifyReply
): Promise<void> => {
  const { userId } = request.params;
  const currentUser = await getUserById(userId);

  if (currentUser) {
    reply.send(currentUser);
  } else {
    reply.code(404).send({message: 'Not Found'});
  };
};

/**
 * Handles adding new user and using as reply of the request
 * @param request {@link CustomUsersRequest} - request of query
 * @param reply {@link FastifyReply} - response of query
 * @returns Promise<void>
 */
export const addUser = async (
  request: CustomUsersRequest,
  reply: FastifyReply
): Promise<void> => {
  const { login, name, password } = request.body;
  const newUser: IUser = {
    id: uuidv4(),
    login,
    name,
    password
  };
  
  await addNewUser(newUser);
  reply.code(201).send(newUser);
};

/**
 * Handles updating the object of user and using as reply of the request
 * @param request {@link CustomUsersRequest} - request of query
 * @param reply {@link FastifyReply} - response of query
 * @returns Promise<void>
 */
export const updateUser = async (
  request: CustomUsersRequest,
  reply: FastifyReply
): Promise<void> => {
  const { userId } = request.params;
  const newUserData = request.body;

  const updatedUser = await updateUserData(userId, newUserData);
  reply.send(updatedUser)
};

/**
 * Handles removing the object of user and repling of the request
 * 
 * * @remarks
 * also handle error, e.g.if nothing was find
 * 
 * @param request {@link CustomUsersRequest} - request of query
 * @param reply {@link FastifyReply} - response of query
 * @returns Promise<void>
 */
export const deleteUser = async (
  request: CustomUsersRequest,
  reply: FastifyReply
): Promise<void> => {
  const { userId } = request.params;

  const result = await deleteUserData(userId);
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
