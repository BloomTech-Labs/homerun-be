const db = require('../db/dbConfig.js');

const findById = (id) => {
  return db('category').select('*').where({ id });
};

const findByName = (household_id, category_name) => {
  return db('category')
    .select('*')
    .where({ household_id, category_name })
    .first();
};

const findByHousehold = async (household_id) => {
  try {
    const res = await db('category').select('*').where({ household_id });
    return res;
  } catch (err) {
    return err;
  }
};

const insert = async (category_name, household_id) => {
  try {
    await db('category').insert({ category_name, household_id });
    return await findByHousehold(household_id);
  } catch (err) {
    return console.error(err);
  }
};

const update = async (id, data) => {
  try {
    await db('category').where({ id }).update(data);
    return findById(id);
  } catch (err) {
    return console.error(err);
  }
};

const remove = (id) => {
  return db('category').where({ id }).del();
};

module.exports = {
  findById,
  findByHousehold,
  findByName,
  insert,
  update,
  remove,
};
