/* eslint-disable no-unused-vars */
const router = require('express').Router();
const purecrypt = require('purecrypt');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const Members = require('../models/members-model.js');
const Households = require('../models/households-model.js');
const Confirmations = require('../models/confirmations-model.js');
const { generateToken } = require('../middleware/token.js');
const sendMail = require('../middleware/sendMail.js');
const templates = require('../middleware/emailTemplates.js');
const axios = require('axios');

router.post('/signup', async (req, res) => {
  const newMember = req.body;
  if (newMember.email && newMember.password) {
    newMember.password = bcrypt.hashSync(newMember.password, 14);
    const householdId = crypto.randomBytes(3).toString('hex');
    await Households.insert({ id: householdId });
    newMember.current_household = householdId;
    Members.insert(newMember)
      .then((member) => {
        const newConfirmation = {
          member_id: member.id,
          hash: crypto.randomBytes(20).toString('hex'),
        };
        Confirmations.insert(newConfirmation)
          .then((hash) => {
            sendMail(member.email, templates.confirmation(hash))
              .then(() => {
                res.status(200).json({message: 'A confirmation email has been sent', email: member.email});
              })
              .catch(() => {
                res.status(500).json({type: 1, message: "Email service failed to send"});
              });
          })
          .catch(() => {
            res.status(500).json({type: 0, message: "Failed to store confirmation information in the database"})
          });
      })
      .catch(() => {
        res.status(401).json({ message: 'An account with this email already exists', email: req.body.email });
      });
  } else {
    res.status(401).json({ message: 'Request body missing email or password' });
  }
});

router.post('/login', (req, res, next) => {
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
          });
        } else if (member.active === false) {
          res.status(400).json({ message: 'Please confirm your email address before logging in.' });
        } else {
          res.status(401).json({ message: 'Invalid credentials' });
        }
      })
      .catch(() => {
        res.status(401).json({ message: 'Invalid credentials' });
      });
  } else {
    res.status(400).json({ message: 'Request body missing email or password' });
  }
});

router.post('/confirm', (req, res, next) => {
  const hash = req.body.hash;
  Confirmations.getByHash(hash)
    .then((confirmation) => {
      const member_id = confirmation.member_id;
      Members.getById(member_id).then((member) => {
        if (member.active === false) {
          Members.update(member.id, { active: true }).then((updated) => {
            Confirmations.remove(member.id).then((removed) => {
              res.status(200).json({ message: 'User confirmed successfully.' });
            });
          });
        } else {
          res.status(200).json({ message: 'User has already been confirmed.' });
        }
      });
    })
    .catch((err) => {
      res.status(404).json({ message: 'Invalid confirmation hash' });
    });
});

router.post('/forgot', (req, res, next) => {
  const email = req.body.email;
  Members.getByEmail(email)
    .then((member) => {
      const newConfirmation = {
        member_id: member.id,
        hash: crypto.randomBytes(20).toString('hex'),
      };
      Confirmations.insert(newConfirmation)
        .then((hash) => {
          sendMail(member.email, templates.reset(hash))
            .then(() => {
              res.status(200).json({message: 'A password reset link has been sent', email: member.email});
            })
            .catch(() => {
              res.status(500).json({type: 1, message: "Email service failed to send"});
            })
        })
        .catch(() => {
          res.status(500).json({type: 0, message: "Failed to store confirmation information in the database"});
        })
    })
    .catch(() => {
      res
        .status(404)
        .json({ message: 'A User with that email address does not exist.' });
    });
});

router.post('/reset', (req, res, next) => {
  const hash = req.body.hash;
  Confirmations.getByHash(hash)
    .then((confirmation) => {
      const member_id = confirmation.member_id;
      const newPassword = bcrypt.hashSync(req.body.password, 14);
      Members.update(member_id, { password: newPassword })
        .then(() => {
          Confirmations.remove(member_id).then(() => {
            res.status(200).json({ message: 'Your password has been reset.' });
          });
        })
        .catch(() => {
          res.status(500).json({ message: 'Member to update not found' });
        });
    })
    .catch(() => {
      res.status(404).json({ message: 'Invalid confirmation hash' });
    });
});

// TODO: anyone user is allowed to delete any other user...
router.delete('/:member_id', async (req, res) => {
  try {
    const request = await Members.remove(req.params.member_id);
    res.status(200).json(request);
  } catch (err) {
    res.status(500).json({ Message: 'Unable to delete user' });
  }
});

module.exports = router;
