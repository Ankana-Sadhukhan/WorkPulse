class UserRepository {
  constructor(UserModel) {
    this.User = UserModel;
  }

  async create(data) {
    return this.User.create(data);
  }

  async findByEmail(email) {
    return this.User.findOne({ where: { email } });
  }
}

module.exports = UserRepository;