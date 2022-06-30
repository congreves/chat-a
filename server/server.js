const { Server } = require("socket.io");
const { DateTime } = require("luxon");
const userModel = require("./models/users.model");
const roomModel = require("./models/rooms.model");
const messageModel = require("./models/messages.model");

const logMessages = require("./middelware/utils");
const db = require("./config/db");

const io = new Server(4000, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.use((socket, next) => {
  socket.on("chatMessage", (data) => {
    const timeStamp = DateTime.now().toLocaleString(DateTime.DATETIME_MED);
    const newMsg = {
      message: data.message,
     username: data.username,
      user_id: data.user_id,
      room_name: data.room,
      avatar: data.avatar,
      time: timeStamp,
    };
    logMessages(newMsg);
  });
  next();
});

// SEND MESSAGES
io.on("connection", async (socket) => {
  const users = await userModel.getAll();
  const rooms = await roomModel.getAll();

  io.emit("connection", { users, rooms });

  socket.on("error", (errorMessage) => {
    io.emit("errorMessage", errorMessage);
  });

/*io.on("connection", () => {
  socket.on("message", (msg) => {
    io.emit("message", msg);
    console.log(msg);
  });*/

  // PRIVATE MESSAGES
  socket.on("chatMessage", async (data) => {
    socket.broadcast.emit("isTyping", "");
console.log(data);

    const timeStamp = DateTime.now().toLocaleString(DateTime.DATETIME_MED);

    const newMsg = {
      message: data.message,
     username: data.username,
      user_id: data.user_id,
      room_name: data.room,
      avatar: data.avatar,
      time: timeStamp,
    };
    messageModel.createMessage(newMsg);
    socket.emit("logMessages", newMsg);

    const roomMessages = await messageModel.getRoomMessages(data.room);
    //io.to(data.room).emit("sentMessage", roomMessages);
    io.emit("sentMessage", roomMessages);
  }); 
  

  // CREATE USER & JOIN ROOM
  socket.on("create", async (username) => {
    //Skicka username from handleUser (som foer username fron inputfield)
    await userModel.createOne(socket.id, username);
    socket.emit("created", { id: socket.id, username });
    //Skicka alla användare (använd en getAllusers i model) socket.emit

    const result = await userModel.getAll();
    socket.emit("allUsers", result);
    console.log(result);
  });

  //  CREATE ROOM
  socket.on("createRoom", async (room_name) => {
    await roomModel.createOne(room_name);
    socket.emit("roomCreated", { room_name });
    // GET ALL ROOMS
    const result = await roomModel.getAll();
    socket.emit("allRooms", result);
    console.log(result);
  });
  // DELETE ONE ROOM
  socket.on("deleteRoom", async (room_name) => {
    await roomModel.deleteOne(room_name);

    const result = await roomModel.getAll();
    await messageModel.deleteRoomMessages(room_name);
    const updatedRooms = await roomModel.getAll();
    io.emit("deleteRoom", updatedRooms);
  });
});


