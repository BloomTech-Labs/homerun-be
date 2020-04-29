const request = require('supertest');

const server = require('../app.js');

const db = require('../db/dbConfig.js');

const token = require('../middleware/token.js');


let generatedToken;
beforeAll(async done => {
    generatedToken = token.generateToken({ id: 1, email: 'mom@test.com', current_household: 'a12345' })
    done();
});


describe('todos-router testing', () => {
    describe('GET /todos/household', () => {
        it('should fail with 401 When token not present on header', () => {
            return request(server).get('/todos/household')
                    .then(res => {
                        expect(res.status).toBe(401);
                    })
        })
        
        it('should pass with 200 OK when the token is sent on the header', () => {
            return request(server).get('/todos/household').set('Authorization', generatedToken)
                    .then(res => {
                        expect(res.status).toBe(200);
                    })
        })

        it('should return a json object', () => {
            return request(server).get('/todos/household').set('Authorization', generatedToken)
            .then(res => {
                expect(res.type).toBe('application/json');
            })
        })

        it('should return an array in the body with a length of 5', () => {
            return request(server).get('/todos/household').set('Authorization', generatedToken)
            .then(res => {
                expect(res.body).toHaveLength(5);
            })
        })
    })
})