const db = require("../data/dbConfig.js");

// ? Grabbing all todos per household
// ? Accepts a variable for household id

// select todos.*  from households
// inner join households_todos on households.id = households_todos.households_id and households.id = 'a12345'
// inner join todos on households_todos.todos_id = todos.id

const findTodosPerHousehold = householdId => {
  return db("todos")
    .select("*")
    .where("household", householdId);
};

// ? Grabbing all todos per user
// ? Accepts a variable for user id and household id

// select * from todos
// inner join todos_members on todos_members.todos_id = todos.id
// and todos_members.members_id = '2'
// where todos.household = 'a12345'

const findTodosByMember = (householdId, memberId) => {
  return db("todos")
    .select("*")
    .innerJoin("todos_members", function() {
      this.on("todos_members.todo_id", "=", "todos.id").andOn(
        "todos_members.member_id",
        "=",
        Number(memberId)
      );
    })
    .where("todos.household", householdId);
};

const findById = id => {
  return db("todos")
    .where({ id })
    .first();
};

const findMembersAssigned = todo_id => {
  return db("members")
    .join("todos_members", "members.id", "=", "todos_members.member_id")
    .where({ todo_id: todo_id })
    .select("username", "child", "points");
};

const findChildrenAssigned = todo_id => {
  return db("children")
    .join("todos_children", "children.id", "=", "todos_children.child_id")
    .where({ todo_id: todo_id })
    .select("username", "child", "points");
};

const insert = newTodo => {
  return db("todos")
    .insert(newTodo, "id")
    .then(id => {
      return findById(id[0]);
    });
};

const update = (id, updates) => {
  return db("todos")
    .where({ id })
    .update(updates)
    .then(num => {
      return findById(id);
    });
};

const remove = (todoID, householdId) => {
    return db("todos")
          .where({ id: todoID })
          .del()
          .then(res => {
            return findTodosPerHousehold(householdId)
          })

};

module.exports = {
  findTodosPerHousehold,
  findTodosByMember,
  findMembersAssigned,
  findChildrenAssigned,
  findById,
  insert,
  update,
  remove
};
