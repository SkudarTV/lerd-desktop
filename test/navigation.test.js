'use strict'

const test = require('node:test')
const assert = require('node:assert')
const { navigation, isDashboard } = require('../src/navigation')

test('the loopback dashboard and the gate page load in the window', () => {
  assert.strictEqual(navigation('http://127.0.0.1:7073/#sites/acme.test'), 'allow')
  assert.strictEqual(navigation('file:///app/main/gate/index.html'), 'allow')
})

test('the hand-over to lerd.localhost is refused so the window keeps its origin', () => {
  assert.strictEqual(navigation('http://lerd.localhost/'), 'stay')
  assert.strictEqual(navigation('http://lerd.localhost/#services/mailpit'), 'stay')
})

test('any other address opens in the browser', () => {
  assert.strictEqual(navigation('https://lerd.sh/'), 'external')
  assert.strictEqual(navigation('https://acme.test/'), 'external')
})

test('the dashboard origin is trusted with or without a trailing slash', () => {
  assert.strictEqual(isDashboard('http://127.0.0.1:7073'), true)
  assert.strictEqual(isDashboard('http://127.0.0.1:7073/'), true)
  assert.strictEqual(isDashboard('http://127.0.0.1:7073/#sites/acme.test'), true)
  assert.strictEqual(isDashboard('http://lerd.localhost/'), false)
  assert.strictEqual(isDashboard('http://127.0.0.1:70730/'), false)
  assert.strictEqual(isDashboard(''), false)
})
