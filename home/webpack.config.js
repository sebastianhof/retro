var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    // configuration
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.html$/,
                loader: "file?name=[name].[ext]"
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
                loader: 'file-loader'
            },
            {
                test: /\.png$/,
                loader: 'url-loader?limit=10000&minetype=image/png'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
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
        })
    ],
    context: __dirname + '/client',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    entry: {
        app: ['./app.tsx', './app.html'],
        public: ['./public.ts', './public.html']
    },
    output: {
        path: __dirname + '/dist/',
        filename: '[name].bundle.js',
        chunkFilename: '[id].bundle.js',
    }
};