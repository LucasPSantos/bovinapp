module.exports = (app) => {


    let db = require('./../connect_db')();

    const dataAtual = function (delimitador) {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //As January is 0.
        let yyyy = today.getFullYear();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        return (mm + delimitador + dd + delimitador + yyyy);
    };

    const dataAtualFormatada = function (delimitador) {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //As January is 0.
        let yyyy = today.getFullYear();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        return (dd + delimitador + mm + delimitador + yyyy);
    };

    return {
        index_bovino(req, res) {
            db.model('bovino').find(null, function (err, bovinos) {
                if (!err) {
                    db.model('raca').find(null, function (err, racas) {
                        if (!err) {
                            /*db.model('tipo').find(null, function (err, tipos) {
                                if (!err) {*/
                                    db.model('rebanho').find(null, function (err, rebanhos) {
                                        if (!err) {
                                            res.render('bovino/index', {
                                                titulo: "BovinAPP - Cadastrar bovino",
                                                pagina: "bovino",
                                                pg_titulo: "Cadastrar bovino",
                                                bovino: {
                                                    _id: "",
                                                    raca: "",
                                                    dataentrada:   "",
                                                    tipo: "",
                                                    genero: "",
                                                    peso: "",
                                                    rebanho: ""
                                                },
                                                lenBovinos: bovinos.length,
                                                racas: racas,
                                                /*tipos: tipos,*/
                                                rebanhos: rebanhos
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
/*            });
        }*/,
        create_bovino(req, res) {
            let {bovino} = req.body;
            let dataentrada = dataAtualFormatada('/').toString();
            bovino.dataentrada = dataentrada;
            if (bovino._id === '') {
                bovino._id = null;

                db.model('bovino').insertMany(bovino, (error) => {
                    if (error) {
                        console.log("Falha ao criar bovino: " + error);
                        res.render('home/login', {titulo: "BovinAPP - Login"});
                    } else {
                        db.model('bovino').find(null, function (err, bovinos) {
                            if (!err) {
                                db.model('raca').find(null, function (err, racas) {
                                    if (!err) {
                                        /*db.model('tipo').find(null, function (err, tipos) {
                                            if (!err) {*/
                                                db.model('rebanho').find(null, function (err, rebanhos) {
                                                    if (!err) {
                                                        res.render('bovino/index', {
                                                            titulo: "BovinAPP - Cadastrar bovino",
                                                            pagina: "bovino",
                                                            pg_titulo: "Cadastrar bovino",
                                                            bovino: {
                                                                _id: "",
                                                                raca: "",
                                                                dataentrada:   "",
                                                                tipo: "",
                                                                genero: "",
                                                                peso: "",
                                                                rebanho: ""
                                                            },
                                                            lenBovinos: bovinos.length,
                                                            racas: racas,
/*                                                            tipos: tipos,*/
                                                            rebanhos: rebanhos
                                                        });
                                                    }
                                                });
                                          /*  }
                                        });*/
                                    }
                                });
                            }
                        });
                    }
                })
            } else {
                db.model('bovino').findOneAndUpdate({_id: req.body.bovino._id}, req.body.bovino, {new: true}, function (err, doc) {
                    // console.log('atualizado: ' + doc);
                    if (!err){
                        db.model('bovino').find(null, function (err, bovinos) {
                            if (err) {
                                console.log("Falha ao listar bovinos: " + err);
                                res.render('bovino/index', {
                                    titulo: "BovinAPP - Cadastrar bovino",
                                    pagina: "bovino"
                                });
                            } else {
                                res.render('bovino/list', {
                                    titulo: "BovinAPP - Listar bovinos",
                                    pagina: "bovino",
                                    bovinos: bovinos
                                });
                            }
                        });
                    }else{
                        console.log('falha: ' + err);
                    }
                });
            }
        },
        list_bovino(req, res) {
            db.model('bovino').find(null, function (err, bovinos) {
                if (err) {
                    console.log("Falha ao listar bovinos: " + err);
                    res.render('bovino/index', {
                        titulo: "BovinAPP - Cadastrar bovino",
                        pagina: "bovino"
                    });
                } else {
                    res.render('bovino/list', {
                        titulo: "BovinAPP - Listar bovinos",
                        pagina: "bovino",
                        bovinos: bovinos
                    });
                }
            });
        },
        update_bovino(req, res) {
            db.model('bovino').findById(req.params.id, function (err, doc) {
                if (!err) { 
                        db.model('raca').find(null, function (err, racas) {
                if (!err) {
                            db.model('rebanho').find(null, function (err, rebanhos) {
                if (!err) {
                    res.render('bovino/index', {
                        titulo: "BovinAPP - Editar bovino",
                        pagina: "bovino",
                        bovino: doc,
                        lenBovinos: doc.length,
                        pg_titulo: "Editar bovino",
                        racas: racas,
                        rebanhos: rebanhos
                    });
                }
            });
                                }
            });
                            }
            });
        },
        delete_bovino(req, res) {
            db.model('bovino').findByIdAndRemove(req.params.id, function (err) {
                if (!err) {

                    db.model('bovino').find(null, function (err, bovinos) {
                        if (err) {
                            console.log("Falha ao deletar bovino: " + err);
                            res.render('bovino/index', {
                                titulo: "BovinAPP - Cadastrar bovino",
                                pagina: "bovino"
                            });
                        } else {
                            res.render('bovino/list', {
                                titulo: "BovinAPP - Listar bovinos",
                                pagina: "bovino",
                                bovinos_len: bovinos.length,
                                bovinos: bovinos
                            });
                        }
                    });
                } else {
                    console.log('falha ao deletar: ' + err);
                    res.render('home/login');
                }
            });
        },
    };
};