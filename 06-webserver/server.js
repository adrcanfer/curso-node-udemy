const express = require('express')
const app = express()
const hbs = require('hbs');
require('./hbs/helpers')

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/parciales', function(err) {});


app.set('view engine', 'hbs');

app.get('/', function(req, res) {
    res.render('home', {
        titulo: 'Inicio | Demo',
        nombre: 'Adrián'
    });
});

app.get('/about', function(req, res) {
    res.render('about', {
        titulo: 'Sobre mi | Demo'
    });
});

app.listen(port, () => console.log("Escuchando peticiones en el puerto " + port));