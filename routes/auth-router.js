const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Members = require("../models/members-model.js");
const { generateToken } = require("../middleware/token.js");
const { pureCrypto } = require('../middleware/pureCrypto.js');
const axios = require('axios');

router.get('/hello', async (req, res) => {
  try {
    // How to get events from Google Calendar
    // const events = await axios.get('https://www.googleapis.com/calendar/v3/users/me/calendarList', {
    // 	headers: {
    // 		Authorization: "OAuth <access_token>"
    // 	}
    // })
    const user = {
      provider: req.session.grant.provider,
      email: req.session.grant.response.id_token.payload.email,
      username: req.session.grant.response.id_token.payload.email,
      access_token: pureCrypto("encrypt", req.session.grant.response.access_token),
      refresh_token: pureCrypto("encrypt", req.session.grant.response.refresh_token),
    }
    const currentUser = await Members.getByEmail(user.email)
    if (currentUser) {
      res.status(200).json({ message: "Welcome back!" })
    } else {
      const newUser = await Members.insert(user);
      res.status(200).json(newUser)
    }
  } catch (e) {
    console.log(e.message)
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

/*

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'test@example.com',
  from: 'test@example.com',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);
*/
