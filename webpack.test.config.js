const { resolve } = require('path')

module.exports = {
    mode: 'development',
    entry: './dist/tests/integration/index.js',
    output: {
        path: resolve(__dirname, 'dist', 'bundles'),
        filename: 'index.spec.js',
    }
}
