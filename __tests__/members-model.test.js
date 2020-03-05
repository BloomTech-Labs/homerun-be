const db = require('../data/dbConfig.js');
const Members = require('../models/members-model.js');

describe('Testing Members Model', () => {
	beforeEach(async () => {
		await db('users').truncate();
	})

	describe('Adding members to household', () => {
		test('Add two members', async () => {
			let members;
			members = await db('members');
			expect(members).toHaveLength(0);

			await Members
				.insert({
					current_household: "a12345",
					username: "test1",
					email: "test1@test.com",
					password: "test1234",
					provider: "email",
					access_token: '',
					refresh_token: '',
					points: 25,
					active: true,
					child: false,
				})
			await Members
				.insert({
					current_household: "a12345",
					username: "test2",
					email: "test2@test.com",
					password: "test1234",
					provider: "email",
					access_token: '',
					refresh_token: '',
					points: 45,
					active: true,
					child: false,
				})

			members = await db('members')
			expect(members).toHaveLength(2);
		})
	})
})