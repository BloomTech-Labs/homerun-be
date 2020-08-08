const db = require('../db/dbConfig.js');

const findById = (id) => {
  return db('households').where({ id }).first();
};

const insert = (newHousehold) => {
  return db('households')
    .insert(newHousehold, 'id')
    .then((id) => {
      return findById(id[0]);
    });
};

const update = (id, updates) => {
  return db('households')
    .update(updates)
    .then(() => {
      return findById(id);
    });
};

const remove = (id) => {
  return db('households').where({ id }).del();
};

module.exports = {
  findById,
  insert,
  update,
  remove,
};
