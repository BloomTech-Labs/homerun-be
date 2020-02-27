exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("households")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("households").insert([
        {
          id: "a12345",
          title: "Test's House",
          pin: 1234
        },
        {
          id: "b12345",
          title: "Samples' House",
          pin: 1234
        }
      ]);
    });
};
