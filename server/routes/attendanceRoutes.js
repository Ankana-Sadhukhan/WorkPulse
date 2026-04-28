module.exports = (router, controller) => {
  router.post('/attendance/checkin', controller.checkIn);
  router.post('/attendance/checkout', controller.checkOut);
  router.delete("/:id", controller.delete);

};