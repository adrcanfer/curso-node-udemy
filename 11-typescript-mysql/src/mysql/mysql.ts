import mysql = require('mysql');

export default class MySQL {

    private static _instance: MySQL;

    conn: mysql.Connection;
    conectado: boolean = false;

    constructor() {
        console.log('Clase inicializada');
        this.conn = mysql.createConnection({
            host: 'localhost',
            user: 'node_user',
            password: 'node_user',
            database: 'node_db'
        });

        this.conectarDB();
    }

    public static get instance() {
        if(!this._instance) {
            this._instance = new this();
        }
        return this._instance;
    }

    public static ejecutarQuery(query: string, callback: Function ) {
        this.instance.conn.query(query, (err, results: Object[]) => {
            if(err) {
                console.log('Error en query');
                console.log(err);
                return callback(err);
            }

            if(results.length === 0) {
                callback('El registro solicitado no existe');
            } else {
                callback(null, results);
            }

        })
    }
    
    private conectarDB() {
        this.conn.connect((err: mysql.MysqlError) => {
            if(err) {
                console.log(err.message);
                return; 
            }

            this.conectado = true;
        });

        console.log('Conectado a la BD');
    }
}