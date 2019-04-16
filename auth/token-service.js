const jwt = require("jsonwebtoken");

const secrets = require("./config/secrets.js");

module.exports = {
  generateToken
};

function generateToken(user) {
  const userCheck = isParent(user);
  const payload = {
    subject: user.id,
    username: userCheck
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}
