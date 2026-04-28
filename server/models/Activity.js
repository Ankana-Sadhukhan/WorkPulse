const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Activity = sequelize.define('Activity', {
  lastActive: DataTypes.DATE,
  status: DataTypes.STRING, // online / idle / offline
  
});

Activity.belongsTo(User);
User.hasOne(Activity);

module.exports = Activity;