const { customAlphabet } = require('nanoid');

module.exports = function() {
    let fn = customAlphabet('0123456789qwertyuiopasdfghjklzxcvbnm', 8);
    return fn()
}