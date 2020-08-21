const request = require('supertest');
const server = require('../app.js');
const token = require('../middleware/token.js');

// some of the routes that need to be tested require a token sent in the header - to get that i will generate a token with the mom account
// before any of the tests happen and store the token in a variable
let generatedToken;
beforeAll(async (done) => {
  generatedToken = token.generateToken({
    id: 1,
  });
  done();
});

describe('categories-router testing', () => {
  describe('GET /todos/categories', () => {
    it('should pass with 200 OK when the token is sent on the header', () => {
      return request(server)
        .get('/categories/')
        .set('Authorization', generatedToken)
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
    it('should return proper JSON response', () => {
      return request(server)
        .get('/categories/')
        .set('Authorization', generatedToken)
        .then((res) => {
          expect(res.body).toEqual([
            {
              id: 1,
              household_id: 'a12345',
              category_name: 'Living Room',
            },
            {
              id: 2,
              household_id: 'a12345',
              category_name: 'Bedroom',
            },
            {
              id: 3,
              household_id: 'a12345',
              category_name: 'Kitchen',
            },
            {
              id: 4,
              household_id: 'a12345',
              category_name: 'Bathroom',
            },
          ]);
        });
    });
  });
  describe('GET todos/categories/todoID', () => {
    it('should return status 200 when valid ID is passed in', () => {
      return request(server)
        .get('/todos/categories/2')
        .set('Authorization', generatedToken)
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
  });
  describe('POST /categories/', () => {
    it('returns 201 status on successful add', () => {
      return request(server)
        .post('/todos/categories/')
        .send({ todo_id: 1, category_id: '2' })
        .set('Authorization', generatedToken)
        .then((res) => {
          console.log(res.body);
          expect(res.status).toBe(201);
        });
    });
    it('returns 500 error if missing information', () => {
      return request(server)
        .post('/todos/categories/')
        .send({ category_name: 'bedroom' })
        .set('Authorization', generatedToken)
        .then((res) => {
          expect(res.status).toBe(500);
        });
    });
  });
  describe('DELETE todos/categories/', () => {
    it('returns 200 status upon successful delete', () => {
      return request(server)
        .delete('/todos/categories/1')
        .set('Authorization', generatedToken)
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
  });
});
