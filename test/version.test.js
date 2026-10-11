'use strict'

const test = require('node:test')
const assert = require('node:assert')
const fs = require('node:fs')
const path = require('node:path')

// app.getVersion() reads package.json, while stores show the newest metainfo
// release, so a release that bumps one without the other reports two versions.
test('package.json carries the newest metainfo release', () => {
  const pkg = require('../package.json')
  const metainfo = fs.readFileSync(path.join(__dirname, '../flatpak/sh.lerd.Desktop.metainfo.xml'), 'utf8')
  const newest = metainfo.match(/<release version="([^"]+)"/)[1]
  assert.strictEqual(pkg.version, newest)
})
