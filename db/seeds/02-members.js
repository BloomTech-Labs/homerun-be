const bcrypt = require('bcryptjs');

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE members RESTART IDENTITY CASCADE');
  return knex('members').then(() => {
    // Inserts seed entries
    return knex('members').insert([
      {
        current_household: 'a12345',
        username: 'Mom',
        email: 'mom@test.com',
        password: bcrypt.hashSync('test1234', 14),
        provider: 'email',
        access_token: '',
        refresh_token: '',
        points: 25,
        active: true,
        child: false,
      },
      {
        current_household: 'a12345',
        username: 'Dad',
        email: 'dad@test.com',
        password: bcrypt.hashSync('test1234', 14),
        provider: 'email',
        access_token: '',
        refresh_token: '',
        points: 40,
        active: true,
        child: false,
      },
    ]);
  });
};
