const router = require("express").Router();
const Members = require("../models/members-model.js");

router.get("/household/:householdId", async (req, res) => {
  try {
    const members = await Members.findHouseholdMembers(req.params.householdId);
    const children = await Members.childrenPerHousehold(req.params.householdId);
    for (let member of members) {
      member.children = children;
    }
    res.status(200).json(members);
  } catch (err) {
    res
      .status(500)
      .json({ error: err.message, location: "members-router.js 9" });
  }
});

router.get("/household/:householdId/assign", async (req, res) => {
  try {
    const members = await Members.totalHouseholdMembers(req.params.householdId);
    const children = await Members.totalHouseholdChildren(
      req.params.householdId
    );
    res.status(200).json([...members, ...children]);
  } catch (err) {}
});

router.post("/household/invite", async (req, res, next) => {
  const { email } = req.body;
  const householdId = req.decodedToken.current_household;
  if (email && householdId) {
    console.log(email, householdId);
    Members.getByEmail(email)
      .then(member => {
        const newConfirmation = {
          member_id: member.id,
          hash: crypto.randomBytes(20).toString("hex")
        };
        Confirmations.insert(newConfirmation).then(hash => {
          sendMail(member.email, templates.householdInvite(hash, householdId));
          res.status(200).json({
            message: `An invitation email has been sent to ${member.email}`
          });
        });
      })
      .catch(err => {
        res
          .status(400)
          .json({ message: "A user with that email address does not exist." });
      });
  } else {
    res.status(400).json({ message: "Please enter an email address." });
  }
});

router.put("/:id", (req, res, next) => {
  const updates = req.body;
  Members.update(req.params.id, updates)
    .then(member => {
      res.status(200).json(member);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
