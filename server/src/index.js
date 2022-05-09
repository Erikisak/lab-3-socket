"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
//config lets you create json files
const config_1 = __importDefault(require("config"));
//Replaces console logging cause its faster, but unneccessary probably
const logger_1 = __importDefault(require("./utils/logger"));
const sockets_1 = __importDefault(require("./sockets"));
const port = config_1.default.get("port");
const host = config_1.default.get("host");
const corsOrigin = config_1.default.get("corsOrigin");
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: corsOrigin,
        credentials: true,
    }
});
app.get('/', (_, res) => res.send('server is up'));
httpServer.listen(port, host, () => {
    logger_1.default.info(`server is listening on ${host}:${port}`);
    (0, sockets_1.default)(io);
});
