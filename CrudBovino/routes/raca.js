module.exports = (app) => {
  const { racaController } = app.controllers;

  // INDEX
  app.get('/raca', racaController.index_raca);
  app.get('/raca/index', racaController.index_raca);

  // CREATE
  app.post('/raca/create', racaController.create_raca);

  // READ
  app.get('/raca/list', racaController.list_raca);

  // // UPDATE
  // app.get('/bovino/edit/:id', racaController.update_bovino);
  //
  // // DELETE
  // app.get('/bovino/delete/:id', racaController.delete_bovino);
};