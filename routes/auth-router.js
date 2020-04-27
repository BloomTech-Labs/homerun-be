const router = require("express").Router();
const purecrypt = require("purecrypt");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const Members = require("../models/members-model.js");
const Households = require("../models/households-model.js");
const Confirmations = require("../models/confirmations-model.js");
const { generateToken } = require("../middleware/token.js");
const sendMail = require("../middleware/sendMail.js");
const templates = require("../middleware/emailTemplates.js");
const axios = require("axios");

router.get("/hello", async (req, res) => {
  try {
    // How to get events from Google Calendar
    // const events = await axios.get('https://www.googleapis.com/calendar/v3/users/me/calendarList', {
    // 	headers: {
    // 		Authorization: "OAuth <access_token>"
    // 	}
    // })
    if (!req.session.grant.response.refresh_token) {
      req.session.grant.response.refresh_token = "";
    }

    const member = {
      provider: req.session.grant.provider,
      email: req.session.grant.response.id_token.payload.email,
      username: req.session.grant.response.id_token.payload.email,
      access_token: purecrypt.encrypt(req.session.grant.response.access_token),
      refresh_token: purecrypt.encrypt(
        req.session.grant.response.refresh_token
      ),
      active: true,
    };

    const currentMember = await Members.getByEmail(member.email);

    if (currentMember) {
      try {
        const token = await generateToken(currentMember);
        res.redirect(
          `${process.env.FE_URL}/auth/?token=${token}&member_id=${currentMember.id}&username=${currentMember.username}&points=${currentMember.points}`
        );
      } catch (e) {
        console.log(e.message);
        res.status(500).json({ error: e.message });
      }
    } else {
      try {
        const householdId = crypto.randomBytes(3).toString("hex");
        await Households.insert({ id: householdId });
        member.current_household = householdId;
        const newMember = await Members.insert(member);
        const token = await generateToken(newMember);
        res.redirect(
          `${process.env.FE_URL}/auth/?token=${token}&member_id=${newMember.id}&username=${newMember.username}&points=${newMember.points}`
        );
      } catch (e) {
        console.log(e.message);
        res.status(500).json({ error: e.message });
      }
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: e.message });
  }
});

router.post("/signup", async (req, res, next) => {
  const newMember = req.body;
  if (newMember.email && newMember.password) {
    newMember.password = bcrypt.hashSync(newMember.password, 14);
    const householdId = crypto.randomBytes(3).toString("hex");
    await Households.insert({ id: householdId });
    newMember.current_household = householdId;
    Members.insert(newMember)
      .then((member) => {
        const newConfirmation = {
          member_id: member.id,
          hash: crypto.randomBytes(20).toString("hex"),
        };
        Confirmations.insert(newConfirmation).then((hash) => {
          // TODO: change this to member.email once testing is complete
          sendMail(member.email, templates.confirmation(hash));
          res.status(200).json({
            message: `A confirmation email has been sent to ${member.email}`,
          });
        });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(401)
          .json({ message: `${req.body.email} has already been registered.` });
        // next(err);
      });
  } else {
    res.status(400).json({ message: "Invalid credentials." });
  }
});

router.post("/login", (req, res, next) => {
  const credentials = req.body;
  if (credentials.email && credentials.password) {
    Members.getByEmail(credentials.email)
      .then((member) => {
        console.log(member);
        if (
          member.active &&
          bcrypt.compareSync(credentials.password, member.password)
        ) {
          const token = generateToken(member);
          res.status(200).json({
            message: `Welcome, ${member.email}`,
            token,
            member_id: member.id,
            username: member.username,
            points: member.points,
          });
        } else if (member.active === false) {
          res.status(400).json({
            message: "Please confirm your email address before logging in.",
          });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch((err) => {
        next(err);
      });
  } else {
    res.status(400).json({ message: "Invalid credentials" });
  }
});

router.post("/confirm", (req, res, next) => {
  const hash = req.body.hash;
  Confirmations.getByHash(hash)
    .then((confirmation) => {
      const member_id = confirmation.member_id;
      Members.getById(member_id).then((member) => {
        if (member.active === false) {
          Members.update(member.id, { active: true }).then((updated) => {
            Confirmations.remove(member.id).then((removed) => {
              res.status(200).json({ message: "User confirmed successfully." });
            });
          });
        } else {
          res.status(200).json({ message: "User has already been confirmed." });
        }
      });
    })
    .catch((err) => {
      res.status(404).json({ message: "That link is invalid." });
      // next(err);
    });
});

router.post("/forgot", (req, res, next) => {
  const email = req.body.email;
  Members.getByEmail(email)
    .then((member) => {
      const newConfirmation = {
        member_id: member.id,
        hash: crypto.randomBytes(20).toString("hex"),
      };
      Confirmations.insert(newConfirmation)
        .then((hash) => {
          // TODO: change this to member.email once testing is complete
          sendMail(member.email, templates.reset(hash));
        })
        .then(() => {
          res.status(200).json({
            message: `A password reset link has been sent to ${member.email}`,
          });
        });
    })
    .catch((err) => {
      res
        .status(404)
        .json({ message: "A User with that email address does not exist." });
    });
});

router.post("/reset", (req, res, next) => {
  const hash = req.body.hash;
  Confirmations.getByHash(hash)
    .then((confirmation) => {
      const member_id = confirmation.member_id;
      const newPassword = bcrypt.hashSync(req.body.password, 14);
      Members.update(member_id, { password: newPassword })
        .then(() => {
          Confirmations.remove(member_id).then(() => {
            res.status(200).json({ message: "Your password has been reset." });
          });
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      res.status(404).json({ message: "That link is invalid." });
    });
});


router.delete("/:member_id", async (req, res) => {
  try {
    const request = await Members.remove(req.params.member_id);
    res.status(200).json(request);
  } catch {
    res.status(500).json({ Message: "Unable to delete user" });
  }
});

module.exports = router;
