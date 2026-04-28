class AttendanceRepo {
  constructor(Attendance) {
    this.Attendance = Attendance;
  }

  create(data) {
    return this.Attendance.create(data);
  }

//   findToday(userId) {
//     return this.Attendance.findOne({
//       where: { userId },
//       order: [['createdAt', 'DESC']]
//     });
//   }

findToday(userId) {
  return this.Attendance.findOne({
    where: {
      UserId: userId,
      checkOut: null, // ✅ ONLY active check-in
    },
    order: [['createdAt', 'DESC']]
  });
}

  update(id, data) {
    return this.Attendance.update(data, { where: { id } });
  }

  delete(id) {
  return this.Attendance.destroy({ where: { id } });
}
}

module.exports = AttendanceRepo;