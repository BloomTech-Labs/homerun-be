const db = require('../db/dbConfig.js');

const account_insert = (confirmation) => {
  return db('confirmations')
    .insert(confirmation, "*")
    .then(([hash]) => hash);
};

const account_getByHash = (hash) => {
  return db('confirmations').where({ hash }).first();
};

const account_remove = (email) => {
  return db('confirmations').where({ email }).del();
};

const password_insert = (confirmation) => {
  return db('password_confirmations')
    .insert(confirmation, "*")
    .then(([hash]) => hash);
};

const password_getByHash = (hash) => {
  return db('password_confirmations').where({ hash }).first();
};

const password_remove = (email) => {
  return db('password_confirmations').where({ email }).del();
};

module.exports = {
  account: {
    insert: account_insert,
    getByHash: account_getByHash,
    remove: account_remove,
  },
  password: {
    insert: password_insert,
    getByHash: password_getByHash,
    remove: password_remove,
  }
};
