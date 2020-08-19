const router = require('express').Router();
const Categories = require('../models/todos-categories-model.js');
const Todos = require('../models/todos-model.js');

// adds a new category for the todo id that is passed in

router.get('/:id', async (req, res) => {
  const todoCategories = await Categories.findTodoCategories(req.params.id);
  if (todoCategories) {
    res.status(200).json({ categories: todoCategories });
  }
});

router.post('/', validateID, (req, res) => {
  const { todo_id, category_id } = req.body;
  Categories.insert(todo_id, category_id)
    .then((categories) => {
      res.status(201).json(categories);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// find out why this delete is erroring
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  Categories.remove(id)
    .then((categories) => {
      res.json(categories);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// two todo ids here so that we can validate the different requests above without needing
// to create a whole new validate function, this way if the first id isnt valid that is coming from params
// then it will use the second one which is coming from the body
function validateID(req, res, next) {
  const { todoID } = req.params;
  const { todo_id } = req.body;
  Todos.findById(todoID || todo_id)
    .then((todo) => {
      todo
        ? next()
        : res.status(404).json({
            message: `No todo with id of ${
              todoID || todo_id
            } found in the database.`,
          });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

module.exports = router;
