const db = require("../data/dbConfig.js");
const Todos = require("./todos-model.js");

const insert = async (members) => {
  try {
    let inserted = await db
      .raw(
        db("todos_members").insert(members).toString() +
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
