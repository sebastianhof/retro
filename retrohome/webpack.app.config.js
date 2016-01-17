var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // configuration
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.less$/,
                loader: require.resolve('style-loader') + '!' + require.resolve('css-loader') + '!' + require.resolve('less-loader')
            },
            {
                test: /\.css/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.jpg$/,
                loader: 'file-loader?name=images/[hash].[ext]'
            },
            {
                test: /\.png$/,
                loader: 'url-loader?limit=10000&mimetype=image/png&name=images/[hash].[ext]'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[hash].[ext]'
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=fonts/[hash].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            _: 'lodash'
        }),
        new ExtractTextPlugin('[name].css'),
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),
        new HtmlWebpackPlugin({
            "filename": 'app.html',
            "css": ["app.css"],
            "template": "client/app.html",
            "inject": "body"
        })
    ],
    context: __dirname + '/client',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    entry: {
        app: ['./app.tsx']
    },
    output: {
        path: __dirname + '/dist/app',
        filename: '[name].bundle.js',
        chunkFilename: '[id].bundle.js'
    }
};