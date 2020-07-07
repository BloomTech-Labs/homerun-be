const db = require('../db/dbConfig.js');

const getById = (id) => {
  return db('members').where({ id }).first();
};

const getByEmail = (email) => {
  return db('members').where({ email: email }).first();
};

const insert = (newMember) => {
  return db('members')
    .insert(newMember, 'id')
    .then((id) => {
      return getById(id[0]);
    });
};

const update = (id, updates) => {
  return db('members')
    .where({ id })
    .update(updates, ['id', 'email', 'current_household']);
};

const remove = (id) => {
  return db('members').where({ id }).del();
};

// Grabs all houshold memebrs when passed a specific household

// select members.*  from households
// inner join household_members on households.id = household_members.household_id and households.id = 'a12345'
// inner join members on household_members.member_id = members.id

// ! Looks too complicated, might be able to slim down.

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
    .select(['id', 'username', 'points', 'child']);
};

module.exports = {
  getById,
  getByEmail,
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
