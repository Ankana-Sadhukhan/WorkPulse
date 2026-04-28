// const express = require('express');
// const router = express.Router();
// const AdminController = require('../controllers/AdminController');

// const adminController = new AdminController();

// GET /api/admin/users           → all users with current status
// GET /api/admin/attendance      → all attendance records (all users)
// GET /api/admin/attendance/:userId → attendance for one user
// GET /api/admin/summary         → total working hours per user

// router.get('/users', adminController.getAllUsers);
// router.get('/attendance', adminController.getAllAttendance);
// router.get('/attendance/:userId', adminController.getUserAttendance);
// router.get('/summary', adminController.getWorkingSummary);

// module.exports = router;

const express = require("express");
const router = express.Router();
const admin = require("../controllers/AdminController");

router.get("/users", admin.getAllUsers);
router.get("/attendance/:userId", admin.getUserAttendance);
router.get("/activity/:userId", admin.getUserActivity);
router.get("/total-hours/:userId", admin.getTotalHours);

module.exports = router;