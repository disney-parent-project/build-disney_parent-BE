const express = require("express");

const configureMiddleware = require("./middleware.js");
const authRouter = require("../auth/auth-router.js");

const server = express();

configureMiddleware(server);

server.use("/api/parents", authRouter);

server.get("/", (req, res) => {
  res.send("It's Working, It's Working!");
});

module.exports = server;
