module.exports = (app) => {
  const { router, controller } = app;
  router.get('/note/list', controller.note.list);
  router.get('/note/item', controller.note.item);
  router.post('/note/create', controller.note.create);
  router.post('/note/delete', controller.note.delete);
  router.post('/note/update', controller.note.update);
  router.post('/note/upload', controller.note.upload);
};
