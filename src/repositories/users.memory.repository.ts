import { getRepository } from 'typeorm';
import { User } from '../db/entities/User';
import { IUser } from '../types';


/**
 * Returns all users
 * @returns All users (type Promise<Array<IUser>> {@link IUser})
 */
export const getAllUsers = async ():Promise<Array<IUser>> => {
  const repository = getRepository(User);
  const allUsers = await repository.find();
  return allUsers;
};

/**
 * Returns user
 * @returns User (type Promise<IUser | undefined> {@link IUser})
 */
export const getUserById = async (id: string):Promise<IUser | undefined> => {
  const repository = getRepository(User);
  const currentUser = await repository.findOne(id);
  return currentUser;
};

/**
 * Saves a new user
 * 
 * * @remarks
 * save a new user to database
 * 
 * @param newUser {@link IUser} - data of the new user
 * @returns Promise<void>
 */
export const addNewUser = async (newUser: IUser): Promise<void> => {
  const repository = getRepository(User);
  const newUserDB = repository.create(newUser);
  await repository.save(newUserDB);
};

/**
 * Updates a date of existing user
 * @param {string} id - identifier of a user
 * @param data {@link IUser} - new data of the user, which needs update
 * @returns Updated user (type Promise<IUser | undefined> {@link IUser})
 */
export const updateUserData = async (
  id: string,
  data: IUser
): Promise<IUser | undefined> => {
  const repository = getRepository(User);
  const currentUser = await repository.findOne(id);

  if (currentUser) {
    await repository.update(id, {...currentUser, ...data});
  }
  const updatedUser = await repository.findOne(id)
  return updatedUser;
};

/**
 * Removes existing user
 * @param {string} id - identifier of a user
 * @returns boolean value (true or false), was removed object or not
 */
export const deleteUserData = async (id: string): Promise<boolean> => {
  let result = false;
  const repository = getRepository(User);
  const currentUser = await repository.findOne(id);

  if (currentUser) {
    await repository.delete(id);
    result = true
  }

  return result;
};

/**
 * Look for user into DB
 * @param {string} login - login of a user
 * @returns User (type Promise<IUser | undefined> {@link IUser})
 */
 export const findUserData = async (login: string): Promise<IUser | undefined> => {
 
  const repository = getRepository(User);
  const currentUser = await repository.findOne({ login });

  return currentUser;
};

