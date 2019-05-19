const mongoose = require('mongoose');

mongoose.connect("mongodb://172.28.0.2:27017/practica3", {
    useNewUrlParser: true
}).then(() => {
    console.log('Conexion exitosa');
}).catch(err => {
    console.log('Error en la conexion DB');
});
module.exports = mongoose;
