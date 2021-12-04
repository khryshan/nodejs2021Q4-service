let users = [
  {
    id: 'df5fae3e-470f-4b93-994f-00d7390c3a9d',
    login: 'JW',
    name: 'John_Wick',
    password: '12345678900'
  }
];


const getAllUsers = () => users;

const addNewUser = (newUser) => {
  users = [...users, newUser];
};

const updateUserData = (id, data) => {
  let updatedUser = {};
  
  users = users.map(user => {
    if (user.id === id) {
      updatedUser = {
        ...user,
        ...data
      };
      return updatedUser
    }

    return user;
  });

  return updatedUser;
};

const deleteUserData = (id) => {
  let result = false;
  users = users.filter(user => {
    if(user.id !== id) {
      return true;
    }
      result = true;
      return false;
  });

  return result;
}

module.exports = { 
  addNewUser, 
  deleteUserData,
  getAllUsers, 
  updateUserData 
};
