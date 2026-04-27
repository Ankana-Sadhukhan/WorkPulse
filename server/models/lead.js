const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Lead = sequelize.define('Lead', {
  name: DataTypes.STRING,
  status: DataTypes.STRING,
});

Lead.belongsTo(User);
User.hasMany(Lead);

module.exports = Lead;