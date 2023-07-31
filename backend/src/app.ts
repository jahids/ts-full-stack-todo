import express from 'express';
import 'dotenv/config';
import noteRoute from './routes/note.route';
import cors from 'cors';
import userRoute from './routes/user.route';
import env from './utils/ValidateEnv';
import cookieParser from 'cookie-parser';
import adminroute from './routes/Admin.route';
import autheticauser from './utils/VarifyToken';
import conversationRoute from './routes/conversation.route';
const app = express();
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

const httpServer = createServer();
// Pass the HTTP server to the Socket.IO server
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

interface socketusers {
  id: string;
  socketId: string;
}

let users: socketusers[] = [];
io.on('connection', (socket: Socket) => {
  socket.on('addUser', (data) => {
    const user: socketusers = { id: data, socketId: socket.id };
    users.push(user);
    io.emit('getUsers', users);
    console.log('user connected', data);
  });
  // socket.on('disconnect', () => {
  //   console.log('A user disconnected');
  // });

  // Define your socket event handlers here
  // For example:
  // socket.on('chat message', (message: string) => {
  //   console.log('Received message:', message);
  //   // Broadcast the message to all connected clients
  //   io.emit('chat message', message);
  // });
});

app.use(cookieParser());
app.use(
  cors({
    origin: '*',
    credentials: true, // Allow credentials (cookies)
  })
);

app.use(express.json());
app.use('/c', conversationRoute);
app.use('/', userRoute);
app.use(autheticauser);
app.use('/api/notes', noteRoute);
app.use('/', adminroute);

// app.use((req, res, next) => {
//   next(Error('endpoint not found'));
// });

httpServer.listen(8080, () => {
  console.log(`Server listening on port 8080`);
});

export default app;
