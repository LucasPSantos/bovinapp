module.exports = (app) => {

    let db = require('./../connect_db')();

    return {
        index_pesquisa(req, res) {
            res.render('pesquisarali/index', {
                titulo: "BovinApp - Pesquisar alimentos",
                pagina: "pesquisar",
                pg_titulo: "Pesquisar alimentos",
            });
        },
        pesquisar_alimento(req, res) {
            const {pesquisa} = req.body;
            pesquisa.tipo = pesquisa.tipo.toString().trim();
            pesquisa.entrada = pesquisa.entrada.toString().trim();
            if (pesquisa.tipo === 'rebanho'){
                db.model('alimento').find(
                    { "rebanho": { "$regex": pesquisa.entrada, "$options": "i" } },
                    function(err,docs) {
                        if (err) {
                            res.render('pesquisarali/index', {
                                titulo: "BovinApp - Pesquisar alimentos",
                                pagina: "pesquisar",
                                pg_titulo: "Pesquisar alimentos",
                            });
                        }else {
                            if (docs.length > 0) {
                                res.render('pesquisarali/list', {
                                    titulo: "BovinApp - Resultado da pesquisa",
                                    pagina: "pesquisar",
                                    pg_titulo: "Resultado da pesquisa",
                                    alimentos: docs
                                });
                            }else {
                                req.flash('danger', 'Nenhum resultado encontrado');
                                res.render('pesquisarali/index', {
                                    titulo: "BovinApp - Pesquisar alimentos",
                                    pagina: "pesquisar",
                                    pg_titulo: "Pesquisar alimentos",
                                });
                            }

                        }
                    }
                );
            }
            if (pesquisa.tipo === 'nome'){
                db.model('alimento').find(
                    { "nome": { "$regex": pesquisa.entrada, "$options": "i" } },
                    function(err,docs) {
                        if (err) {
                            res.render('pesquisarali/index', {
                                titulo: "BovinApp - Pesquisar alimentos",
                                pagina: "pesquisar",
                                pg_titulo: "Pesquisar alimentos",
                            });
                        }else {
                            if (docs.length > 0) {
                                res.render('pesquisarali/list', {
                                    titulo: "BovinApp - Resultado da pesquisa",
                                    pagina: "pesquisar",
                                    pg_titulo: "Resultado da pesquisa",
                                    alimentos: docs
                                });
                            }else {
                                req.flash('danger', 'Nenhum resultado encontrado');
                                res.render('pesquisarali/index', {
                                    titulo: "BovinApp - Pesquisar alimentos",
                                    pagina: "pesquisar",
                                    pg_titulo: "Pesquisar alimentos",
                                });
                            }
                        }
                    }
                );
            }
            /*if (pesquisa.tipo === 'isbn'){
                db.model('alimento').find(
                    { "isbn": { "$regex": pesquisa.entrada, "$options": "i" } },
                    function(err,docs) {
                        if (err) {
                            res.render('pesquisar/index', {
                                titulo: "BovinApp - Pesquisar alimentos",
                                pagina: "pesquisar",
                                pg_titulo: "Pesquisar alimentos",
                            });
                        }else {
                            if (docs.length > 0) {
                                res.render('pesquisar/list', {
                                    titulo: "BovinApp - Resultado da pesquisa",
                                    pagina: "pesquisar",
                                    pg_titulo: "Resultado da pesquisa",
                                    alimentos: docs
                                });
                            }else {
                                req.flash('danger', 'Nenhum resultado encontrado');
                                res.render('pesquisar/index', {
                                    titulo: "BovinApp - Pesquisar alimentos",
                                    pagina: "pesquisar",
                                    pg_titulo: "Pesquisar alimentos",
                                });
                            }
                        }
                    }
                );
            }*/
        },
    };
};