const mock = require('webpack-light-mock')
const webpack = require('webpack')

module.exports = {
    mode: "development",
    entry:  __dirname + "/src/app.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    devServer: {
        before: mock({routesPath: 'src/routes.js'}),
        hot: true
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
}
