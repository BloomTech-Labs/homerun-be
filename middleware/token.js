const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/secrets.js");

const generateToken = member => {
  const payload = {
    subject: member.id,
    email: member.email,
    current_household: member.current_household
  };

  const options = {
    expiresIn: "1w"
  };

  return jwt.sign(payload, jwtSecret, options);
};

module.exports = {
  generateToken
};
