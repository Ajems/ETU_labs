path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        'adminPanel': './public/javascripts/view/adminPanel.js',
        'login': './public/javascripts/view/login.js',
        'userPageChange': './public/javascripts/view/userPageChange.js',
        'userPageRedirect': './public/javascripts/view/userPageRedirect.js',
        'userRoleChange': './public/javascripts/view/userRoleChange.js',
        'userStatusChange': './public/javascripts/view/userStatusChange.js'
    },
    output: {
        path: path.resolve(__dirname, 'public/webpack/js'),
        filename: '[name].min.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
};