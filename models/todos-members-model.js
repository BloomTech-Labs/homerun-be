const db = require("../data/dbConfig.js");

const insert = (todo_id, member_id) => {
  return db("todos_members")
    .insert({todo_id, member_id}, "id")
    .then(id => {
      return findById(id[0]);
    });
};

const remove = (todoId, memberId) => {
  return db("todos_members")
    .where({ id })
    .del();
};

module.exports {
  insert,
  update,
  remove
}