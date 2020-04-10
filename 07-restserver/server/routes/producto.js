const express = require('express');

const { verificaToken } = require('../middlewares/autenticacion');
const _ = require('underscore');

let app = express();
let Producto = require('../models/producto');

// Obtener todos los productos
app.get('/producto', verificaToken, (req, res) => {
    let desde = Number(req.query.desde) || 0;
    let limite = Number(req.query.limite) || 5;

    Producto.find({ disponible: true })
        .limit(limite)
        .skip(desde)
        .populate('categoria')
        .populate('usuario', 'nombre email')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productos
            })
        })
});

// Obtener producto por id
app.get('/producto/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    Producto.findOne({ _id: id, disponible: true })
        .populate('categoria')
        .populate('usuario', 'nombre email')
        .exec((err, producto) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!producto) {
                return res.json({
                    ok: false,
                    err: 'ID inválido'
                });
            }

            res.json({
                ok: true,
                producto
            });
        })
});

app.get('/producto/buscar/:termino', verificaToken, (req, res) => {
    let termino = req.params.termino;

    let regexp = new RegExp(termino, 'i');
    Producto.find({ nombre: regexp, disponible: true })
        .populate('categoria')
        .exec((err, producto) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!producto) {
                return res.json({
                    ok: false,
                    err: 'ID inválido'
                });
            }

            res.json({
                ok: true,
                producto
            });
        })

});

// Crear un nuevo producto
app.post('/producto', verificaToken, (req, res) => {
    let body = req.body;
    let producto = new Producto();
    producto.nombre = body.nombre;
    producto.precioUni = body.precioUni;
    producto.descripcion = body.descripcion;
    producto.categoria = body.categoria;
    producto.usuario = req.usuario._id;
    console.log(producto);

    producto.save((err, productoBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            productoBD
        });
    })
});

// Actualizar producto
app.put('/producto/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'precioUni', 'descripcion', 'categoria']);

    console.log(body);

    Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, updatedProduct) => {
        if (err) {
            res.status(500).json({
                ok: false,
                err
            });
        } else {
            res.json({
                ok: true,
                producto: updatedProduct
            });
        }
    })

});

// Borrar producto
app.delete('/producto/:id', [verificaToken], (req, res) => {
    let id = req.params.id;

    let borrado = {
        disponible: false
    }

    Producto.findByIdAndUpdate(id, borrado, { new: true, runValidators: true }, (err, removedProducto) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            producto: removedProducto
        });
    })
});

module.exports = app;