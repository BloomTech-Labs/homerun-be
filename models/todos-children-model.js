const db = require("../data/dbConfig.js");

const insert = children => {
  return db("todos_children").insert(children, "*");
};

const remove = (todo_id, child_id) => {
  return db("todos_children")
    .where({ id })
    .del();
};

module.exports = {
  insert,
  remove
};
