const db = require("../database/dbConfig.js");

module.exports = {
  find,
  findById,
  add
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
