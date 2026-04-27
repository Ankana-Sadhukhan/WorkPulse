const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('crm_db', 'root', 'ankana2006', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;