import { IUser } from '../types';

let users: Array<IUser> = [
  {
    id: 'c106a26a-21bb-5538-8bf2-57095d1976c1',
    login: 'JW',
    name: 'John_Wick',
    password: '12345678900'
  }
];

/**
 * Returns all users
 * @returns Array of all users (type {@link IUser}) or empty array
 */
export const getAllUsers = ():Array<IUser> => users;

/**
 * Saves a new user
 * 
 * * @remarks
 * push a new object of user to array of users
 * 
 * @param newUser {@link IUser} - data of the new user
 * @returns {void} does not return any value
 */
export const addNewUser = (newUser: IUser): void => {
  users = [...users, newUser];
};

/**
 * Updates a date of existing user
 * @param {string} id - identifier of a user
 * @param data {@link IUser} - new data of the user, which needs update
 * @returns object of the updated user (type {@link IUser})
 */
export const updateUserData = (id: string, data: IUser): IUser => {
  let updatedUser: IUser = {};
  
  users = users.map((user: IUser): IUser => {
    if (user.id === id) {
      updatedUser = {
        ...user,
        ...data
      };
      return updatedUser
    };

    return user;
  });

  return updatedUser;
};

/**
 * Removes existing user
 * @param {string} id - identifier of a user
 * @returns boolean value (true or false), was removed object or not
 */
export const deleteUserData = (id: string): boolean => {
  let result = false;
  users = users.filter((user: IUser):boolean => {
    if(user.id !== id) {
      return true;
    }
      result = true;
      return false;
  });

  return result;
};
