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
  const column = function() {
    if (database === "parents") {
      return "username";
    } else {
      return "orgName";
    }
  };
  return db(database)
    .select("id", column())
    .where({ id })
    .first();
}

function findParents() {
  return db("parents").select("id", "username");
}

function findOrganizations() {
  return db("organizations").select("id", "orgName");
}

// ***** Parents/Organizations filter *****
function isParent(user) {
  if (user.username) {
    return "parents";
  } else {
    return "organizations";
  }
}
