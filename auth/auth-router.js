const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Parents = require("../models/parents.js");

router.post("/register", async (req, res) => {
  let user = req.body;

  if (user && (user.username || user.orgName) && user.password) {
    const hash = bcrypt.hashSync(user.password, 5);
    user.password = hash;
    try {
      const registeredUser = await Parents.add(user);
      res
        .status(201)
        .json({ message: "User successfully created.", registeredUser });
    } catch (err) {
      res.status(500).json({
        err,
        message: "The server can't process a register right now."
      });
    }
  } else {
    res.status(400).json({
      message: "You are missing either a username/orgName and/or a password."
    });
  }
});

module.exports = router;
