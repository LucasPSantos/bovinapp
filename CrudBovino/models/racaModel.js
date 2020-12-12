module.exports = () => {
    let db = require('./../connect_db')();
    let Schema = require('mongoose').Schema;

    let raca = Schema({
        raca: {
            type: String,
            required: true
        },
    });

    return db.model('raca', raca);
};