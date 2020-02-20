
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('members').truncate()
    .then(() => {
      // Inserts seed entries
      return knex('members').insert([
        {
          id: 1,
          username: 'test',
          email: "test@test.com",
          password: "test1234",
          token: "examplegoogletoken",
          current_household: 'a12345',
          child: false,
          points: 25
        },
        {
          id: 2,
          username: 'sample',
          email: "test@test.com",
          password: "test1234",
          token: "examplegoogletoken",
          current_household: 'a12345',
          child: true,
          points: 40
        },
      ]);
    });
};
