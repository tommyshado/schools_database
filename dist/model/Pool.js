"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbApp = exports.dbTest = void 0;
require("dotenv/config");
const pg_promise_1 = __importDefault(require("pg-promise"));
const pgp = (0, pg_promise_1.default)();
// *************************** Configuration for tests ************************************** //
const configTest = {
    connectionString: process.env.DB_URL,
};
const dbTest = pgp(configTest);
exports.dbTest = dbTest;
// ************************** Configuration for Application ********************************* //
const configApp = {
    connectionString: process.env.DB_URL_APP,
};
const dbApp = pgp(configApp);
exports.dbApp = dbApp;
