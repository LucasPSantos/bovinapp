module.exports = () => {
    let db = require('./../connect_db')();
    let Schema = require('mongoose').Schema;

    let bovino = Schema({
        raca: {
            type: String,
            required: true
        },
        dataentrada: {
            type: String,
            default: ""
        },
        tipo: {
            type: String,
            required: true
        },
        genero: {
            type: String,
            required: true
        },
        peso: {
            type: String,
            required: true
        },
        rebanho: {
            type: String,
            required: true
        },
        idrebanho: {
        type: Schema.Types.ObjectId,
        ref: 'rebanho',
      },
    });

    return db.model('bovino', bovino);
};