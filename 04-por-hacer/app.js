const { argv } = require('./config/yargs');
const { crearTarea, listarTareas, actualizarTareas, borrarTarea } = require('./tareas/tareas')
const comando = argv._[0];

switch (comando) {
    case 'crear':
        crearTarea(argv.descripcion);
        break;
    case 'listar':
        listarTareas().then(listadoTareas => {
            for (let tarea of listadoTareas) {
                console.log("=====Tarea=====".green);
                console.log(tarea.descripcion);
                console.log('Estado: ' + tarea.completado);
                console.log("===============".green);
            }
        });
        break;
    case 'actualizar':
        actualizarTareas(argv.descripcion, argv.completado);
        break;
    case 'borrar':
        console.log("Borrando tarea");
        borrarTarea(argv.descripcion);
        break;
    default:
        console.log("Comando no reconocido");
}