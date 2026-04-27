const jwt = require('jsonwebtoken');

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  register = async (req, res) => {
    try {
      const user = await this.userService.register(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  login = async (req, res) => {
    try {
      const user = await this.userService.login(req.body.email, req.body.password);

      const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1d" });

      res.json({ token });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
}

module.exports = UserController;