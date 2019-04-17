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
  const creds = req.body;
  console.log(creds.username, creds.orgName);
  console.log(creds);

  if ((creds.username || creds.orgName) && creds.password) {
    const client = (function() {
      if (creds.username) {
        return "username";
      } else {
        return "orgName";
      }
    })();

    console.log(client, "--directly after client");

    try {
      const getUser = await Parents.findBy(creds[client], client);
      console.log(getUser, "--after getUser");

      if (getUser) {
        const credsCheck = bcrypt.compareSync(creds.password, getUser.password);
        if (credsCheck) {
          const token = await tokenService.generateToken(getUser, client);

          res.status(200).json({
            message: `Welcome ${creds[client]}! Here is your token!`,
            token
          });
        } else {
          res.status(404).json({ message: "Invalid Credentials" });
        }
      } else {
        res.status(404).json({ message: "No record exists" });
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
