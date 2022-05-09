import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
//cors disables interaction between two ports so we need to fix that
import cors from "cors"
//config lets you create json files
import config from "config"
//Replaces console logging cause its faster, but unneccessary probably
import logger from "./utils/logger"
import socket from "./sockets"

const port = config.get<number>("port")
const host = config.get<string>("host")
const corsOrigin = config.get<string>("corsOrigin")

const app = express();

const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin,
    credentials: true,
  }
});

app.get('/', (_, res) => res.send('server is up'))

httpServer.listen(port, host, () => {
  logger.info(`server is listening on ${host}:${port}`)
  socket(io)
})