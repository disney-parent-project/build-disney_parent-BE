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

router.get("/parent", restricted, async (req, res) => {
  try {
    const parents = await Parents.findParents();
    res
      .status(200)
      .json({ message: "Successfully retrieved all parents", parents });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server can't get the parents right now." });
  }
});

router.get("/parent/:parentId", restricted, async (req, res) => {
  const { parentId } = req.params;
  if (parentId) {
    try {
      const parent = await Parents.findParentById(parentId);
      res.status(200).json({ message: "Here is your parent!", parent });
    } catch (err) {
      res.status(500).json({ message: "Server can't get parent.", err });
    }
  } else {
    res.status(400).json({ message: "Must provide a dyncamic parent id" });
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

// ********** UPDATE **********
router.put("/:requestId", restricted, async (req, res) => {
  const changes = req.body;
  const id = req.params.requestId;
  if (
    changes &&
    changes.parents_id &&
    changes.atLocation &&
    changes.atTime &&
    changes.num_kids
  ) {
    try {
      const newRequest = await Requests.change(id);
      console.log(newRequest);
      if (newRequest) {
        res
          .status(201)
          .json({ newRequest, message: "successfully updated request" });
      } else {
        res.status(404).json({ message: "does not exist" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ err, message: "can't update request, server's fault" });
    }
  } else {
    res.status(400).json({
      message:
        "Need to have all elements of request. reference readme: https://github.com/disney-parent-project/build-disney_parent-BE"
    });
  }
});

// ********** DELETE **********
router.delete("/:requestId", restricted, async (req, res) => {
  const id = req.body;
  console.log(id);
  try {
    const deleted = await Requests.erase(id);
    if (deleted) {
      res
        .status(200)
        .json({ message: "successfully deleted. Bye, bye birdie" });
    } else {
      res
        .status(404)
        .json({ message: "No record exists to delete...good job!" });
    }
  } catch (err) {
    res.status(500).json({ message: "server could not delete", err });
  }
});

module.exports = router;
