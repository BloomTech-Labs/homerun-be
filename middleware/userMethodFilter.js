const TodosMembers = require("../models/todos-members-model.js");
const TodosChildren = require("../models/todos-children-model.js");

module.exports = async (req, res, next) => {
	if (!req.body || !req.params.id) console.log("Missing body or todo id")
	const user = req.body;
	const id = req.params.id;
	// if (req.path === `/assign/${id}`) {
	// 	try {
	// 		if (user.type === "child") {
	// 			await TodosChildren.insert({ child_id: user.id, todo_id: id });
	// 		} else {
	// 			await TodosMembers.insert({ member_id: user.id, todo_id: id });
	// 		}
	// 		next()
	// 	} catch (e) {
	// 		console.log(e.message)
	// 	}
	// } else {
	// 	try {
	// 		if (user.type === "child") {
	// 			await TodosChildren.remove({ child_id: user.id, todo_id: id });
	// 		} else {
	// 			await TodosMembers.remove({ member_id: user.id, todo_id: id });
	// 		}
	// 		next()
	// 	} catch (e) {
	// 		console.log(e.message)
	// 	}
	// }

	switch (req.path) {
		case `/assign/${id}`:
			try {
				if (user.type === "child") {
					await TodosChildren.insert({ child_id: user.id, todo_id: id });
				} else {
					await TodosMembers.insert({ member_id: user.id, todo_id: id });
				}
				next()
			} catch (e) {
				console.log(e.message)
			}
		case `/unassign/${id}`:
			try {
				if (user.type === "child") {
					await TodosChildren.remove({ child_id: user.id, todo_id: id });
				} else {
					await TodosMembers.remove({ member_id: user.id, todo_id: id });
				}
				next()
			} catch (e) {
				console.log(e.message)
			}
		default:
			console.log("Invalid request")

	}
}