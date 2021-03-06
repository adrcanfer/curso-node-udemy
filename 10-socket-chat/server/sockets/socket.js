const { io } = require('../server');

const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utils/utils');

let usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrarChat', (usuario, callback) => {
        if (!usuario.nombre || !usuario.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre y la sala son necesarios'
            });
        }

        client.join(usuario.sala);
        let personas = usuarios.agregarPersona(client.id, usuario.nombre, usuario.sala);

        console.log("Sala:" + usuario.sala);
        client.broadcast.to(usuario.sala).emit('listaPersonas', personas);
        client.broadcast.to(usuario.sala).emit('crearMensaje', crearMensaje('Administrador', `${usuario.nombre} entró al chat`));

        callback(personas);
    });

    client.on('crearMensaje', (data, callback) => {
        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
        callback(mensaje);
    });

    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id);
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} abandonó el chat`));
        client.broadcast.to(personaBorrada.sala).emit('listaPersonas', usuarios.getPersonasPorSala(personaBorrada.sala));
    });


    //Mensajes privados
    client.on('mensajePrivado', function(data) {
        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, mensaje));
    })

});