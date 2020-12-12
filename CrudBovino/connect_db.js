let mongoose = require('mongoose');
let db;

module.exports = function () {
    if (!db){
    	console.log('server mongodb online (y)!')
        db = mongoose.connect('mongodb://localhost/Banco');
        mongoose.Promise = global.Promise;
    }

    return db;
};