const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {ProvidePlugin} = require("webpack");
const fs = require("fs");
const pages = fs.readdirSync("./pug").filter(name => name.endsWith(".pug"));


module.exports = {
    mode: 'production',
    entry: {
        'login': './views/login/login.pug'
    },
    output: {
        path: path.resolve(__dirname, 'public/webpack/html'),
        filename: '[name].html',
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: ['pug-loader'],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        ...pages.map(file => new HtmlWebpackPlugin({
            template: `./pug/${file}`,
            templateParameters: {dir: "./dist"},
            filename: `./html/${file.replace(/\.pug/,'.html')}`,
            chunks: [file.replace(/\.pug/, "")]
        })),

    ]
};