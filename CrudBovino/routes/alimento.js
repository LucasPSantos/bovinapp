module.exports = (app) => {
  const { alimentoController } = app.controllers;

  // INDEX
  app.get('/alimento', alimentoController.index_alimento);
  app.get('/alimento/index', alimentoController.index_alimento);

  // CREATE
  app.post('/alimento/create', alimentoController.create_alimento);

  // READ
  app.get('/alimento/list', alimentoController.list_alimento);

  // UPDATE
  app.get('/alimento/edit/:id', alimentoController.update_alimento);

  // DELETE
  app.get('/alimento/delete/:id', alimentoController.delete_alimento);
};