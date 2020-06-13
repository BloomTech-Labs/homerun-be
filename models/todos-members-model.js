const db = require('../db/dbConfig.js');

const insert = async (todo_member) => {
  try {
    let inserted = await db('todos_members')
      .insert(todo_member)
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

const remove = async (todo_member) => {
  return db('todos_members')
    .where(todo_member)
    .del()
    .catch((err) => console.log(err));
};

module.exports = {
  insert,
  remove,
};
