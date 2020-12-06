const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: { index: path.resolve(__dirname, "src", 'server', "index.js") },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
        ]
    },
    watchOptions: {
        ignored: ['node_modules/**'],
        poll: 1000
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
}
