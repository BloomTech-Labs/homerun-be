const db = require("../data/dbConfig.js");

const findById = (id) => {
  return db("households").where({ id }).first();
};

const insert = (newHousehold) => {
  return db("households")
    .insert(newHousehold, "id")
    .then((id) => {
      return findById(id[0]);
    });
};

const update = (id, updates) => {
  return db("households")
    .where({ id })
    .update(updates)
    .then((num) => {
      return findById(id);
    });
};

const remove = (id) => {
  return db("households").where({ id }).del();
};

module.exports = {
  findById,
  insert,
  update,
  remove,
};
