module.exports = (app) => {
  const { bovinoController } = app.controllers;

  // INDEX
  app.get('/bovino', bovinoController.index_bovino);
  app.get('/bovino/index', bovinoController.index_bovino);

  // CREATE
  app.post('/bovino/create', bovinoController.create_bovino);

  // READ
  app.get('/bovino/list', bovinoController.list_bovino);

  // UPDATE
  app.get('/bovino/edit/:id', bovinoController.update_bovino);

  // DELETE
  app.get('/bovino/delete/:id', bovinoController.delete_bovino);
};