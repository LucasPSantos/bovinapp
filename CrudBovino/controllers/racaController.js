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
        index_raca(req, res) {

            db.model('raca').find(null, function (err, racas) {
                let lenRacas = racas.length;
                if (!err) {
                    res.render('raca/index', {
                        titulo: "BovinAPP - Cadastrar raça",
                        pagina: "raca",
                        raca: {
                            raca: "",
                        },
                        lenRaca: lenRacas,
                        pg_titulo: "Cadastrar raca"
                    });
                }
            });

            // db.model('raca').find(null, function (err, racas) {
            //     if (!err) {
            //         res.render('raca/index', {
            //             titulo: "BovinAPP - Cadastrar raca",
            //             pagina: "raca",
            //             pg_titulo: "Cadastrar raca",
            //             raca: {
            //                 _id: "",
            //                 raca: "",
            //                 dataentrada:   "",
            //                 tipo: "",
            //                 genero: "",
            //                 peso: "",
            //                 rebanho: ""
            //             },
            //             lenBovinos: racas.length
            //         });
            //     }
            // });
        },
        create_raca(req, res) {
            let {raca} = req.body;

            if (raca._id === '') {
                raca._id = null;

                db.model('raca').insertMany(raca, (error) => {
                    if (error) {
                        console.log("Falha ao criar raca: " + error);
                        res.render('home/login', {titulo: "BovinAPP - Login"});
                    } else {
                        db.model('raca').find(null, function (err, racas) {
                            let lenRacas = racas.length;
                            if (!err) {
                                res.render('raca/index', {
                                    titulo: "BovinAPP - Cadastrar raça",
                                    pagina: "raca",
                                    raca: {
                                        raca: "",
                                    },
                                    lenRaca: lenRacas,
                                    pg_titulo: "Cadastrar raca"
                                });
                            }
                        });
                    }
                })
            } else {
                db.model('raca').findOneAndUpdate({_id: req.body.raca._id}, req.body.raca, {new: true}, function (err, doc) {
                    // console.log('atualizado: ' + doc);
                    if (!err){
                        db.model('raca').find(null, function (err, racas) {
                            if (err) {
                                console.log("Falha ao listar racas: " + err);
                                res.render('raca/index', {
                                    titulo: "BovinAPP - Cadastrar raca",
                                    pagina: "raca"
                                });
                            } else {
                                res.render('raca/list', {
                                    titulo: "BovinAPP - Listar racas",
                                    pagina: "raca",
                                    racas: racas
                                });
                            }
                        });
                    }else{
                        console.log('falha: ' + err);
                    }
                });
            }
        },
        list_raca(req, res) {

            db.model('raca').find(null, function (err, racas) {
                let lenRacas = racas.length;
                if (!err) {
                    res.render('raca/list', {
                        titulo: "BovinAPP - Cadastrar raça",
                        pagina: "raca",
                        racas: racas,
                        lenRaca: lenRacas,
                        pg_titulo: "Cadastrar raça"
                    });
                }else {
                    res.render('raca/index', {
                        titulo: "BovinAPP - Cadastrar raça",
                        pagina: "raca",
                        raca: {
                            nome: "",
                        },
                        lenRaca: lenRacas,
                        pg_titulo: "Cadastrar raça"
                    });
                }
            });
        },
        update_raca(req, res) {
            db.model('raca').findById(req.params.id, function (err, doc) {
                if (!err) {
                    res.render('raca/index', {
                        titulo: "BovinAPP - Editar raca",
                        pagina: "raca",
                        raca: doc,
                        lenRacas: doc.length,
                        pg_titulo: "Editar raca"
                    });
                }
            });
        },
        delete_raca(req, res) {
            db.model('raca').findByIdAndRemove(req.params.id, function (err) {
                if (!err) {

                    db.model('raca').find(null, function (err, racas) {
                        if (err) {
                            console.log("Falha ao deletar raca: " + err);
                            res.render('raca/index', {
                                titulo: "BovinAPP - Cadastrar raca",
                                pagina: "raca"
                            });
                        } else {
                            res.render('raca/list', {
                                titulo: "BovinAPP - Listar racas",
                                pagina: "raca",
                                racas_len: racas.length,
                                racas: racas
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