const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secrets.js');
const membersModel = require('../models/members-model.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        // invalid token
        res.status(401).json({
          message: 'Please log in',
          tokenExpired: true,
        });
      } else {
        // valid token
        membersModel.getById(decodedToken.id).then((member) => {
          if (member) {
            req.member = member;
            next();
          } else {
            res.status(401).json({
              message: 'Please log in',
              tokenExpired: true,
            });
          }
        });
      }
    });
  } else {
    // missing token
    res.status(401).json({ message: 'Please log in' });
  }
};
