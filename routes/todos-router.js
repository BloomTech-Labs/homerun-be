const router = require("express").Router();
const Todos = require("../models/todos-model.js");
const TodosMembers = require("../models/todos-members-model.js");
const TodosChildren = require("../models/todos-children-model.js");

router.get("/household", async (req, res) => {
  const householdId = req.decodedToken.current_household;
  try {
    const todosPerHousehold = await Todos.findTodosPerHousehold(householdId);
    // map over all todos
    // run findMembers/ChildrenAssigned for each todo
    // append that to each todo
    const allTodos = await Promise.all(
      todosPerHousehold.map(async todo => {
        const membersAssigned = await Todos.findMembersAssigned(todo.id);
        const childrenAssigned = await Todos.findChildrenAssigned(todo.id);
        return { ...todo, assigned: membersAssigned.concat(childrenAssigned) };
      })
    );
    res.status(200).json(allTodos);
  } catch (err) {
    res.status(500).json({ error: err.message, location: "todos-router.js 8" });
  }
});

router.get("/household/member/:memberId", async (req, res) => {
  const householdId = req.decodedToken.current_household;
  try {
    const todosByMember = await Todos.findTodosByMember(
      householdId,
      req.params.memberId
    );
    res.status(200).json(todosByMember);
  } catch (err) {
    res
      .status(500)
      .json({ error: err.message, location: "todos-router.js 18" });
  }
});

router.post("/assign/:id", async (req, res, next) => {
  const todo_id = req.params.id;
  let childrenAssigned = [];
  let membersAssigned = [];

  if (req.body.assignees) {
    const childrenToAssign = req.body.assignees
      .filter(a => a.type === "child")
      .map(c => {
        return { child_id: c.id, todo_id: todo_id };
      });

    const membersToAssign = req.body.assignees
      .filter(a => a.type === "member")
      .map(m => {
        return { member_id: m.id, todo_id: todo_id };
      });

    if (childrenToAssign.length > 0) {
      try {
        childrenAssigned = await TodosChildren.insert(childrenToAssign);
      } catch (e) {
        console.log(e);
      }
    }

    if (membersToAssign.length > 0) {
      try {
        membersAssigned = await TodosMembers.insert(membersToAssign);
      } catch (e) {
        console.log(e);
      }
    }

    const membersCurrentlyAssigned = await Todos.findMembersAssigned(
      req.params.id
    );
    const childrenCurrentlyAssigned = await Todos.findChildrenAssigned(
      req.params.id
    );
    const currentlyAssigned = membersCurrentlyAssigned.concat(
      childrenCurrentlyAssigned
    );
    console.log(currentlyAssigned);
    res.status(200).json(currentlyAssigned);
  } else {
    res.status(400).json({ message: "Required assignment arguments missing." });
  }
});

router.post("/unassign/:id", async (req, res, next) => {
  const todo_id = req.params.id;
  let childrenUnassigned = [];
  let membersUnassigned = [];

  if (req.body.assignees) {
    const childrenToUnassign = req.body.assignees
      .filter(a => a.type === "child")
      .map(c => {
        return { child_id: c.id, todo_id: todo_id };
      });
    const membersToUnassign = req.body.assignees
      .filter(a => a.type === "member")
      .map(m => {
        return { member_id: m.id, todo_id: todo_id };
      });

    if (childrenToUnassign.length > 0) {
      childrenUnassigned = await TodosChildren.remove(childrenToUnassign);
    }

    if (membersToUnassign.length > 0) {
      membersUnassigned = await TodosMembers.remove(membersToUnassign);
    }

    const membersCurrentlyAssigned = await Todos.findMembersAssigned(
      req.params.id
    );
    const childrenCurrentlyAssigned = await Todos.findChildrenAssigned(
      req.params.id
    );
    const currentlyAssigned = membersCurrentlyAssigned.concat(
      childrenCurrentlyAssigned
    );
    res.status(200).json(currentlyAssigned);
  } else {
    res.status(400).json({ message: "Required assignment arguments missing." });
  }
});

router.get("/assigned/:id", async (req, res, next) => {
  try {
    const membersAssigned = await Todos.findMembersAssigned(req.params.id);
    const childrenAssigned = await Todos.findChildrenAssigned(req.params.id);
    const assigned = Object.assign(membersAssigned, childrenAssigned);
    res.status(200).json(assigned);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/add", (req, res, next) => {
  const newTodo = req.body;
  newTodo.household = req.decodedToken.current_household;
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

// deletes the todo and sends the remaining todos back in the json response
router.delete("/:id", (req, res, next) => {
  const householdId = req.decodedToken.current_household;
  Todos.remove(req.params.id, householdId)
    .then(householdTodos => {
      res.status(200).json(householdTodos);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
