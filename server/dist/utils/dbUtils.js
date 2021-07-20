"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const config_1 = __importDefault(require("./../config"));
const pgconfig = {
    user: config_1.default.db.user,
    database: config_1.default.db.database,
    password: config_1.default.db.password,
    host: config_1.default.db.host,
    port: config_1.default.db.port,
    max: config_1.default.db.max,
    idleTimeoutMillis: config_1.default.db.idleTimeoutMillis
};
const pool = new pg_1.Pool(pgconfig);
exports.default = pool;
