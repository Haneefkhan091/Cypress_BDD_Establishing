const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const addCucumberPreprocessorPlugin = require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  watchForFileChanges: false,
  pageLoadTimeout: 600000,
  experimentalStudio: true,
  defaultCommandTimeout: 50000,
  viewportWidth: 1440,
  viewportHeight: 900,
  chromeWebSecurity: false,
  screenshotOnRunFailure: true,
  projectId: 'pbhmrt',
  retries: {
    openMode: 2,
    runMode: 2
  },
  reporterOptions: {
    charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false
  },
  e2e: {
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });
      on('file:preprocessor', bundler);
      await addCucumberPreprocessorPlugin(on, config);
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
    specPattern: 'cypress/e2e/features/**/*.feature', // Adjust this pattern to match your feature files
    supportFile: false,
    stepDefinitions: 'cypress/e2e/step_definitions/**/*.js', // Correctly specify the step definitions path
    baseUrl: 'https://rahulshettyacademy.com/loginpagePractise/',
    includeShadowDom: true,
    experimentalRunAllSpecs: true,
    testIsolation: false,
  },
});
