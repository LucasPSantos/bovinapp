module.exports = (app) => {

    let db = require('./../connect_db')();

    return {
        index_pesquisa(req, res) {
            res.render('pesquisar/index', {
                titulo: "BovinApp - Pesquisar bovinos",
                pagina: "pesquisar",
                pg_titulo: "Pesquisar bovinos",
            });
        },
        pesquisar_bovino(req, res) {
            const {pesquisa} = req.body;
            pesquisa.tipo = pesquisa.tipo.toString().trim();
            pesquisa.entrada = pesquisa.entrada.toString().trim();
            if (pesquisa.tipo === 'rebanho'){
                db.model('bovino').find(
                    { "rebanho": { "$regex": pesquisa.entrada, "$options": "i" } },
                    function(err,docs) {
                        if (err) {
                            res.render('pesquisar/index', {
                                titulo: "BovinApp - Pesquisar bovinos",
                                pagina: "pesquisar",
                                pg_titulo: "Pesquisar bovinos",
                            });
                        }else {
                            if (docs.length > 0) {
                                res.render('pesquisar/list', {
                                    titulo: "BovinApp - Resultado da pesquisa",
                                    pagina: "pesquisar",
                                    pg_titulo: "Resultado da pesquisa",
                                    bovinos: docs
                                });
                            }else {
                                req.flash('danger', 'Nenhum resultado encontrado');
                                res.render('pesquisar/index', {
                                    titulo: "BovinApp - Pesquisar bovinos",
                                    pagina: "pesquisar",
                                    pg_titulo: "Pesquisar bovinos",
                                });
                            }

                        }
                    }
                );
            }
            if (pesquisa.tipo === 'raca'){
                db.model('bovino').find(
                    { "raca": { "$regex": pesquisa.entrada, "$options": "i" } },
                    function(err,docs) {
                        if (err) {
                            res.render('pesquisar/index', {
                                titulo: "BovinApp - Pesquisar bovinos",
                                pagina: "pesquisar",
                                pg_titulo: "Pesquisar bovinos",
                            });
                        }else {
                            if (docs.length > 0) {
                                res.render('pesquisar/list', {
                                    titulo: "BovinApp - Resultado da pesquisa",
                                    pagina: "pesquisar",
                                    pg_titulo: "Resultado da pesquisa",
                                    bovinos: docs
                                });
                            }else {
                                req.flash('danger', 'Nenhum resultado encontrado');
                                res.render('pesquisar/index', {
                                    titulo: "BovinApp - Pesquisar bovinos",
                                    pagina: "pesquisar",
                                    pg_titulo: "Pesquisar bovinos",
                                });
                            }
                        }
                    }
                );
            }
            /*if (pesquisa.tipo === 'isbn'){
                db.model('bovino').find(
                    { "isbn": { "$regex": pesquisa.entrada, "$options": "i" } },
                    function(err,docs) {
                        if (err) {
                            res.render('pesquisar/index', {
                                titulo: "BovinApp - Pesquisar bovinos",
                                pagina: "pesquisar",
                                pg_titulo: "Pesquisar bovinos",
                            });
                        }else {
                            if (docs.length > 0) {
                                res.render('pesquisar/list', {
                                    titulo: "BovinApp - Resultado da pesquisa",
                                    pagina: "pesquisar",
                                    pg_titulo: "Resultado da pesquisa",
                                    bovinos: docs
                                });
                            }else {
                                req.flash('danger', 'Nenhum resultado encontrado');
                                res.render('pesquisar/index', {
                                    titulo: "BovinApp - Pesquisar bovinos",
                                    pagina: "pesquisar",
                                    pg_titulo: "Pesquisar bovinos",
                                });
                            }
                        }
                    }
                );
            }*/
        },
    };
};