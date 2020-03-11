const db = require("../data/dbConfig.js");

const insert = children => {
  return db("todos_children").insert(children, "*");
};

const remove = children => {
  const pkeys = children.map(c => {
    return `${c.child_id}${c.todo_id}`;
  });
  console.log(pkeys);
  return db("todos_children")
    .whereIn("todos_children_pkey", pkeys)
    .del();
};

module.exports = {
  insert,
  remove
};
