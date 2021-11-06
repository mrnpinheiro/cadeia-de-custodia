const UserModel = require('../models/User');

class UserRepository {
  constructor() {}

  async findOne(options) {
    return await UserModel.findOne(options);
  }
}

module.exports = UserRepository;
