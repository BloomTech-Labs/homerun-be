const router = require("express").Router();
const Members = require("../models/members-model.js");

router.get("/:householdId", async (req, res) => {
  try {
    const members = await Members.findHouseholdMembers(req.params.householdId);
    const children = await Members.childrenPerHousehold(req.params.householdId);
    for (let member of members) {
      member.children = children;
    }
    console.log(members);
    res.status(200).json(members);
  } catch (err) {
    res
      .status(500)
      .json({ error: err.message, location: "members-router.js 9" });
  }
});

router.get("/:householdId/assign", async (req, res) => {
  try {
    const members = await Members.totalHouseholdMembers(req.params.householdId);
    const children = await Members.totalHouseholdChildren(
      req.params.householdId
    );
    res.status(200).json([...members, ...children]);
  } catch (err) {}
});

module.exports = router;
