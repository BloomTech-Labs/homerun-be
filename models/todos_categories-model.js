const db = require('../db/dbConfig.js');

// getAllCategories
const findCategories = (household_id) => {
  return db('category').select('*').where({ household_id });
};

const findTodoCategories = (todo_id) => {
  return todo_id;

  // return db('todo_categories')
  //   .join('category', 'todo_categories.category_id', 'category.id')
  //   .select('category.category_name')
  //   .where({ todo_id: todoId })
  //   .then((res) => {
  //     const categories = res.map((category) => {
  //       return category.category_name;
  //     });
  //     return categories;
  //   });
};

// add new todo_categories by todo id and category id
const addTodoCategories = (todo_id, category_id) => {
  return db('todo_categories')
    .insert({ todo_id, category_id })
    .then(() => {
      // return findTodoCategories(todo_id);
      return { message: 'success' };
    });
};

// remove existing todo_categories by todo id and category id
const removeTodoCategories = (todo_id, category_name) => {
  return db('todo_categories')
    .where({ todo_id, category_name })
    .del()
    .then(() => {
      return findTodoCategories(todo_id);
    });
};

module.exports = {
  findCategories,
  findTodoCategories,
  addTodoCategories,
  removeTodoCategories,
};
