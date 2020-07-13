const db = require('../db/dbConfig.js');

const insert = (confirmation) => {
  return db('confirmations')
    .insert(confirmation, "*")
    .then(([hash]) => hash);
};

const getByHash = (hash) => {
  return db('confirmations').where({ hash }).first();
};

const remove = (email) => {
  return db('confirmations').where({ email }).del();
};

module.exports = {
  insert,
  getByHash,
  remove,
};
