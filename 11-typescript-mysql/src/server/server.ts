import express = require('express');
import path = require('path');


export default class Server {
    public app: express.Application;
    public port: number;

    constructor(puerto: number) {
        this.port = puerto;
        this.app = express();
    }

    static init (port: number) {
        return new Server(port);
    }

    private publicFolder() {
        const publicPath = path.resolve(__dirname, '../public');
        this.app.use(express.static(publicPath));
    }

    start(callback: (...args: any[]) => void) {
        this.app.listen(this.port, callback);
        this.publicFolder();
    }
}