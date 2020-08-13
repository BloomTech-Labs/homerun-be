/* eslint-disable no-unused-vars */
const router = require('express').Router();
const Members = require('../models/members-model.js');
const Confirmations = require('../models/confirmations-model.js').invite;
const crypto = require('crypto');
const sendMail = require('../middleware/sendMail.js');
const templates = require('../middleware/emailTemplates.js');
const { generateToken } = require('../middleware/token.js');
const { nanoid } = require('nanoid');

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

router.post('/household/invite', (req, res) => {
  console.log('body', req.body);
  const { email, permission_level } = req.body;
  const householdId = req.decodedToken.current_household;
  const invitedBy = req.member.username;
  if (email && householdId) {
    Members.getByEmail(email).then((member) => {
      if (member) {
        const newConfirmation = {
          id: nanoid(),
          member_id: member.id,
          household_id: householdId,
          permission_level,
        };
        Confirmations.insert(newConfirmation)
          .then(({ id, permission_level, household_id }) => {
            sendMail(
              member.email,
              templates.householdInvite(
                id,
                household_id,
                permission_level,
                invitedBy
              )
            )
              .then(() => {
                res.status(200).json({
                  message: `An invitation email has been sent to ${member.email}`,
                });
              })
              .catch(() => {
                res.status(500).json({
                  message: 'Error sending mail',
                });
              });
          })
          .catch(() => {
            res.status(500).json({
              message: 'Error inserting invite confirmation into database',
            });
          });
      } else {
        res.status(404).json({
          message: 'A user with that email address does not exist.',
        });
      }
    });
  } else {
    res.status(400).json({ message: 'Please enter an email address.' });
  }
});

router.post('/household/accept-invite', (req, res) => {
  const { hash } = req.body;
  const { permission_level } = req.body;
  const id = req.decodedToken.subject;
  if (hash && id && permission_level) {
    Confirmations.getById(hash).then((conf) => {
      if (conf) {
        let { member_id, household_id, permission_level } = conf;
        if (member_id === id) {
          // Updates member's current household
          Members.update(
            id,
            { current_household: household_id },
            { permission_level: permission_level }
          )
            .then((updated) => {
              Confirmations.remove(updated[0].id, household_id).then(
                async () => {
                  const token = await generateToken(updated[0]);
                  res.status(200).json({ updated, token });
                  console.log(permission_level, 'permission_level');
                }
              );
            })

            .catch(() => {
              res.status(500).json({ message: 'Unable to update member' });
              console.log(permission_level, 'permission_level');
            });

          // Create a new record in houlsehold_members table
          // Members.update(member_id, household_id, permission_level).
        } else {
          res
            .status(400)
            .json({ message: 'Cannot accept invite for another member' });
        }
      } else {
        res.status(400).json({ message: 'Invalid confirmation hash' });
      }
    });
  } else {
    res.status(400).json({
      message: 'Request body missing invite hash, or token is missing id',
    });
  }
});

router.delete('/', async (req, res) => {
  const { subject } = req.decodedToken;
  Members.remove(subject).then((removed) => {
    if (removed) {
      res.status(200).json({ message: 'Removed the user successfully' });
    } else {
      res.status(404).json({
        message:
          'Member to delete not found. This response should be unreachable',
      });
    }
  });
});

module.exports = router;
