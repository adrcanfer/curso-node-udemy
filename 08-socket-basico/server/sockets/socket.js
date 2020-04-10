const { io } = require('../server');

io.on('connection', (client) => {
    console.log(`Usuario conectado`);

    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a esta aplicación'
    });

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar cliente
    client.on('enviarMensaje', (data, callback) => {
        console.log(data);

        client.broadcast.emit('enviarMensaje', data);
        /* if (data.usuario) {
            callback({
                resp: 'TODO SALIÓ BIEN'
            });
        } else {
            callback({
                resp: 'TODO SALIÓ BIEN'
            });
        } */
    });
});