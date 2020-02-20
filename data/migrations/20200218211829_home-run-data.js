const crypto = require('crypto')

exports.up = function (knex) {
	return knex.schema
		.createTable('members', col => {
			col.increments()
			col.string('username', 40).notNullable()
			col.string('email', 128).notNullable()
			col.string('password').notNullable()
			col.string('token')
			col.string('current_household')
			col.boolean('child')
			col.integer('points')
		})
		.createTable('household', col => {
			col.varchar('id', 7).notNullable().unique()
			col.string('title', 40)
			col.integer('pin', 4)
		})
		.createTable('todos', col => {
			col.increments()
			col.string('title', 40).notNullable()
			col.string('desc', 255)
			col.integer('point_value')
			col.integer('due')
			col.boolean('completed')
			col.string('completed_by')
		})
		.createTable('rewards', col => {
			col.increments()
			col.string('title').notNullable()
			col.integer('point_total').notNullable()
			col.varchar('household_id')
				.unsigned()
				.references('household.id')
				.onDelete('CASCADE')
				.onUpdate('CASCADE')
		})
		.createTable('inventory', col => {
			col.increments()
			col.varchar('household_id')
				.unsigned()
				.references('household.id')
				.onDelete('CASCADE')
				.onUpdate('CASCADE')
		})
		.createTable('bills', col => {
			col.increments()
			col.varchar('household_id')
				.unsigned()
				.references('household.id')
				.onDelete('CASCADE')
				.onUpdate('CASCADE')
		})
		.createTable('household_members', col => {
			col.increments()
			col.integer('member_id')
				.unsigned()
				.references('members.id')
				.onDelete('CASCADE')
				.onUpdate('CASCADE')
			col.varchar('household_id')
				.unsigned()
				.references('household.id')
				.onDelete('CASCADE')
				.onUpdate('CASCADE')
		})
		.createTable('household_todos', col => {
			col.increments()
			col.integer('todos_id')
				.unsigned()
				.references('todos.id')
				.onDelete('CASCADE')
				.onUpdate('CASCADE')
			col.varchar('household_id')
				.unsigned()
				.references('household.id')
				.onDelete('CASCADE')
				.onUpdate('CASCADE')
		})
		.createTable('todos_members', col => {
			col.increments()
			col.integer('members_id')
				.unsigned()
				.references('members.id')
				.onDelete('CASCADE')
				.onUpdate('CASCADE')
			col.integer('todos_id')
				.unsigned()
				.references('todos.id')
				.onDelete('CASCADE')
				.onUpdate('CASCADE')
		})
};

exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists('todos_members')
		.dropTableIfExists('household_todos')
		.dropTableIfExists('household_members')
		.dropTableIfExists('bills')
		.dropTableIfExists('inventory')
		.dropTableIfExists('rewards')
		.dropTableIfExists('todos')
		.dropTableIfExists('household')
		.dropTableIfExists('members')
};


// Sample Data Shape

const users = [
	{
		id: 1,
		username: "Test 1",
		email: "test@test.com",
		password: "test1234",
		token: "1234567",
		currentHouseold: "b1234",
		households: ["b1234", "a3214"] // Handle Front-end?
	},
	{
		id: 2,
		username: "Test 2",
		email: "test@test.com",
		password: "test1234",
		token: "1234567",
		currentHouseold: "b1234",
		households: ["b1234"] // Handle Front-end?
	},
	{
		id: 3,
		username: "Test 3",
		email: "test@test.com",
		password: "test1234",
		token: "1234567",
		currentHouseold: "c6547",
		households: ["c6547"] // Handle Front-end?
	},
]

const household = {
	id: crypto.randomBytes(3).toString("hex"),
	title: "Test Household",
	PIN: "hash123456789",
	address: "hashaddress",
	members: [
		{
			name: "Test 1",
			child: false,
			points: 0
		},
		{
			name: "Test 2",
			child: true,
			points: 25
		},
		{
			name: "Test 3",
			child: true,
			points: 50
		},
		{
			name: "Test 4",
			child: false,
			points: 0
		},
	],
	todos: [
		{
			id: 1,
			title: "Test Title",
			due: 131523452,
			// nested: 0,
			// belongs: '',
			assigned: [
				{
					name: "Test 1",
					child: false // Front-end
				},
				{
					name: "Test 2",
					child: true // Front-end
				}
			],
			completed: false,
			completedBy: ''
		},
		{
			id: 2,
			title: "Test Title",
			due: 131523452,
			assigned: [],
			// belongs: todo.id === 1,
			// nested: 1,
			completed: false,
			completedBy: ''
		},
		{
			id: 3,
			title: "Test Title",
			due: 131523452,
			assigned: [
				{
					name: "Test 3",
					child: false
				}
			],
			completed: true,
			completedBy: 'Test 3'
		},
		{
			id: 4,
			title: "Test Title",
			due: 131523452,
			assigned: [
				{
					name: "Test 1",
					child: false
				},
				{
					name: "Test 2",
					child: true
				}
			],
			completed: false,
			completedBy: ''
		},
	],
	rewards: [
		{
			id: 1,
			title: "Ice Cream",
			pointValue: 25,
		},
		{
			id: 2,
			title: "Pizza Party",
			pointValue: 125,
		},
		{
			id: 3,
			title: "Fuzzy Handcuffs",
			pointValue: 225,
		},
	],
	bills: [],
	inventory: []
}

// console.log(Math.random().toString(32).replace('0.', '').slice(0, 6))
