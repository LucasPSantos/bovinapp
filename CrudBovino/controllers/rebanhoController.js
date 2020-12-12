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
        index_rebanho(req, res) {
            db.model('rebanho').find(null, function (err, rebanhos) {
                if (!err) {
                    res.render('rebanho/index', {
                        titulo: "BovinAPP - Cadastrar rebanho",
                        pagina: "rebanho",
                        pg_titulo: "Cadastrar rebanho",
                        rebanho: {
                            _id: "",
                            nome: "",
                            dataentrada: 'dataentrada',
                            desc: ""
                        },
                        lenRebanhos: rebanhos.length
                    });
                }
            });
        },
        create_rebanho(req, res) {
            let {rebanho} = req.body;
            let dataentrada = dataAtualFormatada('/').toString();
            rebanho.dataentrada = dataentrada;
            if (rebanho._id === '') {
                rebanho._id = null;

                db.model('rebanho').insertMany(rebanho, (error) => {
                    if (error) {
                        console.log("Falha ao criar rebanho: " + error);
                        res.render('home/login', {titulo: "BovinAPP - Login"});
                    } else {
                        db.model('rebanho').find(null, function (err, rebanhos) {
                            if (!err) {
                                res.render('rebanho/index', {
                                    titulo: "BovinAPP - Cadastrar rebanho",
                                    pagina: "rebanho",
                                    rebanho: {
                                        _id: "",
                                        nome: "",
                                        dataentrada: 'dataentrada',
                                        desc: ""
                                        
                                    },
                                    lenRebanhos: rebanhos.length,
                                    pg_titulo: "Cadastrar rebanho"
                                });
                            }
                        });
                    }
                })
            } else {
                db.model('rebanho').findOneAndUpdate({_id: req.body.rebanho._id}, req.body.rebanho, {new: true}, function (err, doc) {
                    // console.log('atualizado: ' + doc);
                    if (!err){
                        db.model('rebanho').find(null, function (err, rebanhos) {
                            if (err) {
                                console.log("Falha ao listar rebanhos: " + err);
                                res.render('rebanho/index', {
                                    titulo: "BovinAPP - Cadastrar rebanho",
                                    pagina: "rebanho"
                                });
                            } else {
                                res.render('rebanho/list', {
                                    titulo: "BovinAPP - Listar rebanhos",
                                    pagina: "rebanho",
                                    rebanhos: rebanhos
                                });
                            }
                        });
                    }else{
                        console.log('falha: ' + err);
                    }
                });
            }
        },
        list_rebanho(req, res) {
            db.model('rebanho').find(null, function (err, rebanhos) {
                if (err) {
                    console.log("Falha ao listar rebanhos: " + err);
                    res.render('rebanho/index', {
                        titulo: "BovinAPP - Cadastrar rebanho",
                        pagina: "rebanho"
                    });
                } else {
                    res.render('rebanho/list', {
                        titulo: "BovinAPP - Listar rebanhos",
                        pagina: "rebanho",
                        rebanhos: rebanhos
                    });
                }
            });
        },
        listar_bovinos(req,res){
        db.model('rebanho').find(null, function (err, rebanhos) {
                if (err) {
                    db.model('bovino').find(null, function (err, bovinos) {
                        if (err) {
                            console.log("Falha ao listar rebanhos: " + err);
                            res.render('rebanho/index', {
                                titulo: "BovinAPP - Cadastrar rebanho",
                                pagina: "rebanho"
                            });
                        } else {
                            res.render('rebanho/listarbovinos', {
                                titulo: "BovinAPP - Listar rebanhos",
                                pagina: "rebanho",
                                rebanhos: rebanhos,
                                bovinos:bovinos
                            });
                        }
                    });
                }
            });
        },
        update_rebanho(req, res) {
            db.model('rebanho').findById(req.params.id, function (err, doc) {
                if (!err) {
                    res.render('rebanho/index', {
                        titulo: "BovinAPP - Editar rebanho",
                        pagina: "rebanho",
                        rebanho: doc,
                        lenRebanhos: doc.length,
                        pg_titulo: "Editar rebanho"
                    });
                }
            });
        },
        delete_rebanho(req, res) {
            db.model('rebanho').findByIdAndRemove(req.params.id, function (err) {
                if (!err) {

                    db.model('rebanho').find(null, function (err, rebanhos) {
                        if (err) {
                            console.log("Falha ao deletar rebanho: " + err);
                            res.render('rebanho/index', {
                                titulo: "BovinAPP - Cadastrar rebanho",
                                pagina: "rebanho"
                            });
                        } else {
                            res.render('rebanho/list', {
                                titulo: "BovinAPP - Listar rebanhos",
                                pagina: "rebanho",
                                rebanhos_len: rebanhos.length,
                                rebanhos: rebanhos
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