const restricted = require('../middleware/restricted.js');
const request = require('supertest');
const server = require('../app.js');

jest.mock('../middleware/restricted.js', () =>
  jest.fn((req, res, next) => next())
);

// Non-operational.
describe('Restricted Testing', () => {
  test('Check for 401 error', () => {
    request(server).get('/member').expect(401);
    expect(restricted).toHaveBeenCalledTimes(0);
  });
});
