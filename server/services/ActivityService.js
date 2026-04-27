class ActivityService {
  constructor(repo) {
    this.repo = repo;
  }

  updateStatus(userId, status) {
    return this.repo.upsert({
      userId,
      status,
      lastActive: new Date(),
    });
  }

  getAll() {
    return this.repo.getAll();
  }
}

module.exports = ActivityService;