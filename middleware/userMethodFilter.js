const TodosMembers = require("../models/todos-members-model.js");
const TodosChildren = require("../models/todos-children-model.js");

const insert = async (user, id) => {
	if (user.type === "child") {
		await TodosChildren.insert({ child_id: user.id, todo_id: id });
	} else {
		await TodosMembers.insert({ member_id: user.id, todo_id: id });
	}
}

const remove = async (user, id) => {
	if (user.type === "child") {
		await TodosChildren.remove({ child_id: user.id, todo_id: id });
	} else {
		await TodosMembers.remove({ member_id: user.id, todo_id: id });
	}
}

const paramCheck = (req) => {
	if (!req.body || !req.params.id) throw new Error("Missing body or todo id")
}

module.exports = async (req, res, next) => {
	paramCheck(req)
	const user = req.body;
	const id = req.params.id;
	switch (req.path) {
		case `/assign/${id}`:
			try {
				insert(user, id)
				next()
			} catch (e) {
				console.log(e.message)
			}
			break;
		case `/unassign/${id}`:
			try {
				remove(user, id)
				next()
			} catch (e) {
				console.log(e.message)
			}
			break;
		default:
			return next("Invalid request")

	}
}