const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'production',
    entry: {
        'newsPage': './public/stylesheetssass/newsPage.sass',
        'post': './public/stylesheetssass/post.sass',
        'style': './public/stylesheetssass/style.sass',
        'userPageAdmin': './public/stylesheetssass/userPageAdmin.sass',
        'usersList': './public/stylesheetssass/usersList.sass'
    },
    output: {
        path: path.resolve(__dirname, 'public/webpack/css'),
        filename: '[name].bundle.css',
    },
    module: {
        rules: [
            {
                test: /\.(sass)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ],
};