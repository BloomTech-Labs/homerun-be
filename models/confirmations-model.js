const db = require('../db/dbConfig.js');

const account_insert = (confirmation) => {
  return db('account_confirmations')
    .insert(confirmation, "*")
    .then(([conf]) => conf);
};

const account_getById = id => {
  return db('account_confirmations').where({id}).first()
}

const account_getByEmailAndPin = (email, pin) => {
  return db('account_confirmations').where({ email, pin }).first();
};

const account_remove = (email) => {
  return db('account_confirmations').where({ email }).del();
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
    getbyId: account_getById,
    getByEmailAndPin: account_getByEmailAndPin,
    remove: account_remove,
  },
  password: {
    insert: password_insert,
    getByHash: password_getByHash,
    remove: password_remove,
  }
};
