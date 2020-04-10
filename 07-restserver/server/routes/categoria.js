const express = require('express');
const app = express();
const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');
const _ = require('underscore');


const Categoria = require('../models/categoria');

// Obtener todas las categorias
app.get('/categoria', verificaToken, (req, res) => {
    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                categorias
            })
        })
});

// Obtener categoria por id
app.get('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    Categoria.findById(id)
        .populate('usuario', 'nombre email')
        .exec((err, categoria) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                categoria
            });
        })
});

// Crear nueva categoria
app.post('/categoria', verificaToken, (req, res) => {
    let categoria = new Categoria();
    categoria.descripcion = req.body.descripcion;
    categoria.usuario = req.usuario._id;

    categoria.save((err, categoriaBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoriaBD
        });
    })
});

// Actualizar categoria
app.put('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['descripcion']);

    Categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, updatedCategoria) => {
        if (err) {
            res.status(500).json({
                ok: false,
                err
            });
        } else {
            res.json({
                ok: true,
                categoria: updatedCategoria
            });
        }
    })

});

// Borrar nueva categoria
app.delete('/categoria/:id', [verificaToken, verificaAdminRole], (req, res) => {
    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, removedCategoria) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: removedCategoria
        });
    })
});

module.exports = app;