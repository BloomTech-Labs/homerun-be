exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('todo_categories')
    .del()
    .then(function () {
      // Inserts seed entries
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
