import { Server, Socket } from "socket.io"
import logger from "./utils/logger"

const EVENTS = {
    connection: "connection",
    CLIENT: {
        CREATE_ROOM: "CREATE_ROOM",
    },
    SERVER: {
        ROOMS: "ROOMS",
        JOINED_ROOM: 'JOINED_ROOM'
    },
};

const rooms: Record<string, { name: string }> = {};

//io is Server
function socket(io: Server) {
    logger.info(`Sockets enabled`)

    io.on(EVENTS.connection, (socket: Socket) => {
        logger.info(`User connected ${socket.id}`);

        socket.on(EVENTS.CLIENT.CREATE_ROOM, (roomName: string) => {
            console.log({ roomName });

/*             socket.join(roomId);
 */
            socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);

            socket.emit(EVENTS.SERVER.ROOMS, rooms);

/*             socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
 */        })
    });
}

export default socket