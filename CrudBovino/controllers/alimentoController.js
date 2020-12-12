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
        index_alimento(req, res) {
            db.model('alimento').find(null, function (err, alimentos) {
                if (!err) {
                    db.model('rebanho').find(null, function (err, rebanhos) {
                        if (!err) {
                    res.render('alimento/index', {
                        titulo: "BovinAPP - Cadastrar alimento",
                        pagina: "alimento",
                        pg_titulo: "Cadastrar alimento",
                        alimento: {
                            _id: "",
                            nome: "",
                            dataentrada:   "",
                            kg: "",
                            custo: "",
                            
                        },
                        rebanhos: rebanhos,
                        lenAlimentos: alimentos.length
                    });
                }
            });
                        }
            });
        },
        create_alimento(req, res) {
            let {alimento} = req.body;
            let dataentrada = dataAtualFormatada('/').toString();
            alimento.dataentrada = dataentrada;
            if (alimento._id === '') {
                alimento._id = null;

                db.model('alimento').insertMany(alimento, (error) => {
                    if (error) {
                        console.log("Falha ao criar alimento: " + error);
                        res.render('home/login', {titulo: "BovinAPP - Login"});
                    } else {
                        db.model('alimento').find(null, function (err, alimentos) {
                            if (!err) {
                                        /*db.model('tipo').find(null, function (err, tipos) {
                                            if (!err) {*/
                                                db.model('rebanho').find(null, function (err, rebanhos) {
                                                    if (!err) {
                                                        res.render('alimento/index', {
                                                            titulo: "BovinAPP - Cadastrar alimento",
                                                            pagina: "alimento",
                                                            pg_titulo: "Cadastrar alimento",
                                                            alimento: {
                                                                _id: "",
                                                                nome: "",
                                                                dataentrada:   "",
                                                                kg: "",
                                                                custo: "",
                                                                rebanho: ""
                                                            },
                                                            lenAlimentos: alimentos.length,
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
                })
            } else {
                db.model('alimento').findOneAndUpdate({_id: req.body.alimento._id}, req.body.alimento, {new: true}, function (err, doc) {
                    // console.log('atualizado: ' + doc);
                    if (!err){
                        db.model('alimento').find(null, function (err, alimentos) {
                            if (err) {
                                console.log("Falha ao listar alimentos: " + err);
                                res.render('alimento/index', {
                                    titulo: "BovinAPP - Cadastrar alimento",
                                    pagina: "alimento"
                                });
                            } else {
                                res.render('alimento/list', {
                                    titulo: "BovinAPP - Listar alimentos",
                                    pagina: "alimento",
                                    alimentos: alimentos
                                });
                            }
                        });
                    }else{
                        console.log('falha: ' + err);
                    }
                });
            }
        },
        list_alimento(req, res) {
            db.model('alimento').find(null, function (err, alimentos) {
                if (err) {
                    console.log("Falha ao listar alimentos: " + err);
                    res.render('alimento/index', {
                        titulo: "BovinAPP - Cadastrar alimento",
                        pagina: "alimento"
                    });
                } else {
                    res.render('alimento/list', {
                        titulo: "BovinAPP - Listar alimentos",
                        pagina: "alimento",
                        alimentos: alimentos
                    });
                }
            });
        },
        update_alimento(req, res) {
            db.model('alimento').findById(req.params.id, function (err, doc) {
                if (!err) { 
                            db.model('rebanho').find(null, function (err, rebanhos) {
                if (!err) {
                    res.render('alimento/index', {
                        titulo: "BovinAPP - Editar alimento",
                        pagina: "alimento",
                        alimento: doc,
                        lenAlimentos: doc.length,
                        pg_titulo: "Editar alimento",
                        rebanhos: rebanhos
                    });
                }
            });
                                }
            });
        },
        delete_alimento(req, res) {
            db.model('alimento').findByIdAndRemove(req.params.id, function (err) {
                if (!err) {

                    db.model('alimento').find(null, function (err, alimentos) {
                        if (err) {
                            console.log("Falha ao deletar alimento: " + err);
                            res.render('alimento/index', {
                                titulo: "BovinAPP - Cadastrar alimento",
                                pagina: "alimento"
                            });
                        } else {
                            res.render('alimento/list', {
                                titulo: "BovinAPP - Listar alimentos",
                                pagina: "alimento",
                                alimentos_len: alimentos.length,
                                alimentos: alimentos
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