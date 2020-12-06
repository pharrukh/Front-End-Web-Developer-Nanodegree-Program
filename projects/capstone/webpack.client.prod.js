const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: { index: path.resolve(__dirname, "src", 'client', "index.js") },
    mode: 'production',
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, "src", "client", "views", "index.html"),
            filename: "./index.html",
        }),
        new CleanWebpackPlugin({
            dry: true,
            verbose: true,
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
        // new WorkboxPlugin.GenerateSW({
        //     maximumFileSizeToCacheInBytes: 5000000,
        //     clientsClaim: true,
        //     skipWaiting: true,
        // }),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            }
        ]
    },

}
