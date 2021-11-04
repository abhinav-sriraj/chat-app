const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origins: ["http://localhost:4200"],
  },
});

app.get("/", (req, res) => {
  res.send("<h1>Hey Socket.io</h1>");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("client msg", (msg) => {
    console.log("message", msg);
  });
  socket.emit("server msg", "Hi Angular, from node")
  socket.on('user Message', (msg)=>{
    console.log('user says', msg)
    socket.broadcast.emit("recieve msg", msg)
  })
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
