const { crearArchivo, listarTabla } = require('./multiplicar/multiplicar')
const colors = require('colors');
const { argv } = require('./config/yargs')

const base = argv.base;
const limite = argv.limite;
const comando = argv._[0];

switch (comando) {
    case 'listar':
        console.log('listar');
        listarTabla(base, limite).catch(err => console.log(err));
        break;
    case 'crear':
        console.log('crear');
        crearArchivo(base, limite)
            .then(archivo => console.log(`El archivo ` + colors.green(archivo) + ` ha sido creado`))
            .catch(err => console.log(err));
        break;

    default:
        console.log('Comando no reconocido');
}