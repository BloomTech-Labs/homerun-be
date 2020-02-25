const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("../models/members-model.js");
const { generateToken } = require("../middleware/token.js");

router.post("/signup", async (req, res, next) => {
  const newUser = req.body;
  if (newUser.email && newUser.password) {
    newUser.password = bcrypt.hashSync(newUser.password, 14);
    Users.insert(newUser)
      .then(user => {
        res.status(200).json({ message: "Sign up successful." });
      })
      .catch(err => {
        next(err);
      });
  } else {
    res.status(400).json({ message: "Invalid credentials." });
  }
});

router.post("/login", (req, res, next) => {
  const credentials = req.body;
  if (credentials.email && credentials.password) {
    Users.getByEmail(credentials.email)
      .then(user => {
        if (bcrypt.compareSync(credentials.password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({ message: `Welcome, ${user.email}`, token });
        }
      })
      .catch(err => {
        next(err);
      });
  } else {
    res.status(400).json({ message: "Invalid credentials" });
  }
});

module.exports = router;
