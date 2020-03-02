const db = require("../data/dbConfig.js");

const insert = confirmation => {
  return db("confirmations")
    .insert(confirmation, "hash")
    .then(hash => {
      return hash[0];
    });
};

const getByHash = hash => {
  return db("confirmations")
    .where({ hash })
    .first();
};

const remove = member_id => {
  return db("confirmations")
    .where({ member_id })
    .del();
};

module.exports = {
  insert,
  getByHash,
  remove
};
