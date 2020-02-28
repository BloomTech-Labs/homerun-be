const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Members = require("../models/members-model.js");
const { generateToken } = require("../middleware/token.js");
const axios = require('axios');

router.get('/hello', (req, res) => {
  try {
    // How to get events from Google Calendar
    // const events = await axios.get('https://www.googleapis.com/calendar/v3/users/me/calendarList', {
    // 	headers: {
    // 		Authorization: "OAuth <access_token>"
    // 	}
    // })

    // todo: Need to store...
    // ! Requires encryption
    // Location for access_token: req.session.grant.response.access_token
    // Location for refresh_token: req.session.grant.response.refresh_token
    let accessHash = bcrypt.hashSync(req.session.grant.response.access_token, 14)
    let refreshHash = bcrypt.hashSync(req.session.grant.response.refresh_token, 14)

    // ? No encryption needed
    // Location for email: req.session.grant.response.id_token.payload.email
    // Create username with email: email.split('@')[0]
    // Location for provider: req.session.grant.provider

    const user = {
      provider: req.session.grant.provider,
      email: req.session.grant.response.id_token.payload.email,
      username: req.session.grant.response.id_token.payload.email.split('@')[0],
      access_token: accessHash,
      refresh_token: refreshHash
    }




    console.log("This is the req", req)
    res.status(200).json(req.session.grant)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})



router.post("/signup", async (req, res, next) => {
  const newMember = req.body;
  if (newMember.email && newMember.password) {
    newMember.password = bcrypt.hashSync(newMember.password, 14);
    Members.insert(newMember)
      .then(member => {
        // TODO: do we want to return something more here?
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
    Members.getByEmail(credentials.email)
      .then(member => {
        if (bcrypt.compareSync(credentials.password, member.password)) {
          const token = generateToken(member);
          res.status(200).json({ message: `Welcome, ${member.email}`, token });
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
