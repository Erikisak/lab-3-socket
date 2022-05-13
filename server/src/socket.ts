import { Server, Socket } from "socket.io"
import { log } from "./utils/formatting"

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
    log.info(`Sockets enabled`)


    io.on(EVENTS.connection, (socket: Socket) => {
        log.info(`User connected ${socket.id}`);


        socket.on(EVENTS.CLIENT.CREATE_ROOM, (roomName: string) => {
            console.log({ roomName });

            const roomId = roomName

            let rooms = [roomId]
            log.info(rooms)

            //join room
            socket.join(roomId);
            
            //emita till alla utom användaren en array av roomId
            //socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);
            
            //emita till alla inklusive anv en array av roomId
            socket.emit('allRooms', rooms);
            //emita till alla det just joinade(?) roomId
            socket.emit('joinedRoom', roomId);
        })

 /*        socket.on(EVENTS.CLIENT.SEND_ROOM_MESSAGE, ({ roomId, message, nickname }) => {
            socket.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, {
                message,
                nickname,

            })
        }); */

        //Join room from list
        socket.on(EVENTS.CLIENT.JOIN_ROOM, (roomId) => {
            socket.join(roomId)
            socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);

        });


    });
}

export default socket