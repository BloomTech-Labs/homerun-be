const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/secrets.js");

const generateToken = user => {
  const payload = {
    subject: user.id,
    username: user.email
  };

  const options = {
    expiresIn: "1w"
  };

  return jwt.sign(payload, jwtSecret, options);
};

module.exports = {
  generateToken
};
