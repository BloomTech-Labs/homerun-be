require('dotenv').config()
const supertest = require('supertest');
const app = require('../app.js');


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

describe("Server functionality", () => {
	test("Server is running", () => {
		agent.post(`/`)
			.expect(200)
	})
	test("Node is in test mode", () => {
		expect(process.env.NODE_ENV).toBe("test");
	})
})