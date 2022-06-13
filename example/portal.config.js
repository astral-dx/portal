const { initAuth0Authentication, initAuth0TeamManagement, initAuth0Credential } = require('@astral-dx/plugin-auth0');
const { initReferences } = require("@astral-dx/plugin-references");
const { initBrand } = require("@astral-dx/plugin-branding");

/** @type {import('@astral-dx/core').Reference[]} */
const references = [
  { url: 'https://api.nasa.gov/', label: 'Documentation', description: 'This catalog focuses on broadly useful and user friendly APIs.', icon: 'book' },
  { url: 'https://github.com/nasa', label: 'GitHub', description: 'Open source repositories from NASA including ReadOpen data initative.', icon: 'code' },
];

/** @type {import('@astral-dx/core').Brand} */
const brand = {
  logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/NASA_Worm_logo.svg/2560px-NASA_Worm_logo.svg.png',
  faviconHref: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/2449px-NASA_logo.svg.png',
  primaryColor: '#ff0000',
  secondaryColor: '#000',
  title: 'NASA Developer Portal',
  subtitle: 'Welcome to the NASA API portal',
}

/** @type {import('@astral-dx/core').PortalConfig} */
const portalConfig = {
  plugin: {
    authentication: initAuth0Authentication(),
    teamManagement: initAuth0TeamManagement(),
    credential: initAuth0Credential({ audiences: [] }),
    branding: initBrand(brand),
    references: initReferences(references),
  },
};

module.exports = portalConfig;