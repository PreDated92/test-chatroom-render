const { test } = require('node:test');
const assert = require('node:assert');
const { checkRoomExists } = require('../server');

test('check if room is available', () => {
    assert.strictEqual(checkRoomExists(1), true, 'Fake true result')
});