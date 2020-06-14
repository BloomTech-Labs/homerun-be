const request = require('supertest');

const server = require('../app.js');

const db = require('../db/dbConfig.js');

const token = require('../middleware/token.js');

const knex = require('../db/dbConfig');

const Category = require('../models/categories-model');

// some of the routes that need to be tested require a token sent in the header - to get that i will generate a token with the mom account
// before any of the tests happen and store the token in a variable
let generatedToken;
beforeAll((done) => {
  generatedToken = token.generateToken({
    id: 1,
    email: 'mom@test.com',
    current_household: 'a12345',
  });
  done();
});
beforeAll(() => {
  return knex.seed.run();
});

describe('categories-router testing', () => {
  describe('GET /todos/categories', () => {
    it('should fail with 401 When token not present on header', () => {
      return request(server)
        .get('/todos/categories')
        .then((res) => {
          expect(res.status).toBe(401);
        });
    });
    it('should pass with 200 OK when the token is sent on the header', () => {
      return request(server)
        .get('/todos/categories')
        .set('Authorization', generatedToken)
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
    it('should return proper JSON response', () => {
      return request(server)
        .get('/todos/categories')
        .set('Authorization', generatedToken)
        .then((res) => {
          expect(res.body).toEqual([
            { id: 1, category_name: 'living_room' },
            { id: 2, category_name: 'bedroom' },
            { id: 3, category_name: 'kitchen' },
            { id: 4, category_name: 'bathroom' },
          ]);
        });
    });
  });
  describe('GET todos/categories/todoID', () => {
    it('should return status 404 when invalid ID is passed in', () => {
      return request(server)
        .get('/todos/categories/25')
        .set('Authorization', generatedToken)
        .then((res) => {
          expect(res.status).toBe(404);
        });
    });
    it('should return status 200 when valid ID is passed in', () => {
      return request(server)
        .get('/todos/categories/2')
        .set('Authorization', generatedToken)
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
    it('should return proper category', () => {
      return request(server)
        .get('/todos/categories/2')
        .set('Authorization', generatedToken)
        .then((res) => {
          expect(res.body).toEqual(['kitchen']);
        });
    });
  });
  describe('POST todos/categories/', () => {
    it('returns 201 status on successful add', () => {
      return request(server)
        .post('/todos/categories/')
        .send({ todo_id: 1, category_name: 'bedroom' })
        .set('Authorization', generatedToken)
        .then((res) => {
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
        .delete('/todos/categories/delete')
        .send({ todo_id: 1, category_name: 'bedroom' })
        .set('Authorization', generatedToken)
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
  });
});
