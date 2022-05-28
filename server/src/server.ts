import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import { log, formatMessage } from "./utils/formatting"
import { userJoin, getRoomUsers, getCurrentUser, userLeave, createRoomsObject, roomsObject, createNamesObject, namesObject } from "./utils/user"


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

// run when client connects
io.on('connection', socket => {
  log.info('user connected with id: ' + socket.id)
  socket.emit('roomsObject', roomsObject)
  socket.emit('namesObject', namesObject)

  socket.on('nameSubmit', value => {
    //create nickname object, emit nickname object to all
    createNamesObject(value)
    io.emit('namesObject', namesObject)
  })

  socket.on('joinRoom', ({ nickname, roomName, createRoom }) => {
    //checks if creating room
    if (createRoom) {

      const rooms = createRoomsObject(roomName)
      io.emit('roomsObject', rooms)

      // user room
      const user = userJoin(socket.id, nickname, roomName)
      socket.join(user.roomName)

      // notifies only to the user, welcomes current user.
      socket.emit('message', formatMessage(bot, `Welcome to ${roomName}`));

      // Broadcast when a user connects. notifies everyone except the user connecting.
      socket.broadcast.to(user.roomName).emit('message', formatMessage(bot, `${user.nickname} has connected to the chat`));

      return

    } else {

      const exittingUser = userLeave(socket.id);

      if (exittingUser) {
        socket.leave(exittingUser.roomName)

        io.to(exittingUser.roomName).emit('message', formatMessage(bot, `${exittingUser.nickname} has left the chat`));
        //Send exittingUser room info
        io.to(exittingUser.roomName).emit('roomUsers', {
          room: exittingUser.roomName,
          users: getRoomUsers(exittingUser.roomName)
        });
        io.emit('roomsObject', roomsObject)
      }

      // user room
      const user = userJoin(socket.id, nickname, roomName)
      socket.join(user.roomName)

      // notifies only to the user, welcomes current user. 
      socket.emit('message', formatMessage(bot, `Welcome to ${roomName}`));

      // Broadcast when a user connects. notifies everyone except the user connecting.
      socket.broadcast.to(user.roomName).emit('message', formatMessage(bot, `${user.nickname} has connected to the chat`));

      //Send user room info
      io.to(user.roomName).emit('roomUsers', {
        room: user.roomName,
        users: getRoomUsers(user.roomName)
      });
    }
  });

  socket.on("isTyping", () => {
    const user = getCurrentUser(socket.id);
    socket.broadcast.to(user.roomName).emit('isTyping', user.nickname);
  });

  //Listen for message. this is where you send the msg to the client.
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);

    io.to(user.roomName).emit('message', formatMessage(user.nickname, msg));
  });

  socket.on('leaveRoom', () => {
    const user = userLeave(socket.id);

    if (user) {
      socket.leave(user.roomName)

      socket.broadcast.to(user.roomName).emit('message', formatMessage(bot, `${user.nickname} has left the chat`));
      //Send user room info
      socket.broadcast.to(user.roomName).emit('roomUsers', {
        room: user.roomName,
        users: getRoomUsers(user.roomName)
      });

      //emit new roomsObject
      io.emit('roomsObject', roomsObject)
    }
  })

  //Runs when user disconnects
  socket.on('disconnect', () => {
    log.info('user disconnected')

    const user = userLeave(socket.id);

    if (user) {
      io.to(user.roomName).emit('message', formatMessage(bot, `${user.nickname} has left the chat`));
      //Send user room info
      io.to(user.roomName).emit('roomUsers', {
        room: user.roomName,
        users: getRoomUsers(user.roomName)
      });

      //emit new roomsObject
      io.emit('roomsObject', roomsObject)
    }
  });
});