import { Server, Socket } from "socket.io"
import logger from "./utils/logger"
import { nanoid } from "nanoid";

const EVENTS = {
    connection: "connection",
    CLIENT: {
      CREATE_USER: "CREATE_USER",
      CREATE_ROOM: "CREATE_ROOM",
      SEND_ROOM_MESSAGE: 'SEND_ROOM_MESSAGE',
      JOIN_ROOM: "JOIN_ROOM",
    },
    SERVER: {
      ROOMS: "ROOMS",
      JOINED_ROOM: "JOINED_ROOM",
      ROOM_MESSAGE: "ROOM_MESSAGE",
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

            const roomId = nanoid()

            rooms[roomId] = {
                name: roomName,
            };

            socket.join(roomId);

            socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);

            socket.emit(EVENTS.SERVER.ROOMS, rooms);

            socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
        })

        socket.on(EVENTS.CLIENT.SEND_ROOM_MESSAGE, ({roomId, message, nickname}) => {
            socket.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, {
                message,
                nickname,

            })
        });


    });
}

export default socket