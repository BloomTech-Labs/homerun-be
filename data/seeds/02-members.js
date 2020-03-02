exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex.raw("TRUNCATE TABLE members RESTART IDENTITY CASCADE");
  return knex("members").then(() => {
    // Inserts seed entries
    return knex("members").insert([
      {
        current_household: "a12345",
        username: "test",
        email: "test1@test.com",
        password: "test1234",
        provider: 'email',
        access_token: '123456',
        refresh_token: '123456',
        child: false,
        points: 25
      },
      {
        current_household: "a12345",
        username: "sample",
        email: "test2@test.com",
        password: "test1234",
        provider: 'email',
        access_token: '123456',
        refresh_token: '123456',
        child: true,
        points: 40
      }
    ]);
  });
};
