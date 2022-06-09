const { initReferences } = require("@astral-dx/plugin-references");
const { initBrand } = require("@astral-dx/plugin-branding");
const { initAuth0Authentication, initAuth0TeamManagement, initAuth0Credential } = require('@astral-dx/plugin-auth0');

module.exports = {
  plugin: {
    authentication: initAuth0Authentication(),
    teamManagement: initAuth0TeamManagement(),
    credential: initAuth0Credential({ audiences: [] }),
    branding: initBrand({
      logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/NASA_Worm_logo.svg/2560px-NASA_Worm_logo.svg.png',
      faviconHref: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/2449px-NASA_logo.svg.png',
      primaryColor: '#ff0000',
      secondaryColor: '#000',
      title: 'NASA Developer Portal',
      subtitle: 'Welcome to the NASA API portal',
    }),
    references: initReferences([
      { url: 'https://api.nasa.gov/', label: 'Documentation', description: 'This catalog focuses on broadly useful and user friendly APIs.', icon: 'book' },
      { url: 'https://github.com/nasa', label: 'GitHub', description: 'Open source repositories from NASA including ReadOpen data initative.', icon: 'code' },
    ]),
  },
};