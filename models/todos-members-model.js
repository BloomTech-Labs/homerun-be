const db = require("../data/dbConfig.js");

const insert = (todos_id, members_id) => {
  return db("todos_members")
    .insert(
      { todos_id, members_id },
      "*"
    )
    // .then(todos_id => {
    //   return getByTodosId(todos_id);
    // });
};

const remove = (todoId, memberId) => {
  return db("todos_members")
    .where({ id })
    .del();
};

module.exports = {
  insert,
  remove
};

{
  id: 1,
  name: "parent"
}

{
  id: 1,
  name: "child"
}

{
  id: 22,
  title: "todo"
}

composite (unique string)