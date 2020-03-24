const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const userRouter = require("../users/user-router");
const authRouter = require("../auth/auth-router");
const restricted = require("../auth/restricted-middleware");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/users", restricted, userRouter);

server.get("/", (req, res) => {
  res.send("Auth2 Challenge");
});

module.exports = server;
