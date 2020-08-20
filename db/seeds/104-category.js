exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('category')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('category').insert([
        { id: 1, category_name: 'Living Room' },
        { id: 2, category_name: 'Bedroom' },
        { id: 3, category_name: 'Kitchen' },
        { id: 4, category_name: 'Bathroom' },
      ]);
    });
};
