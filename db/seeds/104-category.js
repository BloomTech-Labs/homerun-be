exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('category')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('category').insert([
        { category_name: 'living_room', household_id: 'a12345' },
        { category_name: 'bedroom', household_id: 'a12345' },
        { category_name: 'kitchen', household_id: 'a12345' },
        { category_name: 'bathroom', household_id: 'a12345' },
      ]);
    });
};
