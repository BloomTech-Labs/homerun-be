const router = require('express').Router();
const Members = require('../models/members-model.js');

router.get('/:householdId', async (req, res) => {
	try {
		const request = await Members.findHouseholdMembers(req.params.householdId)
		res.status(200).json(request);
	} catch (err) {
		res.status(500).json({ error: err.message, location: 'members-router.js 9' })
	}
})

module.exports = router