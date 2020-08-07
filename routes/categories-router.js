const router = require('express').Router();
const Categories = require('../models/categories-model.js');
const Todos = require('../models/todos-model.js');

// returns all the categories that todos can be a part of
router.get('/', (req, res) => {
  Categories.findCategories()
    .then((categories) => {
      res.json(categories);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// return the categories that belong to the specific todo id
router.get('/:todoID', validateID, (req, res) => {
  const { todoID } = req.params;
  Categories.findTodoCategories(todoID)
    .then((categories) => {
      res.json(categories);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/new', (req, res) => {
  const { category_name } = req.body;
  Categories.addCategory(category_name)
    .then((categories) => {
      res.status(201).json(categories);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// adds a new category for the todo id that is passed in
router.post('/', validateID, (req, res) => {
  const { todo_id, category_name } = req.body;
  Categories.addTodoCategories(todo_id, category_name)
    .then((categories) => {
      res.status(201).json(categories);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// find out why this delete is erroring
router.delete('/delete', validateID, (req, res) => {
  const { todo_id, category_name } = req.body;
  Categories.removeTodoCategories(todo_id, category_name)
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
