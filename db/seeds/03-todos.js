const dayjs = require('dayjs');

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE todos RESTART IDENTITY CASCADE');
  return knex('todos').then(() => {
    // Inserts seed entries
    return knex('todos').insert([
      {
        household: 'a12345',
        title: 'Straighten up your room',
        desc:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi sit sint illum voluptatibus voluptatum quia?',
        point_value: 20,
        due: dayjs()
          .add(Math.random() * 10, 'day')
          .unix(),
        completed: false,
        completed_by: '',
      },
      {
        household: 'a12345',
        title: 'Do the dishes',
        desc:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi sit sint illum voluptatibus voluptatum quia?',
        point_value: 125,
        due: dayjs()
          .add(Math.random() * 10, 'day')
          .unix(),
        completed: false,
        completed_by: '',
      },
      {
        household: 'a12345',
        title: 'Vacuum the living room',
        desc:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi sit sint illum voluptatibus voluptatum quia?',
        point_value: 40,
        due: dayjs()
          .add(Math.random() * 10, 'day')
          .unix(),
        completed: false,
        completed_by: 'Sample',
      },
      {
        household: 'a12345',
        title: 'Scrub the shower',
        desc:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi sit sint illum voluptatibus voluptatum quia?',
        point_value: 0,
        due: dayjs().unix(),
        completed: false,
        completed_by: '',
      },
      {
        household: 'a12345',
        title: 'Walk the dog',
        desc:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi sit sint illum voluptatibus voluptatum quia?',
        point_value: 25,
        due: dayjs()
          .add(Math.random() * 10, 'day')
          .unix(),
        completed: true,
        completed_by: 'Test',
      },
    ]);
  });
};
