const db = require('../db/dbConfig.js');

const insert = async (todo_child) => {
  try {
    let inserted = await db('todos_children')
      .insert(todo_child)
      .catch((err) => console.log(err));
    if (inserted) {
      return inserted;
    } else {
      return [];
    }
  } catch (e) {
    console.log(e);
  }
};

const remove = async (todo_child) => {
  return db('todos_children')
    .where(todo_child)
    .del()
    .catch((err) => console.log(err));
};

module.exports = {
  insert,
  remove,
};
