

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('members').del()
    .then(() => {
      // Inserts seed entries
      return knex('members').insert([
        {
          id: 1,
          current_household: 'a12345',
          username: 'test',
          email: "test@test.com",
          password: "test1234",
          token: "examplegoogletoken",
          child: false,
          points: 25
        },
        {
          id: 2,
          current_household: 'a12345',
          username: 'sample',
          email: "test@test.com",
          password: "test1234",
          token: "examplegoogletoken",
          child: true,
          points: 40
        },
      ]);
    });
};
