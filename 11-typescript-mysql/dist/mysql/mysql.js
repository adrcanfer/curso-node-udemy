"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MySQL {
    constructor() {
        this.conectado = false;
        console.log('Clase inicializada');
        this.conn = mysql.createConnection({
            host: 'localhost',
            user: 'node_user',
            password: 'node_user',
            database: 'node_db'
        });
        this.conectarDB();
    }
    static get instance() {
        if (!this._instance) {
            this._instance = new this();
        }
        return this._instance;
    }
    static ejecutarQuery(query, callback) {
        this.instance.conn.query(query, (err, results) => {
            if (err) {
                console.log('Error en query');
                console.log(err);
                return callback(err);
            }
            if (results.length === 0) {
                callback('El registro solicitado no existe');
            }
            else {
                callback(null, results);
            }
        });
    }
    conectarDB() {
        this.conn.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.conectado = true;
        });
        console.log('Conectado a la BD');
    }
}
exports.default = MySQL;
