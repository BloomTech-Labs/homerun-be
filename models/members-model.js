const db = require("../data/dbConfig.js");

const getById = id => {
  return db("members")
    .where({ id })
    .first();
};

const getByEmail = email => {
  return db("members")
    .where({ email })
    .first();
};

const insert = newMember => {
  return db("members")
    .insert(newMember, "id")
    .then(id => {
      return getById(id[0]);
    });
};

const update = (id, updates) => {
  return db("members")
    .where({ id })
    .update(updates);
};

const remove = id => {
  return db("members")
    .where({ id })
    .del();
};

// Grabs all houshold memebrs when passed a specific household

// select members.*  from households
// inner join household_members on households.id = household_members.household_id and households.id = 'a12345'
// inner join members on household_members.member_id = members.id

const getMembersByHousehold = householdId => {
  return db("members")
    .join("household_members")
    .where("household_members.household_id", houseHoldId);
};

// ! Looks too complicated, might be able to slim down.

const findHouseholdMembers = householdId => {
  return db("households")
    .select("members.*")
    .innerJoin("household_members", function() {
      this.on("households.id", "=", "household_members.household_id").andOn(
        "households.id",
        "=",
        householdId
      );
    })
    .innerJoin("members", function() {
      this.on("household_members.member_id", "=", "members.id");
    });
};

module.exports = {
  getById,
  getByEmail,
  insert,
  update,
  remove,
  findHouseholdMembers
};
