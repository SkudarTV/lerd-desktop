'use strict'

const DASHBOARD_ORIGIN = 'http://127.0.0.1:7073'

// navigation decides what happens when the page itself navigates the window.
// The dashboard hands a loopback session over to http://lerd.localhost; the app
// refuses that ('stay') because its permissions and the dashboard's saved
// settings belong to the loopback origin. Anything else is a link out.
function navigation(url) {
  if (url.startsWith(DASHBOARD_ORIGIN + '/') || url.startsWith('file:')) return 'allow'
  if (new URL(url).hostname === 'lerd.localhost') return 'stay'
  return 'external'
}

// isDashboard compares origins rather than strings: Electron 44 hands the
// permission handlers the origin with a trailing slash.
function isDashboard(url) {
  try {
    return new URL(url).origin === DASHBOARD_ORIGIN
  } catch {
    return false
  }
}

module.exports = { navigation, isDashboard, DASHBOARD_ORIGIN }
