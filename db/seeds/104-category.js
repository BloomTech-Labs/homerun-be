exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('category')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('category').insert([
        { id: 1, category_name: 'living_room', household_id: 'a12345' },
        { id: 2, category_name: 'bedroom', household_id: 'a12345' },
        { id: 3, category_name: 'kitchen', household_id: 'a12345' },
        { id: 4, category_name: 'bathroom', household_id: 'a12345' },
      ]);
    });
};
