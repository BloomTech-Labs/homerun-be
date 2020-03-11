const db = require("../data/dbConfig.js");

const insert = members => {
  return db("todos_members").insert(members, "*");
};

const remove = (todo_id, member_id) => {
  return db("todos_members")
    .where({ id })
    .del();
};

module.exports = {
  insert,
  remove
};
