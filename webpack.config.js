var path = require('path');

module.exports = {
    entry: {
        App: "./src/assets/js/App.js"
    },
    output: {
        path: path.resolve(__dirname, "./docs/assets"),
        filename: "[name].js"
    },
    module: {
        loaders: [{
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            },
            test: /\.js$/,
            exclude: /node_modules/
        }]
    }
}