const db = require("../database/dbConfig.js");

module.exports = {
  add,
  findParentById,
  findParents,
  findOrganizations,
  findBy,
  findById,
  tableSelect,
  columnSelect
};

async function add(user) {
  let [id] = [];
  if (user.password) {
    [id] = await db(tableSelect(user.username)).insert(user);
    return findById(id, tableSelect(user.username));
  } else {
    return null;
  }
}

async function findBy(filter, client) {
  const database = tableSelect(client);
  return db(database)
    .where({ [client]: filter })
    .first();
}

function findById(id, database) {
  const column = columnSelect(database);
  console.log(id, database, column);
  return db(database)
    .select("id", column)
    .where({ id })
    .first();
}

function findParents() {
  return db("parents").select("id", "username");
}

function findParentById(id) {
  console.log({ id });
  return db("parents")
    .select("id", "username")
    .where({ id })
    .first();
}

function findOrganizations() {
  return db("organizations").select("id", "orgName");
}

// ***** Parents/Organizations filter *****
function tableSelect(user) {
  if (user) {
    if (user === "username") {
      return "parents";
    } else if (user === "orgName") {
      return "organizations";
    } else {
      return "parents";
    }
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
