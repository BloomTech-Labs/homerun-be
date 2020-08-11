const db = require('../db/dbConfig.js');

const findTodoCategories = (todoId) => {
  return db('todo_categories')
    .join('category', 'todo_categories.category_id', 'category.id')
    .select('category.category_name')
    .where({ todo_id: todoId })
    .then((res) => {
      const categories = res.map((category) => {
        return category.category_name;
      });
      return categories;
    });
};

const insert = async (todo_id, category_id) => {
  await db('todo_categories').insert({ todo_id, category_id });
  return { message: 'success' };
};

const remove = async (id) => {
  return db('todo_categories')
    .where({ id })
    .del()
    .then((res) => {
      return { message: 'success' };
    })
    .catch((err) => console.error(err));
};

module.exports = {
  findTodoCategories,
  insert,
  remove,
};
