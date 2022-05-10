import { Server, Socket } from "socket.io"
import {log} from "./utils/formating"

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
    log.info(`Sockets enabled`)

    io.on(EVENTS.connection, (socket: Socket) => {
        log.info(`User connected ${socket.id}`);

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