/* eslint-disable no-unused-vars */
const router = require('express').Router();
const Members = require('../models/members-model.js');
const Confirmations = require('../models/confirmations-model.js').invite;
const crypto = require('crypto');
const sendMail = require('../middleware/sendMail.js');
const templates = require('../middleware/emailTemplates.js');
const { generateToken } = require('../middleware/token.js');
const { nanoid } = require('nanoid');

router.get('/household', (req, res) => {
  const householdId = req.member.current_household;
  Members.getHouseholdMembers(householdId)
    .then((members) => {
      res.status(200).json(members);
    })
    .catch(() => {
      res.status(500).json({ error: 'Failed to retrieve household members' });
    });
});

router.post('/household/invite', (req, res) => {
  const { email, permissionLevel } = req.body;
  const householdId = req.member.current_household;
  const invitedBy = req.member.username;
  if (email && permissionLevel && householdId) {
    Members.getByEmail(email).then((member) => {
      if (member) {
        const newConfirmation = {
          id: nanoid(),
          member_id: member.id,
          household_id: householdId,
          permissionOfLevel: permissionLevel,
        };
        Confirmations.insert(newConfirmation)
          .then(({ id, household_id }) => {
            sendMail(
              member.email,
              templates.householdInvite(id, household_id, invitedBy)
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
  const id = req.member.id;
  if (hash && id) {
    Confirmations.getById(hash).then((conf) => {
      if (conf) {
        let { member_id, household_id, permissionOfLevel } = conf;
        if (member_id === id) {
          // Updates member's current household
          Members.update(id, {
            current_household: household_id,
            permission_level: permissionOfLevel,
          })
            .then((updated) => {
              Confirmations.remove(
                updated[0].id,
                household_id,
                permissionOfLevel
              ).then(() => {
                const token = generateToken(updated[0]);
                res.status(200).json({ updated, token });
              });
            })
            .catch(() => {
              res.status(500).json({ message: 'Unable to update member' });
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

router.post('/edit-permission', (req, res) => {
  const { id, permission_level } = req.body;
  if (id && permission_level) {
    Members.getById(id).then((member) => {
      if (member) {
        if (member.current_household === req.member.current_household) {
          // TODO: we also want to do permission checks
          Members.update(id, { permission_level }).then(() => {
            res
              .status(200)
              .json({
                message: `The member's permission level has been updated successfully`,
              })
              .catch(() => {
                res.status(500).json({
                  message: `There was an error when trying to update the member's permission level`,
                });
              });
          });
        } else {
          res.status(400).json({
            message: 'The member is not a part of the current household',
          });
        }
      } else {
        res.status(400).json({
          message: 'The member does not exist',
        });
      }
    });
  } else {
    res.status(404).json({
      message:
        "Request body missing 'id' or 'permission_level' of user to update",
    });
  }
});

router.delete('/', async (req, res) => {
  const { id } = req.member;
  Members.remove(id).then((removed) => {
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
