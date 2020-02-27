exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("rewards")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("rewards").insert([
        {
          household_id: "a12345",
          title: "Ice Cream Party",
          point_total: 30
        },
        {
          household_id: "a12345",
          title: "Pizza and Sleepover",
          point_total: 125
        },
        {
          household_id: "a12345",
          title: "Chore Pass",
          point_total: 15
        },
        {
          household_id: "a12345",
          title: "New Lego Kit",
          point_total: 90
        }
      ]);
    });
};
