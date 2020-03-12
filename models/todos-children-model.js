const db = require("../data/dbConfig.js");

const insert = children => {
  return db("todos_children")
    .insert(children, "*")
    .catch(err => console.log(err));
};

const remove = children => {
  const promises = children.map(c => {
    return db("todos_children")
      .where({ todo_id: c.todo_id, child_id: c.child_id })
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
