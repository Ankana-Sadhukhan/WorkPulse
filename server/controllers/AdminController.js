// const AdminService = require('../services/AdminService');

// class AdminController {
//   constructor() {
//     this.service = new AdminService();
//   }

//   getAllUsers = async (req, res) => {
//     try {
//       const users = await this.service.getAllUsers();
//       res.json(users);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   };

//   getUserAttendance = async (req, res) => {
//     try {
//       const { userId } = req.params;
//       const attendance = await this.service.getUserAttendance(userId);
//       res.json(attendance);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   };

//   getAllAttendance = async (req, res) => {
//     try {
//       const attendance = await this.service.getAllAttendance();
//       res.json(attendance);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   };

//   getWorkingSummary = async (req, res) => {
//     try {
//       const summary = await this.service.getWorkingSummary();
//       res.json(summary);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   };
// }

// module.exports = AdminController;

const { User, Attendance, Activity } = require("../models");

// ✅ Get all users
exports.getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

// ✅ Get attendance by user
exports.getUserAttendance = async (req, res) => {
  const data = await Attendance.findAll({
    where: { UserId: req.params.userId },
    order: [["createdAt", "DESC"]],
  });
  res.json(data);
};

// ✅ Get latest activity
exports.getUserActivity = async (req, res) => {
  const activity = await Activity.findOne({
    where: { UserId: req.params.userId },
    order: [["createdAt", "DESC"]],
  });
  res.json(activity);
};

// ✅ Total working hours
exports.getTotalHours = async (req, res) => {
  const records = await Attendance.findAll({
    where: { UserId: req.params.userId },
  });

  const total = records.reduce((sum, r) => sum + (r.totalHours || 0), 0);

  res.json({ total });
};