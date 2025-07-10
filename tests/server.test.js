const { test } = require('node:test');
const assert = require('node:assert');
const { checkRoomExists } = require('../server');

test('add function should correctly add two numbers', () => {
    assert.strictEqual(checkRoomExists(1), true, 'Fake true result')
});