
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('household_members').del()
    .then(() => {
      // Inserts seed entries
      return knex('household_members').insert([
        {
          id: 1,
          member_id: 1,
          household_id: 'a12345',
        },
        {
          id: 2,
          member_id: 2,
          household_id: 'a12345',
        },
      ]);
    });
};