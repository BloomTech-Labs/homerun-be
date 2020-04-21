exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("todos_children")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("todos_children").insert([
        {
          todo_id: 1,
          child_id: 1
        },
        {
          todo_id: 2,
          child_id: 1
        },
        {
          todo_id: 4,
          child_id: 1
        },
        {
          todo_id: 5,
          child_id: 1
        }
      ]);
    });
};
