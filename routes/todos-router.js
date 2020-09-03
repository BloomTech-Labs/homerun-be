/* eslint-disable no-unused-vars */
const router = require('express').Router();
const Todos = require('../models/todos-model.js');
const Categories = require('../models/todos-categories-model.js');
const categoriesRouter = require('./todos-categories-router.js');
const { canAssign, canEdit } = require('../middleware/permissions.js');
const TodosMembers = require('../models/todos-members-model.js');

router.get('/household', async (req, res) => {
  const householdId = req.member.current_household;
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

router.post('/assign/:id', (req, res, next) => {
  let member_id = req.body.id;
  let todo_id = req.params.id;
  canAssign(req.member, member_id).then((can) => {
    if (can) {
      TodosMembers.insert({ member_id, todo_id })
        .then(() => {
          Todos.findMembersAssigned(todo_id).then((assigned) => {
            res.status(200).json(assigned);
          });
        })
        .catch(() => {
          res.status(500).json({ error: 'Could not assign member to todo' });
        });
    } else {
      res.status(401).json({
        error:
          'the user does not have the permissions required to assign this member',
      });
    }
  });
});

router.post('/unassign/:id', (req, res, next) => {
  let member_id = req.body.id;
  let todo_id = req.params.id;
  canAssign(req.member, member_id).then((can) => {
    if (can) {
      TodosMembers.remove({ member_id, todo_id })
        .then(() => {
          Todos.findMembersAssigned(todo_id).then((assigned) => {
            res.status(200).json(assigned);
          });
        })
        .catch(() => {
          res.status(500).json({ error: 'Could not unassign member to todo' });
        });
    } else {
      res.status(401).json({
        error:
          'the user does not have the permissions required to unassign this member',
      });
    }
  });
});

router.get('/assigned/:id', async (req, res, next) => {
  try {
    const assigned = await Todos.findMembersAssigned(req.params.id);
    res.status(200).json(assigned);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/add', (req, res) => {
  const { title, category_id, due } = req.body;
  const { current_household, id } = req.member;
  if (title) {
    Todos.insert({ title, due, household: current_household, created_by: id })
      .then(async (todo) => {
        if (category_id) {
          try {
            await Categories.insert(todo.id, category_id);
          } catch (e) {
            console.log(e);
          }
        }

        let categories = await Categories.findTodoCategories(todo.id);
        res.status(200).json({ ...todo, assigned: [], categories });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: 'Error inserting todo into database' });
      });
  } else {
    res.status(400).json({
      message: "Required property 'title' missing from new todo.",
    });
  }
});

router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const updates = req.body;
  canEdit(req.member, id).then((can) => {
    if (can) {
      Todos.update(id, updates)
        .then(async (todo) => {
          const assigned = await Todos.findMembersAssigned(todo.id);
          const todoCategories = await Categories.findTodoCategories(todo.id);

          res
            .status(200)
            .json({ ...todo, assigned, categories: todoCategories });
        })
        .catch((err) => {
          next(err);
        });
    } else {
      res.status(401).json({
        error: 'the user does not have the permissions required to edit todos',
      });
    }
  });
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  const householdId = req.member.current_household;
  canEdit(req.member, id).then((can) => {
    if (can) {
      Todos.remove(req.params.id, householdId)
        .then(async (householdTodos) => {
          const allTodos = await Promise.all(
            householdTodos.map(async (todo) => {
              const assigned = await Todos.findMembersAssigned(todo.id);
              const todoCategories = await Categories.findTodoCategories(
                todo.id
              );
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
          console.log(err);
        });
    } else {
      res.status(401).json({
        error:
          'the user does not have the permissions required to delete todos',
      });
    }
  });
});

// sub routers - rather than pile even more code in todos-router i just decided
// to make categories routes have their own router file - since
// categories-router will be a sub route of todos-router all routes inside it will
// need to be prepended with '/todos'
router.use('/categories', categoriesRouter);

module.exports = router;
