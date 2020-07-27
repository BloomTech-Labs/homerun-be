const db = require('../db/dbConfig.js');

const account_insert = (confirmation) => {
  return db('account_confirmations')
    .insert(confirmation, '*')
    .then(([conf]) => conf);
};

const account_getById = (id) => {
  return db('account_confirmations').where({ id }).first();
};

const account_getByEmailAndPin = (email, pin) => {
  return db('account_confirmations').where({ email, pin }).first();
};

const account_remove = (email) => {
  return db('account_confirmations').where({ email }).del();
};

const password_insert = (confirmation) => {
  return db('password_confirmations')
    .insert(confirmation, '*')
    .then(([conf]) => conf);
};

const password_getById = (id) => {
  return db('password_confirmations').where({ id }).first();
};

const password_remove = (id) => {
  return db('password_confirmations').where({ id }).del();
};

const invite_insert = (confirmation) => {
  return db('invite_confirmations')
    .insert(confirmation, '*')
    .then(([conf]) => conf);
};

const invite_getById = (id) => {
  return db('invite_confirmations').where({ id }).first();
};

const invite_remove = (email) => {
  return db('invite_confirmations').where({ email }).del();
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
    getById: password_getById,
    remove: password_remove,
  },
  invite: {
    insert: invite_insert,
    getById: invite_getById,
    remove: invite_remove,
  },
};
