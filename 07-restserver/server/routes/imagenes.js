const express = require('express');
const app = new express();
const Usuario = require('../models/usuario');
const { verificaTokenImg } = require('../middlewares/autenticacion')

const fs = require('fs');
const path = require('path');


app.get('/imagen/:tipo/:img', verificaTokenImg, function(req, res) {
    let tipo = req.params.tipo;
    let img = req.params.img;

    let tiposValidos = ['productos', 'usuarios'];
    console.log(tiposValidos.find(x => x === tipo));

    let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);

    if (!fs.existsSync(pathImagen)) {
        pathImagen = path.resolve(__dirname, '../assets/no-image.jpg');
    }

    res.sendFile(pathImagen);
})



module.exports = app;