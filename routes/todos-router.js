const router = require("express").Router();
const Todos = require("../models/todos-model.js");
const TodosMembers = require("../models/todos-members-model.js");
const TodosChildren = require("../models/todos-children-model.js");

router.get("/:householdId", async (req, res) => {
  try {
    const todosPerHousehold = await Todos.findTodosPerHousehold(
      req.params.householdId
    );
    res.status(200).json(todosPerHousehold);
  } catch (err) {
    res.status(500).json({ error: err.message, location: "todos-router.js 8" });
  }
});

router.get("/:householdId/:memberId", async (req, res) => {
  try {
    const todosByMember = await Todos.findTodosByMember(
      req.params.householdId,
      req.params.memberId
    );
    res.status(200).json(todosByMember);
  } catch (err) {
    res
      .status(500)
      .json({ error: err.message, location: "todos-router.js 18" });
  }
});

router.post("/:id/assign", async (req, res, next) => {
  const todo_id = req.params.id;
  const { assignees } = req.body;
  let childrenAssigned = [];
  let membersAssigned = [];

  if (assignees) {
    const children = assignees
      .filter(a => a.type === "child")
      .map(c => {
        return { child_id: c.id, todo_id: todo_id };
      });
    const members = assignees
      .filter(a => a.type === "member")
      .map(m => {
        return { member_id: m.id, todo_id: todo_id };
      });

    if (children.length > 0) {
      childrenAssigned = await TodosChildren.insert(children);
    }

    if (members.length > 0) {
      membersAssigned = await TodosMembers.insert(members);
    }

    const assigned = childrenAssigned.concat(membersAssigned);
    res.status(200).json({ assigned });
  } else {
    res.status(400).json({ message: "Required assignment arguments missing." });
  }
});

router.post("/:id/unassign", async (req, res, next) => {
  const todo_id = req.params.id;
  const { assignees } = req.body;
  let childrenUnassigned = [];
  let membersUnassigned = [];

  if (assignees) {
    const children = assignees
      .filter(a => a.type === "child")
      .map(c => {
        return { child_id: c.id, todo_id: todo_id };
      });
    const members = assignees
      .filter(a => a.type === "member")
      .map(m => {
        return { member_id: m.id, todo_id: todo_id };
      });

    if (children.length > 0) {
      childrenUnassigned = await TodosChildren.remove(children);
    }

    if (members.length > 0) {
      membersUnassigned = await TodosMembers.remove(members);
    }

    const assigned = childrenAssigned.concat(membersAssigned);
    res.status(200).json({ assigned });
  } else {
    res.status(400).json({ message: "Required assignment arguments missing." });
  }
});

router.post("/add", (req, res, next) => {
  const newTodo = req.body;
  if (newTodo.title && newTodo.household) {
    // TODO: Confirm that the household id is valid?
    Todos.insert(newTodo)
      .then(todo => {
        res.status(200).json(todo);
      })
      .catch(err => {
        next(err);
      });
  } else {
    res
      .status(400)
      .json({ message: "Required properties missing from new todo." });
  }
});

router.put("/:id", (req, res, next) => {
  const updates = req.body;
  Todos.update(req.params.id, updates)
    .then(todo => {
      res.status(200).json(todo);
    })
    .catch(err => {
      next(err);
    });
});

router.delete("/:id", (req, res, next) => {
  Todos.remove(req.params.id)
    .then(removed => {
      res.status(200).json({ message: `${removed} todo removed` });
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
