
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('category').del()
    .then(function () {
      // Inserts seed entries
      return knex('category').insert([
        {id: 1, category_name: 'living_room'},
        {id: 2, category_name: 'bedroom'},
        {id: 3, category_name: 'kitchen'},
        {id: 4, category_name: 'bathroom'}
      ]);
    });
};
