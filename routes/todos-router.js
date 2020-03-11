const router = require("express").Router();
const Todos = require("../models/todos-model.js");
const TodosMembers = require("../models/todos-members-model.js");

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

router.post("/assign/:id", async (req, res, next) => {
  if (req.body.member_ids) {
    await req.body.member_ids.forEach(id => {
      try {
        TodosMembers.insert(req.params.id, id);
      } catch (e) {
        res.status(500).json({ error: e.message });
      }
    });
    res.status(200).json("success");
  } else {
    res.status(400).json({ message: "Required assignment arguments missing." });
  }
});

router.post("/unassign", (req, res, next) => {});

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
