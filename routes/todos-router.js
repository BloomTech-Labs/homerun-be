/* eslint-disable no-unused-vars */
const router = require('express').Router();
const Todos = require('../models/todos-model.js');

const Categories = require('../models/todos-categories-model.js');
const categoriesRouter = require('./todos-categories-router.js');

const userTypeFilter = require('../middleware/userMethodFilter.js');

const getAssignedUsers = async (todoId) => {
  const membersAssigned = await Todos.findMembersAssigned(todoId);
  const childrenAssigned = await Todos.findChildrenAssigned(todoId);
  return membersAssigned.concat(childrenAssigned);
};

router.get('/household', async (req, res) => {
  const householdId = req.decodedToken.current_household;
  // try {
  const todosPerHousehold = await Todos.findTodosPerHousehold(householdId);
  const allTodos = await Promise.all(
    todosPerHousehold.map(async (todo) => {
      // findTodoCategories should return an array with all the categories the todo belongs to
      const todoCategories = await Categories.findTodoCategories(todo.id);
      const assigned = await getAssignedUsers(todo.id);
      return { ...todo, assigned, categories: todoCategories };
    })
  );
  res.status(200).json(allTodos);
});

router.get('/member', async (req, res) => {
  const householdId = req.decodedToken.current_household;
  const memberId = req.decodedToken.subject;
  try {
    const todosByMember = await Todos.findTodosByMember(householdId, memberId);
    const allTodos = await Promise.all(
      todosByMember.map(async (todo) => {
        const todoCategories = await Categories.findTodoCategories(todo.id);
        const assigned = await getAssignedUsers(todo.id);
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

router.get('/child/:id', async (req, res) => {
  const householdId = req.decodedToken.current_household;
  const childId = req.params.id;
  if (childId) {
    try {
      const todosByChild = await Todos.findTodosByChild(householdId, childId);
      const allTodos = await Promise.all(
        todosByChild.map(async (todo) => {
          const todoCategories = await Categories.findTodoCategories(todo.id);
          const assigned = await getAssignedUsers(todo.id);

          return {
            ...todo,
            assigned,
            categories: todoCategories,
          };
        })
      );
      res.status(200).json(allTodos);
    } catch (err) {
      res
        .status(500)
        .json({ error: err.message, location: 'todos-router.js 18' });
    }
  } else {
    res.status(400).json({ message: 'Missing Child ID' });
  }
});

router.post('/assign/:id', userTypeFilter, async (req, res, next) => {
  const id = req.params.id;
  const assigned = await getAssignedUsers(id);
  res.status(200).json(assigned);
});

router.post('/unassign/:id', userTypeFilter, async (req, res, next) => {
  const id = req.params.id;
  const assigned = await getAssignedUsers(id);
  res.status(200).json(assigned);
});

// Do we use this anywhere?
router.get('/assigned/:id', async (req, res, next) => {
  try {
    const membersAssigned = await Todos.findMembersAssigned(req.params.id);
    const childrenAssigned = await Todos.findChildrenAssigned(req.params.id);
    const assigned = Object.assign(membersAssigned, childrenAssigned);
    console.log(assigned);
    res.status(200).json(assigned);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/add', (req, res, next) => {
  const newTodo = req.body;
  newTodo.household = req.decodedToken.current_household;
  if (newTodo.title && newTodo.household) {
    Todos.insert({ title: newTodo.title, household: newTodo.household })
      .then((todo) => {
        if (newTodo.category_id) {
          Categories.insert(todo.id, newTodo.category_id);
        }

        return todo;
      })
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
      const assigned = await getAssignedUsers(todo.id);
      const todoCategories = await Categories.findTodoCategories(todo.id);

      res.status(200).json({ ...todo, assigned, categories: todoCategories });
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/:id', (req, res, next) => {
  const householdId = req.decodedToken.current_household;
  Todos.remove(req.params.id, householdId)
    .then(async (householdTodos) => {
      const allTodos = await Promise.all(
        householdTodos.map(async (todo) => {
          const assigned = await getAssignedUsers(todo.id);
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
