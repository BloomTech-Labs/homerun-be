const router = require("express").Router();
const Todos = require("../models/todos-model.js");

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

router.post("/update/:id", (req, res, next) => {
  const updates = req.body;
  Todos.update(req.params.id, updates)
    .then(todo => {
      res.status(200).json(todo);
    })
    .catch(err => {
      next(err);
    });
});

router.post("/remove/:id", (req, res, next) => {
  Todos.remove(req.params.id)
    .then(removed => {
      res.status(200).json({ message: `${removed} todo removed` });
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
