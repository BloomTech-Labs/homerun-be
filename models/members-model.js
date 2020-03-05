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

// ! Looks too complicated, might be able to slim down.

const findHouseholdMembers = householdId => {
  return db("households")
    .select(
      "members.id",
      "members.username",
      "members.email",
      "members.provider",
      "members.access_token",
      "members.points",
      "members.active",
      "members.current_household",
    )
    .innerJoin("household_members", function () {
      this.on("households.id", "=", "household_members.household_id")
    }).where('household_id', '=', householdId)
    .innerJoin("members", function () {
      this.on("household_members.member_id", "=", "members.id");
    });
};

// select children.* from children
// join households on children.household_id = households.id
// where children.household_id = 'a12345'
const childrenPerHousehold = householdId => {
  return db("children").where("household_id", '=', householdId)
}

// select * from members 
// where members.current_household = 'a12345'

const totalHouseholdMembers = householdId => {
  return db('members').where('current_household', '=', householdId)
}

const totalHouseholdChildren = householdId => {
  return db('children').where('household_id', '=', householdId)
}

module.exports = {
  getById,
  getByEmail,
  insert,
  update,
  remove,
  findHouseholdMembers,
  childrenPerHousehold,
  totalHouseholdMembers,
  totalHouseholdChildren
};
