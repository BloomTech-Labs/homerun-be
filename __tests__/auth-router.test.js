const request = require('supertest');
const server = require('../app.js');

const user = {
  username: 'john',
  email: 'test@gmail.com',
  password: 'aslasdf123456asdf321a6s5df46',
};

describe('User signup functional', () => {
  test('User can sign up with username, email, password', () => {
    request(server)
      .post(`/signup`)
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});
