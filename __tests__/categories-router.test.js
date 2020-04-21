const request = require('supertest');

const server = require('../app.js');

const db = require('../data/dbConfig.js');


// some of the routes that need to be tested require a token sent in the header - to get that i will login with the mom account
// before any of the tests happen and store the token in a variable
let token;
beforeAll(done => {
    console.log(process.env.NODE_ENV);
    request(server).post('/auth/login').send({ email: 'mom@test.com', password: 'test1234' })
    .end((err, response) => {
        token = response.body.token;
        done();
    });
});

describe('categories-router testing', () => {
    describe('GET /todos/categories', () => {
        it('should fail with 401 When token not present on header', () => {
            return request(server).get('/todos/categories')
                    .then(res => {
                        expect(res.status).toBe(401);
                    })
        })
    })
})

