import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
//Replaces console logging cause its faster, but unneccessary probably
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
let nickname: string;

// run when client connects || FUNKAR
io.on('connection', socket => {
  log.info('user connected with id: ' + socket.id)
  socket.emit('roomsObject', roomsObject)
  socket.emit('namesObject', namesObject)

  socket.on('nameSubmit', value => {
    //create nickname object, emit nickname object to all
    nickname = value
    createNamesObject(value)
    io.emit('namesObject', namesObject)
  })

  socket.on('joinRoom', ({ roomName, createRoom }) => {
    //checks if creating room
    if (createRoom) {


      const rooms = createRoomsObject(roomName)
      io.emit('roomsObject', rooms)

      // user room || FUNKAR
      const user = userJoin(socket.id, nickname, roomName)
      socket.join(user.roomName)

      // notifies only to the user, welcomes current user. BUG: console logs twice, clientside issue || CURRENT
      socket.emit('message', formatMessage(bot, `Welcome to ${roomName}`));

      // Broadcast when a user connects. notifies everyone except the user connecting. || FUNKAR
      socket.broadcast.to(user.roomName).emit('message', formatMessage(bot, `${user.nickname} has connected to the chat`));

      return

    } else {

      const leaver = userLeave(socket.id);

      // FUNKAR
      if (leaver) {
        io.to(leaver.roomName).emit('message', formatMessage(bot, `${leaver.nickname} has left the chat`));
        //Send leaver room info
        io.to(leaver.roomName).emit('roomUsers', {
          room: leaver.roomName,
          users: getRoomUsers(leaver.roomName)
        });
      }

      // user room || FUNKAR
      const user = userJoin(socket.id, nickname, roomName)
      socket.join(user.roomName)

      // notifies only to the user, welcomes current user. BUG: console logs twice, clientside issue || CURRENT
      socket.emit('message', formatMessage(bot, `Welcome to ${roomName}`));

      // Broadcast when a user connects. notifies everyone except the user connecting. || FUNKAR
      socket.broadcast.to(user.roomName).emit('message', formatMessage(bot, `${user.nickname} has connected to the chat`));

      //Send user room info || FUNKAR
      io.to(user.roomName).emit('roomUsers', {
        room: user.roomName,
        users: getRoomUsers(user.roomName)
      });

      socket.emit('roomsObject', roomsObject)

    }

  });

  socket.on("isTyping", () => {
    // socket.broadcast.to(roomName).emit("isTyping", socket.data.nickname);
    const user = getCurrentUser(socket.id);
    socket.broadcast.to(user.roomName).emit('isTyping', user.nickname);
  });

  //Listen for message. this is where you send the msg to the client || Funkar
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);

    io.to(user.roomName).emit('message', formatMessage(user.nickname, msg));
  });

  socket.on('leaveRoom', () => {
    const user = userLeave(socket.id);


    if (user) {
      //check if room empty, if so then remove room and emit new roomObject

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

  //Runs when user disconnects || Funkar
  socket.on('disconnect', () => {
    log.info('user disconnected')

    const user = userLeave(socket.id);

    // FUNKAR
    if (user) {
      //check if room empty, if so then remove room and emit new roomObject

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