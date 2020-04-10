const jwt = require('jsonwebtoken');

// =================
// Verificar token
// =================

let verificaToken = (req, res, next) => {
    let token = req.get('Authorization');
    jwt.verify(token, process.env.SEED_JWT, (err, decodedToken) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: 'Token no válido'
            });
        }

        req.usuario = decodedToken.usuario;
        next();
    });

}


// =================
// Verificar token img
// =================

let verificaTokenImg = (req, res, next) => {
    let token = req.query.token;
    jwt.verify(token, process.env.SEED_JWT, (err, decodedToken) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: 'Token no válido'
            });
        }

        req.usuario = decodedToken.usuario;
        next();
    });
}




// =================
// Verificar admin rol
// =================
let verificaAdminRole = (req, res, next) => {
    if (req.usuario.role !== 'ADMIN_ROLE') {
        return res.status(400).json({
            ok: false,
            err: 'Privilegios insuficientes'
        });
    }

    next();
}

module.exports = {
    verificaToken,
    verificaAdminRole,
    verificaTokenImg
}