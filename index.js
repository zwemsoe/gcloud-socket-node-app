const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`listening on ${port}`);
});

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", express.static(path.join(__dirname + "public")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const io = require("socket.io")(server, {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? "https://gcloud-test-app-309202.wl.r.appspot.com/"
        : "http://localhost:3000",
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
