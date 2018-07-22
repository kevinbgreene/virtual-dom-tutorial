process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = function(config) {
    config.set({
        port: 9890,

        frameworks: [
            'mocha'
        ],

        browsers: [
            'ChromeHeadless'
        ],

        files: [
            './dist/bundles/index.spec.js'
        ],

        singleRun: true,

        plugins: [
            'karma-mocha',
            'karma-chrome-launcher'
        ],

        logLevel: config.LOG_DEBUG,
    })
}
