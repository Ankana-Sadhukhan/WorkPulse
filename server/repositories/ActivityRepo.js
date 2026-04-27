class ActivityRepo {
  constructor(Activity) {
    this.Activity = Activity;
  }

  upsert(data) {
    return this.Activity.upsert(data);
  }

  getAll() {
    return this.Activity.findAll();
  }
}

module.exports = ActivityRepo;