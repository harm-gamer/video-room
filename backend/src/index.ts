const express = require('express');
import http from "http"
import path from "path"
import { Socket } from "socket.io";
import { Server } from "socket.io";
import { UserManager  } from "./managers/UserManager";
const __dirname = path.resolve();

const app = express();
const server = http.createServer(http);
const io = new Server(server,{
  cors:{
    origin: "*",
  }
});

const userManager = new UserManager();
io.on('connection', (socket:Socket) => {
  console.log('a user connected');
  
  userManager.addUser("randomName",socket)

  socket.on('disconnect',() =>{
    console.log("user disconnected")
    userManager.removeUser(socket.id)
  })
});
app.use(express.static)
server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});