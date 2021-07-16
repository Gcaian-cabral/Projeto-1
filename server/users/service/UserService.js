const User = require('../model/User');
const bcrypt = require('bcrypt');

class UserService {
  async createUser(user) {
    try {
      const saltRounds = 10;

      user.password = await bcrypt.hash(user.password, saltRounds);

      await User.create(user);
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers() {
    return await User.findAll({raw: true});
  }

  async getUserById(id) {
    return await User.findByPk(id, {raw: true});
  }

  async updateUser(id, body) {
    await User.update(body, {where: {id: id}});
  }

  async deleteUser(id) {
    await User.destroy({where: {id: id}});
  }
}

module.exports = new UserService;
