import { IUser } from '../types';

let users: Array<IUser> = [
  {
    id: 'c106a26a-21bb-5538-8bf2-57095d1976c1',
    login: 'JW',
    name: 'John_Wick',
    password: '12345678900'
  }
];


export const getAllUsers = ():Array<IUser> => users;

export const addNewUser = (newUser: IUser): void => {
  users = [...users, newUser];
};

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
