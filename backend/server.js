const express = require("express");
const userRoutes = require("./routes/userRoutes");
const chatRoute = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

const { connectDB } = require("./config/db");

connectDB();
const app = express();

// Returns middleware that only parses json and only looks at requests where
// the Content-Type header matches the type option.
app.use(express.json());
// making uploads folder available publically
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("API is running");
});

// here it will redirect to all the api endpoints available in userRoutes file
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoute);
app.use("/api/message", messageRoutes);

const server = app.listen(5000, console.log("server started"));

const io = require("socket.io")(server, {
  pingTimeout: 60000, // time till which socket connection will be alive
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  socket.on("setup", (userData) => {
    console.log("user room",userData._id);
    socket.join(userData._id); // setUp room for each user
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    let chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
