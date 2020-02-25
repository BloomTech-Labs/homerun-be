const db = require('../data/dbConfig.js')

// Grabs all houshold memebrs when passed a specific household

// select members.*  from households
// inner join household_members on households.id = household_members.household_id and households.id = 'a12345'
// inner join members on household_members.member_id = members.id

// ! Looks too complicated, might be able to slim down.

const findHouseholdMembers = (householdId) => {
	return db('households')
		.select('members.*')
		.innerJoin('household_members', function () {
			this.on('households.id', '=', 'household_members.household_id')
				.andOn('households.id', '=', householdId)
		})
		.innerJoin('members', () => {
			this.on('household_members.member_id', '=', 'members.id')
		})
}
