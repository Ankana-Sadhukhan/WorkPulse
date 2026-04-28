const AdminRepository = require('../repositories/AdminRepository');

class AdminService {
  constructor() {
    this.repo = new AdminRepository();
  }

  async getAllUsers() {
    return await this.repo.getAllUsers();
  }

  async getUserAttendance(userId) {
    return await this.repo.getUserAttendance(userId);
  }

  async getAllAttendance() {
    return await this.repo.getAllAttendance();
  }

  async getWorkingSummary() {
    const summary = await this.repo.getWorkingSummary();
    // Convert minutes to hours and minutes for frontend
    return summary.map(user => ({
      ...user,
      TotalWorkingHours: Math.floor(user.TotalWorkingMinutes / 60),
      TotalWorkingMins: user.TotalWorkingMinutes % 60,
      TotalWorkingFormatted: `${Math.floor(user.TotalWorkingMinutes / 60)}h ${user.TotalWorkingMinutes % 60}m`
    }));
  }
}

module.exports = AdminService;