const argv = require('yargs')
    .command('crear', 'Crear una nueva tarea', {
        descripcion: {
            alias: 'd',
            demand: true
        }
    })
    .command('actualizar', 'Actualizar una tarea', {
        descripcion: {
            alias: 'd',
            demand: true
        },
        completado: {
            alias: 'c',
            default: true
        }
    })
    .command('borrar', 'Borrar una tarea', {
        descripcion: {
            alias: 'd',
            demand: true
        }
    })
    .help()
    .argv;

module.exports = {
    argv
}