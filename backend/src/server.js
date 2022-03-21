require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

class App {
  constructor() {
    this.express = express();
    this.server = require("http").Server(this.express);
    this.socket();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    mongoose.connect(process.env.MONGO_URL);
    this.express.use(morgan("dev"));
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(
      "/files",
      express.static(path.resolve(__dirname, "..", "uploads"))
    );
  }

  routes() {
    this.express.use(require("./routes"));
  }

  socket() {
    const connectedUsers = [];
    const io = require("socket.io")(this.server, { cors: { origin: "*" } });
    io.on("connection", (socket) => {
      const { user_id } = socket.handshake.query;
      connectedUsers[user_id] = socket.id;
    });
    this.express.use((req, res, next) => {
      req.io = io;
      req.connectedUsers = connectedUsers;
      return next();
    });
  }
}

module.exports = new App().server;
