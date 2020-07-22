/* eslint-disable no-unused-vars */
const router = require('express').Router();
const Members = require('../models/members-model.js');
const Confirmations = require('../models/confirmations-model.js');
const crypto = require('crypto');
const sendMail = require('../middleware/sendMail.js');
const templates = require('../middleware/emailTemplates.js');
const { generateToken } = require('../middleware/token.js');

router.get('/household', async (req, res) => {
  const householdId = req.decodedToken.current_household;
  try {
    const members = await Members.getHouseholdMembers(householdId);
    members.forEach((m) => (m.child = false));
    const children = await Members.getHouseholdChildren(householdId);
    children.forEach((m) => (m.child = true));
    res.status(200).json([...members, ...children]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/household/children/:childId', async (req, res) => {
  try {
    const request = await Members.getChildById(req.params.childId);
    res.status(200).json(request);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/household/children', async (req, res) => {
  const householdId = req.decodedToken.current_household;
  try {
    req.body.household_id = householdId;
    const request = await Members.addChild(req.body);
    res.status(200).json(request);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.put('/household/children/:childId', async (req, res) => {
  try {
    const request = await Members.updateChild(req.params.childId, req.body);
    res.status(200).json(request);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete('/household/children/:childId', async (req, res) => {
  try {
    const request = await Members.removeChild(req.params.childId);
    res.status(200).json(request);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/household/invite', async (req, res, next) => {
  const { email } = req.body;
  const householdId = req.decodedToken.current_household;
  if (email && householdId) {
    Members.getByEmail(email)
      .then((member) => {
        const newConfirmation = {
          member_id: member.id,
          hash: crypto.randomBytes(20).toString('hex'),
        };
        Confirmations.insert(newConfirmation).then((hash) => {
          sendMail(member.email, templates.householdInvite(hash, householdId));
          res.status(200).json({
            message: `An invitation email has been sent to ${member.email}`,
          });
        });
      })
      .catch((err) => {
        res.status(400).json({
          message: 'A user with that email address does not exist.',
          err,
        });
      });
  } else {
    res.status(400).json({ message: 'Please enter an email address.' });
  }
});

router.put('/', (req, res, next) => {
  const id = req.decodedToken.subject;
  if (req.body.hash) {
    Confirmations.getByHash(req.body.hash).then((confirmation) => {
      if (confirmation.member_id === id) {
        Members.update(id, { current_household: req.body.householdId })
          .then(async (member) => {
            const token = await generateToken(member[0]);
            res.status(200).json({ member, token });
          })
          .catch((err) => {
            next(err);
          });
      }
    });
  } else {
    Members.update(id, req.body)
      .then(async (member) => {
        const token = await generateToken(member[0]);
        res.status(200).json({ member, token });
      })
      .catch((err) => {
        next(err);
      });
  }
});

router.delete('/:member_id', async (req, res) => {
  const { member_id } = req.params;
  const { subject } = req.decodedToken;
  console.log(member_id, subject);
  if (Number(member_id) === subject) {
    Members.remove(member_id).then((removed) => {
      if (removed) {
        res.status(200).json({ message: 'Removed the user successfully' });
      } else {
        res.status(404).json({
          message:
            'Member to delete not found. This response should be unreachable',
        });
      }
    });
  } else {
    res.status(400).json({ message: 'Cannot delete other users' });
  }
});

module.exports = router;
