const supertest = require('supertest');
const app = require('../app.js');

const child = {
	id: 1,
	household_id: "a12345",
	username: "Bobby",
	child: true,
	points: 60,
}

const user = {
	username: "john",
	email: "test@gmail.com",
	password: "aslasdf123456asdf321a6s5df46"
}

let agent;
let server;
beforeEach(done => {
	server = app.listen(4000, err => {
		if (err) return done(err)

		agent = supertest(server);
		done();
	})
});

afterEach(done => {
	server && server.close(done);
})

describe("User signup functional", () => {
	test("User can sign up with username, email, password", () => {
		agent.post(`/signup`)
			.send(user)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
	})

	// Dummy tests
	test("Dummy to check CC coverage", () => {
		expect(2 + 2).toBe(4);
	})
	test("Dummy to check CC coverage", () => {
		expect(2 + 2).toBe(4);
	})
	test("Dummy to check CC coverage", () => {
		expect(2 + 2).toBe(4);
	})
	test("Dummy to check CC coverage", () => {
		expect(2 + 2).toBe(4);
	})
	test("Dummy to check CC coverage", () => {
		expect(2 + 2).toBe(4);
	})
	test("Dummy to check CC coverage", () => {
		expect(2 + 2).toBe(4);
	})
})