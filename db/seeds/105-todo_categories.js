exports.seed = async function (knex) {
  await knex.raw('TRUNCATE TABLE todo_categories RESTART IDENTITY CASCADE');

  return knex('todo_categories').then(function () {
    return knex('todo_categories').insert([
      {
        todo_id: 1,
        category_id: 2,
      },
      {
        todo_id: 2,
        category_id: 3,
      },
      {
        todo_id: 3,
        category_id: 1,
      },
      {
        todo_id: 4,
        category_id: 4,
      },
    ]);
  });
};
