class AttendanceController {
  constructor(service) {
    this.service = service;
  }

  checkIn = async (req, res) => {
    const result = await this.service.checkIn(req.body.userId);
    res.json(result);
  };

  checkOut = async (req, res) => {
    const result = await this.service.checkOut(req.body.userId);
    res.json(result);
  };
  
  delete = async (req, res) => {
  try {
    await this.service.delete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


}

module.exports = AttendanceController;