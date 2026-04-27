module.exports = (router, controller) => {
  router.post('/activity', controller.update);
  router.get('/activity', controller.getAll);
};