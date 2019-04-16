const db = require("../database/dbConfig.js");

module.exports = {
  add,
  findParents,
  findOrganizations,
  findById,
  isParent
};

async function add(user) {
  const [id] = await db(isParent(user)).insert(user);

  return findById(id, isParent(user));
}

function findById(id, database) {
  return db(database)
    .where({ id })
    .first();
}

function findParents() {}

function findOrganizations() {}

// ***** Parents/Organizations filter *****
function isParent(user) {
  if (user.username) {
    return "parents";
  } else {
    return "organizations";
  }
}
