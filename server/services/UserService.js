// const bcrypt = require('bcryptjs');

// class UserService {
//   constructor(userRepo) {
//     this.userRepo = userRepo;
//   }

//   async register(data) {
//     const hashedPassword = await bcrypt.hash(data.password, 10);
//     return this.userRepo.create({ ...data, password: hashedPassword });
//   }
//   async register(data) {
//   // 🔐 ADMIN CHECK
//   if (data.role === "admin") {
//     if (data.adminKey !== "ADMIN123") {  // 👈 your secret
//       throw new Error("Invalid Admin Secret Key");
//     }
//   }

//   return this.userRepo.create(data);
// }


//   async login(email, password) {
//     const user = await this.userRepo.findByEmail(email);
//     if (!user) throw new Error("User not found");

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) throw new Error("Invalid credentials");

//     return user;
//   }
// }

// module.exports = UserService;


const bcrypt = require('bcryptjs');

class UserService {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  async register(data) {
    // 🔐 ADMIN CHECK
    if (data.role === "admin") {
      if (data.adminKey !== "ADMIN123") {
        throw new Error("Invalid Admin Secret Key");
      }
    }

    // 🔐 HASH PASSWORD (VERY IMPORTANT)
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.userRepo.create({
      ...data,
      password: hashedPassword
    });
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