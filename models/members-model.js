const db = require('../db/dbConfig.js');

const getById = (id) => {
  return db('members').where({ id }).first();
};

const getByEmail = (email) => {
  return db('members').where({ email }).first();
};

const getByUsername = (username) => {
  return db('members').where({ username }).first();
};

const insert = (newMember) => {
  return db('members')
    .insert(newMember, '*')
    .then(([member]) => member);
};

const update = (id, updates) => {
  return db('members')
    .where({ id })
    .update(updates, ['id', 'email', 'current_household', 'permission_level']);
};

const remove = (id) => {
  return db('members').where({ id }).del();
};

const childrenPerHousehold = (householdId) => {
  return db('children').where('household_id', '=', householdId);
};

const getChildById = (id) => {
  return db('children').where({ id });
};

const addChild = (child) => {
  return db('children')
    .insert(child, 'id')
    .then((id) => {
      return getChildById(id[0]);
    });
};

const updateChild = (id, changes) => {
  return db('children').where({ id }).update(changes);
};

const removeChild = (id) => {
  return db('children').where({ id }).del();
};

const getHouseholdMembers = (householdId) => {
  return db('members')
    .where('current_household', '=', householdId)
    .select(['id', 'username', 'email', 'points']);
};

const getHouseholdChildren = (householdId) => {
  return db('children')
    .where('household_id', '=', householdId)
    .select(['id', 'username', 'points']);
};

module.exports = {
  getById,
  getByEmail,
  getByUsername,
  insert,
  update,
  remove,
  childrenPerHousehold,
  getHouseholdMembers,
  getHouseholdChildren,
  getChildById,
  addChild,
  updateChild,
  removeChild,
};
