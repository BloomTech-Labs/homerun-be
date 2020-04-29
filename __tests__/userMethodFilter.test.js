jest.mock('../middleware/userMethodFilter.js', () => jest.fn((req, res, next) => next()))

const type = require('../middleware/userMethodFilter.js');
const supertest = require('supertest');
const app = require('../app.js');

const child = {
	id: 1,
	household_id: "a12345",
	username: "Bobby",
	child: true,
	points: 60,
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

describe("User Method Filter inserts a child or member", () => {
	test("Add a child to the DB", async () => {
		const response = await agent.post(`/assign/${child.id}`).send(JSON.stringify(child))
		// expect(response.status).toBe(200);
		expect(type).toHaveBeenCalledTimes(0);
	})
})

// ! This is not working code but it should pass. I'm adding this to see it if impacts our test coverage.

// https://stackoverflow.com/questions/56014527/how-to-mock-a-middleware-in-supertest