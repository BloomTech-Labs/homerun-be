const router = require('express').Router();
const Todos = require('../models/todos-model.js');

router.get('/:householdId', async (req, res) => {
	try {
		const todosPerHousehold = await Todos.findTodosPerHousehold(req.params.householdId)
		res.status(200).json(todosPerHousehold);
	} catch (err) {
		res.status(500).json({ error: err.message, location: 'todos-router.js 8' })
	}
})

router.get('/:householdId/:memberId', async (req, res) => {
	try {
		const todosByMember = await Todos.findTodosByMember(req.params.householdId, req.params.memberId)
		res.status(200).json(todosByMember);
	} catch (err) {
		res.status(500).json({ error: err.message, location: 'todos-router.js 18' })
	}
})

module.exports = router