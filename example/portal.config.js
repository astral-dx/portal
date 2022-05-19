const { initAuth0Authentication } = require('@astral-dx/plugin-auth0');

module.exports = {
  plugin: {
    authentication: initAuth0Authentication({})
  }
}