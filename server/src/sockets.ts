import { Server, Socket } from "socket.io"
import logger from "./utils/logger"

const EVENTS = {
    connection: "connection"
}

//io is Server
function socket(io: Server){
    logger.info(`Sockets enabled`)

    io.on(EVENTS.connection, (socket: Socket) => {
        logger.info(`User connected ${socket.id}`)
    })
}

export default socket