const express = require('express');
const router = express.Router();

module.exports = (userController) => {
  router.post('/register', userController.register);
  router.post('/login', userController.login);
  return router;
};