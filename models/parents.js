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

async function findBy(filter, client) {
  console.log(filter, client);
  const database = tableSelect(client);
  console.log(database);
  console.log({ [client]: filter });
  return db(database)
    .where({ [client]: filter })
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
