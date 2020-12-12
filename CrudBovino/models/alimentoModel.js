module.exports = () => {
    let db = require('./../connect_db')();
    let Schema = require('mongoose').Schema;

    let alimento = Schema({
        nome: {
            type: String,
            required: true
        },
        dataentrada: {
            type: String,
            default: ""
        },
        kg: {
            type: Number,
            required: true
        },
        custo: {
            type: Number,
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

    return db.model('alimento', alimento);
};