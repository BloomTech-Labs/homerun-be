const router = require("express").Router();
const Members = require("../models/members-model.js");
const Confirmations = require("../models/confirmations-model.js");
const crypto = require("crypto");
const sendMail = require("../middleware/sendMail.js");
const templates = require("../middleware/emailTemplates.js");

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
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// router.get("/:household/c/:child", async (req, res) => {
//   try {
//     const request = await Members.getChildById(req.params.child)
//     res.status(200).json(request)
//   } catch (e) {
//     res.status(500).json({ error: e.message })
//   }
// })

// router.post("/:household/c", async (req, res) => {
//   try {
//     req.body.household_id = req.params.household
//     const request = await Members.addChild(req.body)
//     res.status(200).json(request)
//   } catch (e) {
//     res.status(500).json({ error: e.message })
//   }
// })

// router.put("/:household/c/:child", async (req, res) => {
//   try {
//     const request = await Members.updateChild(req.params.child, req.body)
//     res.status(200).json(request)
//   } catch (e) {
//     res.status(500).json({ error: e.message })
//   }
// })

// router.delete("/:household/c/:child", async (req, res) => {
//   try {
//     const request = await Members.removeChild(req.params.child)
//     res.status(200).json(request)
//   } catch (e) {
//     res.status(500).json({ error: e.message })
//   }
// })

router.post("/household/invite", async (req, res, next) => {
  const { email } = req.body;
  const householdId = req.decodedToken.current_household;
  if (email && householdId) {
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
        res.status(400).json({
          message: "A user with that email address does not exist.",
          err
        });
      });
  } else {
    res.status(400).json({ message: "Please enter an email address." });
  }
});

router.put("/", (req, res, next) => {
  const id = req.decodedToken.subject;
  if (req.body.hash) {
    Confirmations.getByHash(req.body.hash).then(confirmation => {
      console.log(id, confirmation.member_id);
      if (confirmation.member_id === id) {
        Members.update(id, { current_household: req.body.householdId })
          .then(member => {
            res.status(200).json(member);
          })
          .catch(err => {
            next(err);
          });
      }
    });
  } else {
    Members.update(id, updates)
      .then(member => {
        res.status(200).json(member);
      })
      .catch(err => {
        next(err);
      });
  }
});

module.exports = router;
