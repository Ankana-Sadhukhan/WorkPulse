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
}

module.exports = AttendanceController;