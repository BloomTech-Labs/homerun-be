exports.seed = async function (knex) {
  await knex.raw('TRUNCATE TABLE todos_members RESTART IDENTITY CASCADE');

  return knex('todos_members')
    .truncate()
    .then(() => {
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
