const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const cookieParser = require('cookie-parser');
const sass = require('node-sass-middleware')
const fs = require('fs');
const https = require('https');
const privateKey  = fs.readFileSync('routes/example.key', 'utf8');
const certificate = fs.readFileSync('routes/example.csr', 'utf8');
const credentials = {key: privateKey, cert: certificate};
const port = 443;
const app = express();
app.set('port', port);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(sass({
    src: path.join(__dirname, 'public/stylesheetssass'),
    dest: path.join(__dirname, 'public/stylesheets'),
    debug: true,
    outputStyle: 'expanded',
    prefix:  '/stylesheets',
    indentedSyntax: true
}))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/', indexRouter);

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(port)

module.exports = app;