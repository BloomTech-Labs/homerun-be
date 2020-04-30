const restricted = require('../middleware/restricted.js');
const supertest = require('supertest');
const app = require('../app.js');

jest.mock('../middleware/restricted.js', () => jest.fn((req, res, next) => next()))

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

// Non-operational.
describe("Restricted Testing", () => {
	test("Check for 401 error", () => {
		agent.get('/member')
			.expect(401)
		expect(restricted).toHaveBeenCalledTimes(0)
	})
})