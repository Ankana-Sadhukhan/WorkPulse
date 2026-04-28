const jwt = require('jsonwebtoken');

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  // register = async (req, res) => {
  //   try {
  //     const user = await this.userService.register(req.body);
  //     res.json(user);
  //   } catch (err) {
  //     res.status(500).json({ error: err.message });
  //   }
  // };

  register = async (req, res) => {
  try {
    const user = await this.userService.register(req.body);
    res.json(user);
  } catch (err) {
    console.log("FULL ERROR:", err); // 🔥 print in terminal

    res.status(500).json({
      error: err.message,
      details: err.errors   // 🔥 THIS IS THE KEY
    });
  }
};

  // login = async (req, res) => {
  //   try {
  //     const user = await this.userService.login(req.body.email, req.body.password);

  //     const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1d" });

  //     res.json({ token });
  //   } catch (err) {
  //     res.status(400).json({ error: err.message });
  //   }
  // };
  login = async (req, res) => {
  try {
    const user = await this.userService.login(
      req.body.email,
      req.body.password
    );

    const token = jwt.sign({ id: user.id }, "secret", {
      expiresIn: "1d",
    });

    // ✅ FIX: send id also
    res.json({
      token,
      id: user.id,
      role: user.role
    });

  } 
  
  // catch (err) {
  //   res.status(400).json({ error: err.message });
  //   console.log("FULL ERROR:", err); // 🔥 print in terminal
  // }

  catch (err) {
    console.log("LOGIN ERROR:", err.message); // 👈 IMPORTANT

    res.status(400).json({
      error: err.message
    });
  }






};

}

module.exports = UserController;