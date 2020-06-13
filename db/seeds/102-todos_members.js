exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('todos_members')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('todos_members').insert([
        {
          member_id: 1,
          todo_id: 2,
        },
        {
          member_id: 2,
          todo_id: 3,
        },
        {
          member_id: 2,
          todo_id: 5,
        },
      ]);
    });
};
