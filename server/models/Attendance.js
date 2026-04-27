const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Attendance = sequelize.define('Attendance', {
  checkIn: DataTypes.DATE,
  checkOut: DataTypes.DATE,
  totalHours: DataTypes.FLOAT,
});

Attendance.belongsTo(User);
User.hasMany(Attendance);

module.exports = Attendance;