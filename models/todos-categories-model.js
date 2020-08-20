const db = require('../db/dbConfig.js');

const findTodoCategories = async (todoId) => {
  const res = await db('todo_categories')
    .join('category', 'todo_categories.category_id', 'category.id')
    .select('category.category_name')
    .where({ todo_id: todoId });
  const categories = res.map((category) => {
    return category.category_name;
  });
  return categories;
};

const insert = async (todo_id, category_id) => {
  await db('todo_categories').insert({ todo_id, category_id });
  return { message: 'success' };
};

const remove = async (id) => {
  try {
    const res = await db('todo_categories').where({ id }).del();
    return { message: 'success', res };
  } catch (err) {
    return console.error(err);
  }
};

module.exports = {
  findTodoCategories,
  insert,
  remove,
};
