module.exports = (app) => {
  const { rebanhoController } = app.controllers;

  // INDEX
  app.get('/rebanho', rebanhoController.index_rebanho);
  app.get('/rebanho/index', rebanhoController.index_rebanho);

  // CREATE
  app.post('/rebanho/create', rebanhoController.create_rebanho);

  // READ
  app.get('/rebanho/list', rebanhoController.list_rebanho);
  app.get('/rebanho/listarbovinos/:id', rebanhoController.listar_bovinos);

  // UPDATE
  app.get('/rebanho/edit/:id', rebanhoController.update_rebanho);

  // DELETE
  app.get('/rebanho/delete/:id', rebanhoController.delete_rebanho);
};