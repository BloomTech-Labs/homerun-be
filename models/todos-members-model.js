const db = require("../data/dbConfig.js");

const insert = members => {
  return db("todos_members").insert(members, "*");
};

const remove = members => {
  const pkeys = members.map(m => {
    return `${m.member_id}${m.todo_id}`;
  });
  console.log(pkeys);
  return db("todos_members")
    .whereIn("todos_members_pkey", pkeys)
    .del();
};

module.exports = {
  insert,
  remove
};
