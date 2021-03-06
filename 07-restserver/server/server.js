require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../public')));

app.use(require('./routes/index'));


mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err, res) => {
    if (err) {
        throw new Error("Error al conectar con la base de datos", err);
    } else {
        console.log("Base de datos ONLINE");
    }
});

app.listen(process.env.PORT, () => console.log("Escuchando en el puerto: " + process.env.PORT));