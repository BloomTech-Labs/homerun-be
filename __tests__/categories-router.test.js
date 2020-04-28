const request = require('supertest');

const server = require('../app.js');

const db = require('../db/dbConfig.js');

const token = require('../middleware/token.js');


// some of the routes that need to be tested require a token sent in the header - to get that i will generate a token with the mom account
// before any of the tests happen and store the token in a variable
let generatedToken;
beforeAll(done => {
    generatedToken = token.generateToken({ id: 1, email: 'mom@test.com', current_household: 'a12345' })
    done();
});

describe('categories-router testing', () => {
    describe('GET /todos/categories', () => {
        it('should fail with 401 When token not present on header', () => {
            return request(server).get('/todos/categories')
                    .then(res => {
                        expect(res.status).toBe(401);
                    })
        })
        it('should pass with 200 OK when the token is sent on the header', () => {
            return request(server).get('/todos/categories').set('Authorization', generatedToken)
                    .then(res => {
                        expect(res.status).toBe(200);
                    })
        })
    })
})

