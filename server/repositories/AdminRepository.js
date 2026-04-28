const db = require('../config/db');

class AdminRepository {
  // Get all users with their latest attendance status
  getAllUsers() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          u.UserId,
          u.Name,
          u.Email,
          a.Status AS CurrentStatus,
          a.CheckInTime AS LastCheckIn,
          a.CheckOutTime AS LastCheckOut
        FROM Users u
        LEFT JOIN Activities a ON u.UserId = a.UserId
          AND a.ActivityId = (
            SELECT MAX(ActivityId) FROM Activities WHERE UserId = u.UserId
          )
        ORDER BY u.Name ASC
      `;
      db.query(query, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Get all attendance records for a specific user
  getUserAttendance(userId) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          a.ActivityId,
          a.UserId,
          u.Name,
          u.Email,
          a.CheckInTime,
          a.CheckOutTime,
          a.Status,
          CASE 
            WHEN a.CheckOutTime IS NOT NULL THEN
              TIMESTAMPDIFF(MINUTE, a.CheckInTime, a.CheckOutTime)
            ELSE
              TIMESTAMPDIFF(MINUTE, a.CheckInTime, NOW())
          END AS WorkingMinutes
        FROM Activities a
        JOIN Users u ON a.UserId = u.UserId
        WHERE a.UserId = ?
        ORDER BY a.CheckInTime DESC
      `;
      db.query(query, [userId], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Get all attendance records (all users)
  getAllAttendance() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          a.ActivityId,
          a.UserId,
          u.Name,
          u.Email,
          a.CheckInTime,
          a.CheckOutTime,
          a.Status,
          CASE 
            WHEN a.CheckOutTime IS NOT NULL THEN
              TIMESTAMPDIFF(MINUTE, a.CheckInTime, a.CheckOutTime)
            ELSE
              TIMESTAMPDIFF(MINUTE, a.CheckInTime, NOW())
          END AS WorkingMinutes
        FROM Activities a
        JOIN Users u ON a.UserId = u.UserId
        ORDER BY a.CheckInTime DESC
      `;
      db.query(query, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Get total working hours summary per user
  getWorkingSummary() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          u.UserId,
          u.Name,
          u.Email,
          COUNT(a.ActivityId) AS TotalSessions,
          SUM(
            CASE 
              WHEN a.CheckOutTime IS NOT NULL THEN
                TIMESTAMPDIFF(MINUTE, a.CheckInTime, a.CheckOutTime)
              ELSE 0
            END
          ) AS TotalWorkingMinutes,
          MAX(a.CheckInTime) AS LastCheckIn,
          (
            SELECT a2.Status FROM Activities a2 
            WHERE a2.UserId = u.UserId 
            ORDER BY a2.ActivityId DESC LIMIT 1
          ) AS CurrentStatus
        FROM Users u
        LEFT JOIN Activities a ON u.UserId = a.UserId
        GROUP BY u.UserId, u.Name, u.Email
        ORDER BY u.Name ASC
      `;
      db.query(query, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = AdminRepository;