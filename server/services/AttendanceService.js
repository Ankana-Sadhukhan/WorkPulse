class AttendanceService {
  constructor(repo) {
    this.repo = repo;
  }

//   async checkIn(userId) {
//     return this.repo.create({
//       UserId: userId,
//       checkIn: new Date(),
//     });
//   }

async checkIn(userId) {
  const existing = await this.repo.findToday(userId);

  if (existing) {
    throw new Error("Already checked in. Please checkout first.");
  }

  return this.repo.create({
    UserId: userId,
    checkIn: new Date(),
  });
}


//   async checkOut(userId) {
//     const record = await this.repo.findToday(userId);

//     const checkOutTime = new Date();
//     const hours =
//       (checkOutTime - new Date(record.checkIn)) / (1000 * 60 * 60);

//     await this.repo.update(record.id, {
//       checkOut: checkOutTime,
//       totalHours: hours,
//     });

//     return { message: "Checked out", totalHours: hours };
//   }

 async checkOut(userId) {
  const record = await this.repo.findToday(userId);

  // 🔴 FIX 1: check if record exists
  if (!record) {
    throw new Error("No check-in found for today");
  }

  // 🔴 FIX 2: ensure checkIn exists
  if (!record.checkIn) {
    throw new Error("Check-in time missing");
  }

  const checkOutTime = new Date();

  const hours =
    (checkOutTime - new Date(record.checkIn)) / (1000 * 60 * 60);

  await this.repo.update(record.id, {
    checkOut: checkOutTime,
    totalHours: hours,
  });

  return {
    message: "Checked out",
    totalHours: hours,
  };
}

}

module.exports = AttendanceService;