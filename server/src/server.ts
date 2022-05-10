import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
//Replaces console logging cause its faster, but unneccessary probably
import logger from "./utils/logger"
import socket from "./sockets"

const port = 4000
const host = 'localhost'
const corsOrigin = 'http://localhost:3000'

const app = express();

const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin,
    credentials: true,
  }
});

//express endpoint
app.get('/', (_, res) => res.send('server is up'))

httpServer.listen(port, host, () => {
  logger.info(`server is listening on ${host}:${port}`)
  socket(io)
})