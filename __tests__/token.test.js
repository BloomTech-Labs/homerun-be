const token = require('../middleware/token.js');

describe("tests the generate token function", () => {
    it("should be defined", () => {
        const genToken = token.generateToken({id: 1000, email: 'chicken@feed.com', current_household: 'h39dnj4' });
        
        expect(genToken).toBeDefined();
    })
    it("should be a string", () => {
        const genToken = token.generateToken({id: 1000, email: 'chicken@feed.com', current_household: 'h39dnj4' });
        
        expect(typeof genToken).toBe('string');
    })
})