const jwt = require("jsonwebtoken");

const secrets = require("./config/secrets.js");
const Parents = require("../models/parents.js");

module.exports = {
  generateToken
};

function generateToken(user, database) {
  const table = Parents.tableSelect(database);
  const column = Parents.columnSelect(table);
  const payload = {
    subject: user.id,
    username: user[column]
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}
