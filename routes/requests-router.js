const router = require("express").Router();

const Parents = require("../models/parents.js");
const Requests = require("../models/requests.js");

const restricted = require("../auth/restricted-middleware.js");

// ********** GET **********
router.get("/", async (req, res) => {
  try {
  } catch {
    res.status(500).json({ message: "Server is broken :(" });
  }
});

module.exports = router;
