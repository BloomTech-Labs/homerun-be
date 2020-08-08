const db = require('../db/dbConfig.js');

const findById = (id) => {
  return db('category').select('*').where({ id });
};

const findByHousehold = (household_id) => {
  return db('category')
    .select('*')
    .where({ household_id })
    .then((res) => res)
    .catch((err) => err);
};

const insert = (category_name, household_id) => {
  return db('category')
    .insert({ category_name, household_id })
    .then(() => findByHousehold({ household_id }))
    .catch((err) => console.error(err));
};

const update = (id, data) => {
  return db('category')
    .where({ id })
    .update(data)
    .then(() => {
      return findById(id);
    })
    .catch((err) => console.error(err));
};

const remove = (id) => {
  return db('category').where({ id }).del();
};

module.exports = {
  findById,
  findByHousehold,
  insert,
  update,
  remove,
};
