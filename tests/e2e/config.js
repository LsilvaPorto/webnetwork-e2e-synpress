const { defineConfig } = require('cypress')

module.exports = defineConfig({
  userAgent: 'synpress',
  retries: {
    runMode: 0,
    openMode: 0,
  },
  screenshotsFolder: 'tests/e2e/screenshots',
  videosFolder: 'tests/e2e/videos',
  chromeWebSecurity: false,
  viewportWidth: 1688,
  viewportHeight: 768,
  env: {
    coverage: false,
    delegationAddress: '0x7dF9dCE4feA1737D66F10414175608B15a78D719',
    acessToken: 'needValidToken',
    councilMemberValue: 26000000,
    login_github_account: 'testTaikai',
    password_github_account: 'Ifugorago1',
  },
  defaultCommandTimeout: 30000,
  pageLoadTimeout: 30000,
  requestTimeout: 30000,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'https://afrodite.taikai.network',
    specPattern: 'tests/e2e/specs/**/*.cy.{js,jsx,ts,tsx}',
  },
  component: {
    setupNodeEvents(on, config) {},
    specPattern: './**/*spec.{js,jsx,ts,tsx}',
  },
})
