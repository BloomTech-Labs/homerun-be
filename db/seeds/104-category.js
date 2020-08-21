exports.seed = async function (knex) {
  await knex.raw('TRUNCATE TABLE category RESTART IDENTITY CASCADE');

  return knex('category').then(function () {
    return knex('category').insert([
      { category_name: 'Living Room', household_id: 'a12345' },
      { category_name: 'Bedroom', household_id: 'a12345' },
      { category_name: 'Kitchen', household_id: 'a12345' },
      { category_name: 'Bathroom', household_id: 'a12345' },
    ]);
  });
