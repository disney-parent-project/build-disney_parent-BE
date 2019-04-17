const router = require("express").Router();

const Parents = require("../models/parents.js");
const Requests = require("../models/requests.js");

const restricted = require("../auth/restricted-middleware.js");

// ********** GET **********
router.get("/", restricted, async (req, res) => {
  try {
    const requests = await Requests.find();
    res.status(200).json(requests);
  } catch {
    res.status(500).json({ message: "Server is broken :(" });
  }
});

// ********** POST **********
router.post("/", restricted, async (req, res) => {
  const request = req.body;
  if (
    request &&
    request.parents_id &&
    request.atLocation &&
    request.atTime &&
    request.num_kids
  ) {
    try {
      const newRequest = await Requests.add(request);
      res
        .status(201)
        .json({ message: "request made successfully", newRequest });
    } catch (err) {
      res
        .status(500)
        .json({ err, message: "can't post new request, server's fault." });
    }
  } else {
    res.status(400).json({
      message:
        "Need to have all elements of request. reference readme: https://github.com/disney-parent-project/build-disney_parent-BE"
    });
  }
});

module.exports = router;
