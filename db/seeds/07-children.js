exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE children RESTART IDENTITY CASCADE');
  return knex('children').then(() => {
    // Inserts seed entries
    return knex('children').insert([
      {
        household_id: 'a12345',
        username: 'Sally',
        points: 25,
      },
      {
        household_id: 'a12345',
        username: 'Bobby',
        points: 60,
      },
    ]);
  });
};
