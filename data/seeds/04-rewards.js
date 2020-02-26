exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("rewards")
    .truncate()
    .then(() => {
      // Inserts seed entries
      return knex("rewards").insert([
        {
          id: 1,
          household_id: "a12345",
          title: "Ice Cream Party",
          point_total: 30
        },
        {
          id: 2,
          household_id: "a12345",
          title: "Pizza and Sleepover",
          point_total: 125
        },
        {
          id: 3,
          household_id: "a12345",
          title: "Chore Pass",
          point_total: 15
        },
        {
          id: 4,
          household_id: "a12345",
          title: "New Lego Kit",
          point_total: 90
        }
      ]);
    });
};
