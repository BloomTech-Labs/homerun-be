exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("todos_members")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("todos_members").insert([
        {
          members_id: 1,
          todos_id: 1
        },
        {
          members_id: 1,
          todos_id: 2
        },
        {
          members_id: 2,
          todos_id: 2
        },
        {
          members_id: 2,
          todos_id: 4
        },
        {
          members_id: 1,
          todos_id: 5
        },
        {
          members_id: 2,
          todos_id: 5
        }
      ]);
    });
};
