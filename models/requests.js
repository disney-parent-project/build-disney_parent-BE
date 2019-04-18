const db = require("../database/dbConfig.js");

module.exports = {
  find,
  findById,
  add,
  change,
  erase
};

function find() {
  return db("requests");
}

function findById(id) {
  return db("requests")
    .where({ id })
    .first();
}

async function add(parentId, request) {
  const [id] = await db("requests").insert({
    ...request,
    parents_id: parentId
  });

  return findById(id);
}

async function change(id, changes) {
  const changed = await db("requests")
    .where({ id })
    .update({ ...changes });

  return findById(id);
}

function erase(id) {
  return db("requests")
    .where({ id })
    .del();
}
