import { info } from "console"
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

const bot = 'Server';

// run when client connects || FUNKAR
io.on('connection', socket => {
  log.info('user connected with id: ' + socket.id)
  socket.on('joinRoom', ({ nickname, roomName }) => {

    // user room || FUNKAR
    const user = userJoin(socket.id, nickname, roomName)
    socket.join(user.roomName)

    // notifies only to the user, welcomes current user. BUG: console logs twice but it is client issue, possible solution = useEffect, google it || CURRENT
    socket.emit('message', formatMessage(bot, `Welcome to ${roomName}`));

    // Broadcast when a user connects. notifies everyone except the user connecting. || FUNKAR
    socket.broadcast.to(user.roomName).emit('message', formatMessage(bot, `${user.nickname} has connected to the chat`));

    //Send user room info || FUNKAR
    io.to(user.roomName).emit('roomUsers', {
      room: user.roomName,
      users: getRoomUsers(user.roomName)
    });
  });

  //Listen for message. this is where you can use react to display the msg in the dom 🤷‍♂️ || Current
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);
    //works
    log.info(formatMessage(user.nickname, msg))

    io.to(user.roomName).emit('message', formatMessage(user.nickname, msg));
  });

  //Runs when user disconnects || Funkar
  socket.on('disconnect', () => {
    log.info('user disconnected')

    const user = userLeave(socket.id);

    // FUNKAR
    if (user) {
      io.to(user.roomName).emit('message', formatMessage(bot, `${user.nickname} has left the chat`));
      //Send user room info
      io.to(user.roomName).emit('roomUsers', {
        room: user.roomName,
        users: getRoomUsers(user.roomName)
      });
    }
  });
});