module.exports = () => {
    let db = require('./../connect_db')();
    let Schema = require('mongoose').Schema;

    let rebanho = Schema({
        nome: {
            type: String,
            required: true
        },
        dataentrada: {
            type: String,
            default: ""
        },
        desc: {
            type: String,
            max: 50,
        },
        status: {
            type: String,
            default: 'ativo'
        },
        bovino: [{
        type: Schema.Types.ObjectId,
        ref: 'bovino',
        }],
        alimento: [{
        type: Schema.Types.ObjectId,
        ref: 'alimento',
        }],
    });

    return db.model('rebanho', rebanho);
};