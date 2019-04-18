const jwt = require("jsonwebtoken");

const secrets = require("./config/secrets.js");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (!err) {
        req.decodedToken = decodedToken;
        next();
      } else {
        res
          .status(401)
          .json({
            message: "Invalid token. Token might be expired, re-login",
            err
          });
      }
    });
  } else {
    res.status(401).json({ message: "not logged in or no token provided." });
  }
};
