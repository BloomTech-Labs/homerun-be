const request = require('supertest');
const server = require('../app.js');

const user = {
  email: 'test@gmail.com',
};

describe('User signup functional', () => {
  test('User can sign up with email', () => {
    request(server)
      .post(`/signup`)
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});
