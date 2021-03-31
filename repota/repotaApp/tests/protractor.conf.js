exports.config = {
    allScriptsTimeout: 11000,
    specs: ['./src/features/**/*.feature'],
    capabilities: {
        'browserName': 'chrome'
    },
    SELENIUM_PROMISE_MANAGER: false,
    directConnect: true,
    baseUrl: 'http://localhost:4200/',
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    cucumberOpts: {
        require: ['./src/steps/**/*.steps.ts'],
    },
};
