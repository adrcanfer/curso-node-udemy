const express = require('express');
const fileUpload = require('express-fileupload');
const app = new express();
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
const fs = require('fs');
const path = require('path');


app.use(fileUpload({
    useTempFiles: true
}))

app.put('/upload/:tipo/:id', function(req, res) {
    let tipo = req.params.tipo;
    let id = req.params.id;

    let tiposValidos = ['productos', 'usuarios'];
    console.log(tiposValidos.find(x => x === tipo));

    if (!tiposValidos.find(x => x === tipo)) {
        return res.status(400).json({
            ok: false,
            message: 'Tipo no válido'
        });
    }

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: 'No se ha seleccionado ningún archivo'
        })
    }

    let archivo = req.files.archivo;

    // Extensiones válidoas
    let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];
    let nombreArchivo = archivo.name.split('.')[0];
    let extension = archivo.name.split('.')[1];
    if (!extensionesValidas.find(x => x === extension)) {
        return res.status(400).json({
            ok: false,
            message: 'Formato de archivo no permitido'
        });
    }

    nombreArchivo = `${nombreArchivo}-${new Date().getTime()}.${extension}`

    archivo.mv(`uploads/${tipo}/${nombreArchivo}`, function(err) {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (tipo === 'usuarios') {
            imagenUsuario(id, res, nombreArchivo);
        } else {
            imagenProducto(id, res, nombreArchivo);
        }


    });
})

function imagenUsuario(id, res, nombreArchivo) {
    Usuario.findById(id, (err, usuarioDB) => {
        if (err) {
            borraArchivo(nombreArchivo, 'usuarios');
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            borraArchivo(nombreArchivo, 'usuarios');
            return res.status(400).json({
                ok: false,
                message: 'No existe un usuario con ese ID'
            });
        }

        borraArchivo(usuarioDB.img, 'usuarios');

        usuarioDB.img = nombreArchivo;

        usuarioDB.save((err2, usuarioDBSaved) => {
            if (err2) {
                return res.status(500).json({
                    ok: false,
                    err: err2
                });
            }

            return res.status(200).json({
                ok: true,
                usuario: usuarioDBSaved,
                img: nombreArchivo
            });
        })
    })
}

function imagenProducto(id, res, nombreArchivo) {
    Producto.findById(id, (err, productoBD) => {
        if (err) {
            borraArchivo(nombreArchivo, 'productos');
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoBD) {
            borraArchivo(nombreArchivo, 'productos');
            return res.status(400).json({
                ok: false,
                message: 'No existe un producto con ese ID'
            });
        }

        borraArchivo(productoBD.img, 'productos');
        productoBD.img = nombreArchivo;

        productoBD.save((err2, productoBDSaved) => {
            if (err2) {
                return res.status(500).json({
                    ok: false,
                    err: err2
                });
            }

            return res.status(200).json({
                ok: true,
                producto: productoBDSaved,
                img: nombreArchivo
            });
        });
    });
}

function borraArchivo(nombreImagen, tipo) {
    let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`);
    if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
    }
}

module.exports = app;