const fs = require('fs');
const colors = require('colors');

let crearArchivo = (base, limite) => {
    return new Promise((resolve, reject) => {
        if (!Number(base)) {
            reject(`El valor introducido ${base} no es válido`);
            return;
        }

        console.log(`===================`.green);
        console.log(`Crear tabla del ${base}`.green);
        console.log(`===================`.green);

        let data = '';

        for (let i = 1; i <= limite; i++) {
            data += `${base} * ${i} = ${base * i}\n`;
        }

        fs.writeFile(`tablas/tabla-${base}.txt`, data, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve(`tabla-${base}.txt`)
            }

        })
    });

}

let listarTabla = (base, limite) => {
    return new Promise((resolve, reject) => {
        if (!Number(base) || !Number(limite)) {
            reject(`El valor introducido para la base o el limite no son válidos`);
            return;
        }

        console.log(`===================`.green);
        console.log(`Listar tabla del ${base}`.green);
        console.log(`===================`.green);

        for (let i = 1; i <= limite; i++) {
            console.log(`${base} * ${i} = ${base * i}`);
        }
        resolve();
    })

}
module.exports = {
    crearArchivo,
    listarTabla
};