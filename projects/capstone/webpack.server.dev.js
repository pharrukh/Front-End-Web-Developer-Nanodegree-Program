const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = [
    {
        entry: path.resolve(__dirname, 'src', 'server', 'index.js'),
        output: {
            path: __dirname,
            filename: 'dist/server.js',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    },
                },
            ],
        },
        target: 'node',
        externals: [nodeExternals()],
    },
];
