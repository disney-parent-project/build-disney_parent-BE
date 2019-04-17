const db = require("../database/dbConfig.js");

module.exports = {
  add,
  findParents,
  findOrganizations,
  findBy,
  findById,
  tableSelect,
  columnSelect
};

async function add(user) {
  const [id] = await db(tableSelect(user.username)).insert(user);

  return findById(id, tableSelect(user.username));
}

async function findBy(filter, database) {
  return db(database)
    .where(filter)
    .first();
}

function findById(id, database) {
  const column = columnSelect(database);
  return db(database)
    .select("id", column)
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
function tableSelect(user) {
  console.log(user);
  if (user) {
    return "parents";
  } else {
    return "organizations";
  }
}

function columnSelect(database) {
  if (database === "parents") {
    return "username";
  } else {
    return "orgName";
  }
}
