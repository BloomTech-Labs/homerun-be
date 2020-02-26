exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("todos_members")
    .truncate()
    .then(() => {
      // Inserts seed entries
      return knex("todos_members").insert([
        {
          id: 1,
          members_id: 1,
          todos_id: 1
        },
        {
          id: 2,
          members_id: 1,
          todos_id: 2
        },
        {
          id: 3,
          members_id: 2,
          todos_id: 2
        },
        {
          id: 4,
          members_id: 2,
          todos_id: 4
        },
        {
          id: 5,
          members_id: 1,
          todos_id: 5
        },
        {
          id: 6,
          members_id: 2,
          todos_id: 5
        }
      ]);
    });
};
