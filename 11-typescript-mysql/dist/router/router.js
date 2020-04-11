"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const router = express_1.Router();
router.get('/heroes', (req, res) => {
    const query = `
    SELECT *
    FROM heroes
    `;
    mysql_1.default.ejecutarQuery(query, (err, results) => {
        if (err) {
            res.status(400).json({
                ok: true,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                heroes: results
            });
        }
    });
});
router.get('/heroe/:id', (req, res) => {
    const id = req.params.id;
    const escapedId = mysql_1.default.instance.conn.escape(id);
    const query = `
    SELECT *
    FROM heroes
    WHERE id = ${escapedId}
    `;
    mysql_1.default.ejecutarQuery(query, (err, heroe) => {
        if (err) {
            res.status(400).json({
                ok: true,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                heroe: heroe[0]
            });
        }
    });
});
exports.default = router;
