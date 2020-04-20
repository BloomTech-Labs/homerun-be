require("dotenv").config();
const knex = require("knex");
const environment = process.env.NODE_ENV || "development";

const configOptions = require("../knexfile")[environment];

module.exports = knex(configOptions);

// Sample Data Shape

// const users = [
// 	{
// 		id: 1,
// 		username: "Test 1",
// 		email: "test@test.com",
// 		password: "test1234",
// 		token: "1234567",
// 		currentHouseold: "b1234",
// 		households: ["b1234", "a3214"] // Handle Front-end?
// 	},
// 	{
// 		id: 2,a
// 		username: "Test 2",
// 		email: "test@test.com",
// 		password: "test1234",
// 		token: "1234567",
// 		currentHouseold: "b1234",
// 		households: ["b1234"] // Handle Front-end?
// 	},
// 	{
// 		id: 3,
// 		username: "Test 3",
// 		email: "test@test.com",
// 		password: "test1234",
// 		token: "1234567",
// 		currentHouseold: "c6547",
// 		households: ["c6547"] // Handle Front-end?
// 	},
// ]

// const household = {
// 	id: crypto.randomBytes(3).toString("hex"),
// 	title: "Test Household",
// 	PIN: "hash123456789",
// 	address: "hashaddress",
// 	members: [
// 		{
// 			name: "Test 1",
// 			child: false,
// 			points: 0
// 		},
// 		{
// 			name: "Test 2",
// 			child: true,
// 			points: 25
// 		},
// 		{
// 			name: "Test 3",
// 			child: true,
// 			points: 50
// 		},
// 		{
// 			name: "Test 4",
// 			child: false,
// 			points: 0
// 		},
// 	],
// todos: [
// 		{
// 			id: 1,
// 			title: "Test Title",
// 			due: 131523452,
// 			// nested: 0,
// 			// belongs: '',
// 			assigned: [
// 				{
// 					name: "Test 1",
// 					child: false // Front-end
// 				},
// 				{
// 					name: "Test 2",
// 					child: true // Front-end
// 				}
// 			],
// 			completed: false,
// 			completedBy: ''
// 		},
// 		{
// 			id: 2,
// 			title: "Test Title",
// 			due: 131523452,
// 			assigned: [],
// 			// belongs: todo.id === 1,
// 			// nested: 1,
// 			completed: false,
// 			completedBy: ''
// 		},
// 		{
// 			id: 3,
// 			title: "Test Title",
// 			due: 131523452,
// 			assigned: [
// 				{
// 					name: "Test 3",
// 					child: false
// 				}
// 			],
// 			completed: true,
// 			completedBy: 'Test 3'
// 		},
// 		{
// 			id: 4,
// 			title: "Test Title",
// 			due: 131523452,
// 			assigned: [
// 				{
// 					name: "Test 1",
// 					child: false
// 				},
// 				{
// 					name: "Test 2",
// 					child: true
// 				}
// 			],
// 			completed: false,
// 			completedBy: ''
// 		},
// 	],
// 	rewards: [
// 		{
// 			id: 1,
// 			title: "Ice Cream",
// 			pointValue: 25,
// 		},
// 		{
// 			id: 2,
// 			title: "Pizza Party",
// 			pointValue: 125,
// 		},
// 		{
// 			id: 3,
// 			title: "Fuzzy Handcuffs",
// 			pointValue: 225,
// 		},
// 	],
// 	bills: [],
// 	inventory: []
// }

// // console.log(Math.random().toString(32).replace('0.', '').slice(0, 6))
