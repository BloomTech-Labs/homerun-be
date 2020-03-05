exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("children")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("children").insert([
        {
          household_id: "a12345",
          username: "Lil Suzie",
          child: true,
          points: 25
        },
        {
          household_id: "a12345",
          username: "Lil Debbie",
          child: true,
          points: 60
        },
        {
          household_id: "a12345",
          username: "Lil Wayne",
          child: true,
          points: 455
        },
      ]);
    });
};
