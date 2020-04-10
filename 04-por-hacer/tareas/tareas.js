const fs = require('fs');
const colors = require('colors');

let listadoTareas = [];

const obtenerDB = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('db/data.json', (err, data) => {
            if (err) {
                reject("Error al obtener los datos: " + err)
            } else {
                listadoTareas = JSON.parse(data);
                resolve();
            };
        });
    });
}

const guardarDB = () => {
    let data = JSON.stringify(listadoTareas);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error("Error al guardar los datos: " + err);
    });
}

const crear = (descripcion) => {
    obtenerDB().then(
        () => {
            let tarea = {
                descripcion,
                completado: false
            }
            listadoTareas.push(tarea)
            guardarDB();
            console.log("Creada la nueva tarea");
        },
        (err) => {
            console.log(err);
        }
    );
};

const listar = async() => {
    await obtenerDB();
    return listadoTareas;
}

const actualizar = async(descripcion, completado = true) => {
    await obtenerDB();
    let index = listadoTareas.findIndex(x => x.descripcion === descripcion);
    if (index >= 0) {
        listadoTareas[index].completado = completado;
    }
    guardarDB();
}

const borrar = async(descripcion) => {
    await obtenerDB();
    listadoTareas = listadoTareas.filter(x => x.descripcion !== descripcion);
    guardarDB();
}

module.exports = {
    crearTarea: crear,
    listarTareas: listar,
    actualizarTareas: actualizar,
    borrarTarea: borrar
};