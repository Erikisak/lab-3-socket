import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
//Replaces console logging cause its faster, but unneccessary probably
import { log, formatMessage } from "./utils/formating"
import { userJoin, getRoomUsers, getCurrentUser, userLeave } from "./utils/user"
/* import socket from "./sockets"
 */

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
  log.info(`server is listening on ${host}:${port}`)
})

const botName = 'Bot moderator';

// run when client connects
io.on('connection', socket => {
  log.info('user connected with id: '+ socket.id)
    socket.on('joinRoom', ({ username, room }) => {
        // user room
        const user = userJoin(socket.id, username, room)
        socket.join(user.room)

        // notifies only to the user, welcomes current user
        socket.emit('message', formatMessage(botName, 'Welcome to ChatCore'));

        // Broadcast when a user connects. notifies everyone except the user connecting.
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has connected to the chat`));

        //Send user room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });

    //Listen for message. this is where you can use react to display the msg in the dom 🤷‍♂️
    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit('message', formatMessage(user.username, msg));
    });

    //Runs when user disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if (user) {
            io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));
            //Send user room info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    });
});