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

module.exports = { navigation, DASHBOARD_ORIGIN }
