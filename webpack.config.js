var path = require('path');
var webpack = require('webpack');
var glob = require('glob');

var CleanWebpackPlugin = require("clean-webpack-plugin");
var UglifyJsPlugin = require("uglifyjs-webpack-plugin");
var merge = require('webpack-merge');
//console.log(glob.sync('./Scripts/App/**/*.js'));
var appJs = glob.sync('./Scripts/App/**/*.js');
//module.exports = merge(common, {
module.exports = {
    mode: 'production',
    stats: {
        colors: false,
        hash: true,
        timings: true,
        assets: true,
        chunks: true,
        chunkModules: true,
        modules: true,
        children: true,
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: false,
                uglifyOptions: {
                    compress: {
                        inline: false,
                        dead_code: true
                    }
                }
            })
        ],
        runtimeChunk: false,
        splitChunks: {
            cacheGroups: {
                default: false,
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor_app',
                    chunks: 'all',
                    minChunks: 2
                }
            }
        }
    },
    // devtool: "source-map",
    devtool: false,

    entry: {
        vendor: [
            path.resolve(__dirname, './Scripts/index.js'),
        ],
        plugin: [
            // path.resolve(__dirname, './Scripts/plugins/bootstrap-multiselect.js'),
            path.resolve(__dirname, './Scripts/plugins/comboBox.js'),
            path.resolve(__dirname, './Scripts/plugins/daterangepicker.js'),

            path.resolve(__dirname, './Scripts/plugins/es-shim.min.js'),
            path.resolve(__dirname, './Scripts/plugins/getUserMedia.js'),
            path.resolve(__dirname, './Scripts/plugins/ion.rangeSlider.min.js'),
            path.resolve(__dirname, './Scripts/plugins/jquery.dataTables.min.js'),
            path.resolve(__dirname, './Scripts/plugins/jquery.fullscreen-min.js'),
            path.resolve(__dirname, './Scripts/plugins/jquery.scrollbar.min.js'),
            path.resolve(__dirname, './Scripts/plugins/jquery.unobtrusive-ajax.min.js'),

            path.resolve(__dirname, './Scripts/plugins/jquery.validate.min.js'),
            path.resolve(__dirname, './Scripts/plugins/jquery.validate.unobtrusive.min.js'),
            path.resolve(__dirname, './Scripts/plugins/lodash.min.js'),
            path.resolve(__dirname, './Scripts/plugins/moment.min.js'),
            path.resolve(__dirname, './Scripts/plugins/momenttimezone.min.js'),
            path.resolve(__dirname, './Scripts/plugins/script.js'),
            path.resolve(__dirname, './Scripts/plugins/slider.js'),
            path.resolve(__dirname, './Scripts/plugins/validator.js'),
        ],
        appJs: appJs
            // appJs: [
            //     appJs
            //     // path.resolve(__dirname, './Scripts/App/app.js'),
            //     //glob.sync('./Scripts/App/**/*.js*'),
            // ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash:8].js',
        sourceMapFilename: '[name].[hash:8].map',
        chunkFilename: '[id].[hash:8].js'
    },
    performance: {
        hints: 'warning',
        maxEntrypointSize: 400000,
        maxAssetSize: 300000
    },
    plugins: [
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/, /knockout$/),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.$': 'jquery',
            'window.jQuery': 'jquery',
        }),

        // new UglifyJsPlugin({
        //     sourceMap: false,
        //     uglifyOptions: {
        //         dead_code: true
        //     }
        // })
    ],

    module: {
        rules: [{
                test: /vendor\/.+\.(jsx|js)$/,
                exclude: /node_modules/,
                loader: 'imports-loader?jQuery=jquery,$=jquery,this=>window'
            },
            {
                test: /bootstrap\/js\//,
                exclude: /node_modules/,
                loader: 'imports?jQuery=jquery'
            }
        ]
    },

    resolve: {
        extensions: ['*', '.js', '.es6'],
        alias: {
            'bootstrap-multiselect': './Scripts/plugins/bootstrap-multiselect.js',
            jquery: path.resolve(__dirname, "./Scripts/vendor/jquery-3.3.1.min.js"),
            moment: path.resolve(__dirname, "./Scripts/plugins/moment.min.js"),
            //  bootstrap - multiselect: Path.resolve(__dirname, './Scripts/plugins/bootstrap-multiselect.js')
        }
    }
};
//});