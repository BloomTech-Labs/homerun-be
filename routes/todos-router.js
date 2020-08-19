/* eslint-disable no-unused-vars */
const router = require('express').Router();
const Todos = require('../models/todos-model.js');

const Categories = require('../models/categories-model.js');
const categoriesRouter = require('./categories-router.js');

const userTypeFilter = require('../middleware/userMethodFilter.js');

router.get('/household', async (req, res) => {
  const householdId = req.member.current_household;
  // try {
  const todosPerHousehold = await Todos.findTodosPerHousehold(householdId);
  const allTodos = await Promise.all(
    todosPerHousehold.map(async (todo) => {
      // findTodoCategories should return an array with all the categories the todo belongs to
      const todoCategories = await Categories.findTodoCategories(todo.id);
      const assigned = await Todos.findMembersAssigned(todo.id);
      return { ...todo, assigned, categories: todoCategories };
    })
  );
  res.status(200).json(allTodos);
});

router.get('/member', async (req, res) => {
  const householdId = req.member.current_household;
  const memberId = req.member.id;
  try {
    const todosByMember = await Todos.findTodosByMember(householdId, memberId);
    const allTodos = await Promise.all(
      todosByMember.map(async (todo) => {
        const todoCategories = await Categories.findTodoCategories(todo.id);
        const assigned = await Todos.findMembersAssigned(todo.id);
        return { ...todo, assigned, categories: todoCategories };
      })
    );
    res.status(200).json(allTodos);
  } catch (err) {
    res
      .status(500)
      .json({ error: err.message, location: 'todos-router.js 18' });
  }
});

router.post('/assign/:id', userTypeFilter, async (req, res, next) => {
  const id = req.params.id;
  const assigned = await Todos.findMembersAssigned(id);
  res.status(200).json(assigned);
});

router.post('/unassign/:id', userTypeFilter, async (req, res, next) => {
  const id = req.params.id;
  const assigned = await Todos.findMembersAssigned(id);
  res.status(200).json(assigned);
});

router.get('/assigned/:id', async (req, res, next) => {
  try {
    const assigned = await Todos.findMembersAssigned(req.params.id);
    res.status(200).json(assigned);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/add', (req, res, next) => {
  const newTodo = req.body;
  newTodo.household = req.member.current_household;
  if (newTodo.title && newTodo.household) {
    // TODO: Confirm that the household id is valid?
    Todos.insert(newTodo)
      .then((todo) => {
        Categories.findTodoCategories(todo.id).then((categories) => {
          res.status(200).json({ ...todo, assigned: [], categories });
        });
      })
      .catch((err) => {
        next(err);
      });
  } else {
    res
      .status(400)
      .json({ message: 'Required properties missing from new todo.' });
  }
});

router.put('/:id', (req, res, next) => {
  const updates = req.body;
  Todos.update(req.params.id, updates)
    .then(async (todo) => {
      const assigned = await Todos.findMembersAssigned(todo.id);
      const todoCategories = await Categories.findTodoCategories(todo.id);

      res.status(200).json({ ...todo, assigned, categories: todoCategories });
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/:id', (req, res, next) => {
  const householdId = req.member.current_household;
  Todos.remove(req.params.id, householdId)
    .then(async (householdTodos) => {
      const allTodos = await Promise.all(
        householdTodos.map(async (todo) => {
          const assigned = await Todos.findMembersAssigned(todo.id);
          const todoCategories = await Categories.findTodoCategories(todo.id);
          return {
            ...todo,
            assigned,
            categories: todoCategories,
          };
        })
      );
      res.status(200).json(allTodos);
    })
    .catch((err) => {
      next(err);
    });
});

// sub routers - rather than pile even more code in todos-router i just decided
// to make categories routes have their own router file - since
// categories-router will be a sub route of todos-router all routes inside it will
// need to be prepended with '/todos'
router.use('/categories', categoriesRouter);

module.exports = router;
