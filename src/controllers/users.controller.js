const { v4: uuidv4 } = require('uuid'); 
const { updateTasks } = require('../database/tasks.memory.repository')
const { addNewUser, getAllUsers, updateUserData, deleteUserData } = require('../database/users.memory.repository');


const getUsers = (request, reply) => {
  const users = getAllUsers();
  reply.send(users);
};

const getUser = (request, reply) => {
  const users = getAllUsers();
  const { userId } = request.params;
  const currentUser = users.filter(user => (user.id === userId));

  if (currentUser?.length !== 0) {
    reply.send(currentUser[0]);
  } else {
    reply.code(404).send({message: 'Not Found'});
  };
};

const addUser = (request, reply) => {
  const { login, name, password } = request.body;
  const newUser = {
    id: uuidv4(),
    login,
    name,
    password
  };
  
  addNewUser(newUser);
  reply.code(201).send(newUser);
};

const updateUser = (request, reply) => {
  const { userId } = request.params;
  const newUserData = request.body;

  const updatedUser = updateUserData(userId, newUserData);

  reply.send(updatedUser)
};

const deleteUser = async (request, reply) => {
  const { userId } = request.params;

  const result = deleteUserData(userId);
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

module.exports = {
  addUser,
  deleteUser,
  getUsers,
  getUser,
  updateUser
}