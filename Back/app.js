// Requires

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
const request = require('request');

//Inicializar variables
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Importar rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');


// Conexión a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/UsersUpaxDB', { useNewUrlParser: true }, (err, res) => {

    if (err) {
        console.log('error:', error);
        throw err;

    }

    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');

});

// Rutas
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);


app.listen(3000, () => {
    console.log('Express server puerto 3000: online');
});