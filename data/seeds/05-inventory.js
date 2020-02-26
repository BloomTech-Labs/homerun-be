exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("inventory")
    .truncate()
    .then(() => {
      // Inserts seed entries
      return knex("inventory").insert([
        {
          id: 1,
          household_id: "a12345"
        },
        {
          id: 2,
          household_id: "b12345"
        }
      ]);
    });
};
