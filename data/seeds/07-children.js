exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("children")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("children").insert([
        {
          household_id: "a12345",
          name: "Lil Suzie",
          points: 25
        },
        {
          household_id: "a12345",
          name: "Lil Debbie",
          points: 60
        },
      ]);
    });
};
