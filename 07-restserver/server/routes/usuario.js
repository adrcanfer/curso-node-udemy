const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const app = express();
const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');

app.get('/usuario', verificaToken, (req, res) => {
    let desde = Number(req.query.desde) || 0;
    let limite = Number(req.query.limite) || 5;

    console.log(req.usuario);
    Usuario.find({ estado: true }, 'nombre email')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                });
            } else {
                Usuario.count({ estado: true }, (err, numTotalUsuarios) => {
                    res.json({
                        ok: true,
                        usuarios,
                        numTotalUsuarios
                    });
                });
            }
        });
});

/* app.get('/usuario/:id', function(req, res) {
    let id = req.params.id;
    Usuario.findById(id, (err, usuarioDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        } else {
            res.json({
                ok: true,
                usuario: usuarioDB
            });
        }
    });
});
 */
app.post('/usuario', [verificaToken, verificaAdminRole], function(req, res) {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        } else {
            res.json({
                ok: true,
                usuario: usuarioDB
            });
        }
    });
});

app.put('/usuario/:id', [verificaToken, verificaAdminRole], function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        } else {
            res.json({
                ok: true,
                usuario: usuarioDB
            });
        }
    });
});

app.delete('/usuario/:id', [verificaToken, verificaAdminRole], function(req, res) {
    let id = req.params.id;
    //Borrado físico
    /* Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        } else {
            if (!usuarioBorrado) {
                res.status(400).json({
                    ok: false,
                    err: 'Usuario no encontrado'
                });
            } else {
                res.json({
                    ok: true,
                    usuario: usuarioBorrado
                });
            }
        }
    }) */
    // Borrado lógico
    let usuario = {
        estado: false
    }
    Usuario.findByIdAndUpdate(id, usuario, { new: true }, (err, usuarioDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        } else {
            res.json({
                ok: true,
                usuario: usuarioDB
            });
        }
    });
});

module.exports = app;