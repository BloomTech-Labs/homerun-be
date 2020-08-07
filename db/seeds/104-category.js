exports.seed = async function (knex) {
  await knex.raw('TRUNCATE TABLE category RESTART IDENTITY CASCADE');

  return knex('category').then(function () {
    return knex('category').insert([
      { category_name: 'living_room', household_id: 'a12345' },
      { category_name: 'bedroom', household_id: 'a12345' },
      { category_name: 'kitchen', household_id: 'a12345' },
      { category_name: 'bathroom', household_id: 'a12345' },
    ]);
  });
};
