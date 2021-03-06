module.exports = (app) => {

    const capitalize = (s) => {
        if (typeof s !== 'string') return '';
        return s.charAt(0).toUpperCase() + s.slice(1)
    };

    let db = require('./../connect_db')();

    return {
        index_pageinicial(req, res) {
            res.render('inicio', {
                titulo: "BovinAPP - Login",
            });
        },
        index_page(req, res) {
            res.render('home/index', {
                titulo: "BovinAPP - Login",
            });
        },
        cadastrar_page(req, res) {
            res.render('home/cadastrar', {
                titulo: "BovinAPP - Cadastro",
            });
        },
        create_usuario(req, res) {
            req.body.usuario.nome = capitalize(req.body.usuario.nome.toString().toLowerCase());
            req.body.usuario.sobrenome = capitalize(req.body.usuario.sobrenome.toString().toLowerCase());
            req.body.usuario.login = req.body.usuario.login.toString().toLowerCase();

            db.model('usuario').insertMany(req.body.usuario, (error, result) => {
                if (error) {
                    
                    res.render('home/cadastrar', {titulo: "BovinAPP - Cadastrar"});
                }
                res.render('home/index', {titulo: "BovinAPP - Login"});
            })
        },
        autenticar(req, res){
            var username = req.body.usuario.login.toString().trim();
            var password = req.body.usuario.senha.toString().trim();

            db.model('usuario').findOne({login: username, senha: password}, function (err, user) {
                if (err){
                    console.log("Erro: " + err);
                    res.render('home/index', {titulo: "BovinAPP - Login"});
                }else {
                    if (!user){
                        console.log("Credenciais incorretas");
                        res.render('home/index', {
                            titulo: "BovinAPP - Home"
                        });
                    }else {
                        global.user = user;
                        res.render('home/home', {
                            titulo: "BovinAPP - Home",
                            pagina: "home"
                        });
                    }
                }
            })
        },
        logout(req, res) {
            req.session.destroy();
            res.render('home/index', {titulo: "BovinAPP - Login"});
        },

        home_page(req, res) {
            res.render('home/home', {
                titulo: "BovinAPP - Home",
                pagina: "home"
            });
        }
    };
};