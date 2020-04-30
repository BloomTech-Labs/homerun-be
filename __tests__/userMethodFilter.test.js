const typeCheck = require('../middleware/userMethodFilter.js');
const supertest = require('supertest');
const app = require('../app.js');

// jest.mock('../middleware/userMethodFilter.js', () => jest.fn((req, res, next) => next()))

let agent;
let server;
beforeEach(done => {
	server = app.listen(4000, err => {
		if (err) return done(err);

		agent = supertest(server);
		done();
	});
});

afterEach(done => {
	server && server.close(done);
});

describe("Users", () => {
	const user = {
		id: 1,
		username: "john",
		email: "test@gmail.com",
		password: "aslasdf123456asdf321a6s5df46"
	}

	test("Insert is called from the middleware", () => {
		const req = {
			body: user,
			path: `/assign/${user.id}`,
			params: {
				id: user.id,
			}
		}
		agent.post(req.path)
			.send(req)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
	})
	test("Remove is called from the middleware", () => {
		const req = {
			body: user,
			path: `/unassign/${user.id}`,
			params: {
				id: user.id,
			}
		}
		agent.post(req.path)
			.send(req)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
	})
})

describe("Child", () => {
	const child = {
		id: 1,
		household_id: "a12345",
		username: "Bobby",
		child: true,
		points: 60,
	}

	test("Insert is called from the middleware", () => {
		const req = {
			body: child,
			path: `/assign/${child.id}`,
			params: {
				id: child.id,
			}
		}
		agent.post(req.path)
			.send(req)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
	})
	test("Remove is called from the middleware", () => {
		const req = {
			body: child,
			path: `/unassign/${child.id}`,
			params: {
				id: child.id,
			}
		}
		agent.post(req.path)
			.send(req)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
	})
})