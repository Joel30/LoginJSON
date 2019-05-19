const mongoose = require('../connect');
const Schema = mongoose.Schema;

const user=Schema({
    nombre      :   String,
    password    :   String,
    email       :   String,
    fechaRegistro:  Date
});

const usermodel=mongoose.model('usuarios',user);

module.exports=usermodel;
