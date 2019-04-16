module.exports = {
  jwtSecret:
    process.env.JWT_SECRET ||
    "In a world where this app exists, You wouldn't need passwords."
};
