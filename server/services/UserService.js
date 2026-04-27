const bcrypt = require('bcryptjs');

class UserService {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  async register(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.userRepo.create({ ...data, password: hashedPassword });
  }

  async login(email, password) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    return user;
  }
}

module.exports = UserService;