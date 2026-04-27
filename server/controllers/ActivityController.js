class ActivityController {
  constructor(service) {
    this.service = service;
  }

  update = async (req, res) => {
    await this.service.updateStatus(req.body.userId, req.body.status);
    res.json({ message: "Updated" });
  };

  getAll = async (req, res) => {
    const data = await this.service.getAll();
    res.json(data);
  };
}

module.exports = ActivityController;