require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');

const User = require('./models/user');
const Attendance = require('./models/Attendance');
const Activity = require('./models/Activity');

const AttendanceRepo = require('./repositories/AttendanceRepo');
const ActivityRepo = require('./repositories/ActivityRepo');

const AttendanceService = require('./services/AttendanceService');
const ActivityService = require('./services/ActivityService');

const AttendanceController = require('./controllers/AttendanceController');
const ActivityController = require('./controllers/ActivityController');


const UserRepository = require('./repositories/UserRepository');
const UserService = require('./services/UserService');
const UserController = require('./controllers/UserControllers');

const app = express();
app.use(cors());
app.use(express.json());

// OOP Dependency Injection
const userRepo = new UserRepository(User);
const userService = new UserService(userRepo);
const userController = new UserController(userService);


const attendanceController = new AttendanceController(
  new AttendanceService(new AttendanceRepo(Attendance))
);

const activityController = new ActivityController(
  new ActivityService(new ActivityRepo(Activity))
);

// Routes
const userRoutes = require('./routes/userRoutes')(userController);
app.use('/api/users', userRoutes);

const router = express.Router();

// connect attendance routes
require('./routes/attendanceRoutes')(router, attendanceController);

// connect activity routes
require('./routes/activityRoutes')(router, activityController);

// mount them under /api
app.use('/api', router);

// Start server
sequelize.sync().then(() => {
  app.listen(5000, () => console.log("Server running on port 5000"));
});

// app.get('/', (req, res) => {
//   res.send('Backend is working ✔️');
// });