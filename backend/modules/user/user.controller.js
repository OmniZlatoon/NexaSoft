const userService = require('./user.service');

exports.getUsers = async (req, res) => {
  const users = await userService.getUsers();
  res.status(200).json(users);
};
