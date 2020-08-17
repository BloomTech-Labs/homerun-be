const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secrets.js');

const generateToken = (member) => {
  const payload = {
    id: member.id,
  };

  const options = {
    expiresIn: '1w',
  };

  return jwt.sign(payload, jwtSecret, options);
};

module.exports = {
  generateToken,
};
