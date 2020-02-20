
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('household_todos').truncate()
    .then(() => {
      // Inserts seed entries
      return knex('household_todos').insert([
        {
          id: 1,
          household_id: 'a12345',
          todos_id: 1,
        },
        {
          id: 2,
          household_id: 'a12345',
          todos_id: 2,
        },
        {
          id: 3,
          household_id: 'a12345',
          todos_id: 3,
        },
        {
          id: 4,
          household_id: 'a12345',
          todos_id: 4,
        },
        {
          id: 5,
          household_id: 'b12345',
          todos_id: 5,
        },
      ]);
    });
};