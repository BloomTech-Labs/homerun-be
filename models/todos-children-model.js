const db = require("../data/dbConfig.js");

const insert = async (children) => {
  try {
    let inserted = await db
      .raw(
        db("todos_children").insert(children).toString() +
          ' ON CONFLICT DO NOTHING;'
      )
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
