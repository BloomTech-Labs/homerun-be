exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("inventory")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("inventory").insert([
        {
          household_id: "a12345"
        },
        {
          household_id: "b12345"
        }
      ]);
    });
};
