module.exports = (app) => {
  const { pesquisaraliController } = app.controllers;

  // INDEX
  app.get('/pesquisarali', pesquisaraliController.index_pesquisa);
  app.get('/pesquisarali/index', pesquisaraliController.index_pesquisa);

  // PESQUISA
  app.post('/pesquisarali/alimento', pesquisaraliController.pesquisar_alimento);
};