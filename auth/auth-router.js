const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Parents = require("../models/parents.js");
const tokenService = require("./token-service.js");

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

router.post("/login", async (req, res) => {
  const { username, orgName, password } = req.body;
  console.log(username, orgName);

  if ((username || orgName) && password) {
    const database = Parents.tableSelect(function() {
      if (username) {
        return username;
      } else {
        return orgName;
      }
    });

    console.log(database);

    try {
      const getUser = await Parents.findBy(function() {
        if (username) {
          return username;
        } else {
          return orgName;
        }
      }, database);

      const credsCheck = bcrypt.compareSync(password, getUser.password);
      if (getUser && credsCheck) {
        const token = await tokenService.generateToken(getUser, database);
        const loggedIn = function() {
          if (username) {
            return username;
          } else {
            return orgName;
          }
        };
        res.status(200).json({
          message: `Welcome ${loggedIn()}! Here is your token!`,
          token
        });
      } else {
        res.status(404).json({ message: "Invalid Credentials" });
      }
    } catch (err) {
      res.status(500).json({ err, message: "Server can't login right now." });
    }
  } else {
    res.status(400).json({
      message: "You are missing either a username/orgName and/or a password."
    });
  }
});

module.exports = router;
