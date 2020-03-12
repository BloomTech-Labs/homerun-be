const db = require("../data/dbConfig.js");

const insert = members => {
  return db("todos_members")
    .insert(members, "*")
    .catch(err => console.log(err));
};

const remove = members => {
  const promises = members.map(m => {
    return db("todos_members")
      .where({ todo_id: m.todo_id, member_id: m.member_id })
      .del();
  });
  return Promise.all(promises)
    .then(values => {
      return values.reduce((total, current) => total + current);
    })
    .catch(err => console.log(err));
};

module.exports = {
  insert,
  remove
};
