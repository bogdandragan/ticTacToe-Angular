const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');

module.exports = {
    context: __dirname + "/app/src",
    devtool: debug ? "inline-sourcemap" : false,
    entry: "./index.js",
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.html$/,
                loader: 'raw-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: 'style-loader'
            },
            {
                test: /\.css$/,
                loader: 'css-loader'
            },
            {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)|\.jpg($|\?)|\.png($|\?)|\.ico($|\?)/,
                loader: 'url-loader'
            }
        ]
    },
    output: {
        path: __dirname + "/app/",
        filename: "bundle.min.js"
    },
    plugins: debug ? [] : [
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false, compress: { warnings: false }, minimize: true })
    ]
};