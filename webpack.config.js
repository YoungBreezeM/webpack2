const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');//主页脚本自动添加插件
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
module.exports = {
    entry:{
        "app":'./src/index.js',
        "print":'./src/print.js'
    },
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    // devtool: 'inline-source-map',//可用于开发环境调试,找出源码的出错地方,开发完应该删除
    plugins:[
        new CleanWebpackPlugin(),//自动清除html没引用脚步本
        new HtmlWebpackPlugin({
            title: 'Output Management'
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: 'public/css/[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: true, // Enable to remove warnings about conflicting order
        }),
    ],
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        // publicPath: '/',
    },
    mode: "production",
    module: {
        rules:[
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            }
        ]
    }
};
