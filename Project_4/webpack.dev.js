const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: { index: path.resolve(__dirname, "src", 'client', "index.js") },
    devtool: 'inline-source-map',
    output: {
        libraryTarget: 'var',
        library: 'Client',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
        ]
    },
    watchOptions: {
        ignored: ['node_modules/**'],
        poll: 1000
    },
    devServer: {
        contentBase: '/dist',
        publicPath: '/',
        compress: true,
        port: 9000,
        open: true
    },
    plugins: [
        // new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            title: 'Output Management',
            template: path.resolve(__dirname, "src", "client", "views", "index.html"),
            filename: "./index.html",
        }),
    ],
}
