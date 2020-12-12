module.exports = () => {
    let db = require('./../connect_db')();
    let Schema = require('mongoose').Schema;

    let usuario = Schema({
        nome: {
            type: String,
            required: true
        },
        sobrenome: {
            type: String,
            required: true
        },
        login: {
            type: String,
            required: true,
            index: {unique: true}
        },
        senha: {
            type: String,
            required: true
        },
    });

    return db.model('usuario', usuario);
};