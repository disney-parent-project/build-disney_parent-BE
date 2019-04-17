const db = require("../database/dbConfig.js");

module.exports = {
  find,
  findById,
  add,
  change
};

function find() {
  return db("requests");
}

function findById(id) {
  return db("requests")
    .where({ id })
    .first();
}

async function add(request) {
  const [id] = await db("requests").insert(request);

  return findById(id);
}

async function change(request) {
  const { id } = request;
  const changed = await db("requests")
    .where({ id })
    .update({
      atLocation: request.atLocation,
      atTime: request.atTime,
      num_kids: request.num_kids
    });

  return findById(id);
}
