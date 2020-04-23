
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('todo_categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('todo_categories').insert([
        { 
          todo_id: 1,
          category_name: "living_room"
        },
        { 
          todo_id: 2,
          category_name: "living_room"
        },
        { 
          todo_id: 3,
          category_name: "bedroom"
        },
        { 
          todo_id: 4,
          category_name: "kitchen"
        },
      ]);
    });
};
