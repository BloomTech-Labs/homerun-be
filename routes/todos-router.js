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
      todosPerHousehold.map(async (todo) => {
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
  const id = req.params.id;
  const user = req.body;

  if (user.type === "child") {
    try {
      await TodosChildren.insert({ child_id: user.id, todo_id: id });
    } catch (e) {
      console.log(e);
    }
  } else {
    try {
      await TodosMembers.insert({ member_id: user.id, todo_id: id });
    } catch (e) {
      console.log(e);
    }
  }

  const membersAssigned = await Todos.findMembersAssigned(id);
  const childrenAssigned = await Todos.findChildrenAssigned(id);
  const allAssigned = membersAssigned.concat(childrenAssigned);

  res.status(200).json(allAssigned);
});

router.post("/unassign/:id", async (req, res, next) => {
  const id = req.params.id;
  const user = req.body;

  if (user.type === "child") {
    try {
      await TodosChildren.remove({ child_id: user.id, todo_id: id });
    } catch (e) {
      console.log(e);
    }
  } else {
    try {
      await TodosMembers.remove({ member_id: user.id, todo_id: id });
    } catch (e) {
      console.log(e);
    }
  }

  const membersAssigned = await Todos.findMembersAssigned(id);
  const childrenAssigned = await Todos.findChildrenAssigned(id);
  const allAssigned = membersAssigned.concat(childrenAssigned);

  res.status(200).json(allAssigned);
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
      .then((todo) => {
        res.status(200).json(todo);
      })
      .catch((err) => {
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
    .then((todo) => {
      res.status(200).json(todo);
    })
    .catch((err) => {
      next(err);
    });
});

// deletes the todo and sends the remaining todos back in the json response
router.delete("/:id", (req, res, next) => {
  const householdId = req.decodedToken.current_household;
  Todos.remove(req.params.id, householdId)
    .then((householdTodos) => {
      res.status(200).json(householdTodos);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
