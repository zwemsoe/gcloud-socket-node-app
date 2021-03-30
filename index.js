const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`listening on ${port}`);
});

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello!");
});

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

var msglist = [];

io.on("connection", (socket) => {
  console.log("Socket successfully connected.");

  socket.on("send message", (message) => {
    msglist.push({ message, id: socket.id });
    console.log(msglist);
    io.emit("messages update", msglist);
  });

  socket.on("get old messages", () => {
    io.emit("messages update", msglist);
  });
});
