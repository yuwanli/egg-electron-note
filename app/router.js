module.exports = (app) => {
  const { router, controller } = app;
  router.get('/note/list', controller.item.list);
  router.post('/note/update', controller.item.update);
  router.post('/note/upload', controller.item.upload);
};
