// =======================
//  Puerto
// =======================
process.env.PORT = process.env.PORT || 3000;

// =======================
//  Entorno
// =======================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =======================
//  Token
// =======================
process.env.EXPIRACION_TOKEN = 60 * 60 * 24 * 30;
process.env.SEED_JWT = process.env.SEED_JWT || 'secret';

// =======================
//  Base de datos
// =======================
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

// =======================
//  Google Client ID
// =======================
process.env.CLIENT_ID = '480300104388-vm4ljj2fpolj8kg82ddgl4ou8sm6kgle.apps.googleusercontent.com';