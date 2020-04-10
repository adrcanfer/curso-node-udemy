const { getLugarLatLng } = require('./lugar/lugar');
const { getClima } = require('./clima/clima');

const argv = require('yargs')
    .options({
        direccion: {
            alias: 'd',
            desc: 'Dirección de la ciudad para obtener el clima',
            demand: true
        }
    })
    .argv;

getLugarLatLng(argv.direccion)
    .then((data) => {
        return getClima(data.lat, data.lng)
    })
    .then(data2 => console.log(`El clima de ${argv.direccion} es de ${data2}ºC`))
    .catch((err) => console.log(`No se pudo determinar el clima de ${argv.direccion}`));