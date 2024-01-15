var express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const app = express();
const http = require('http');
const port = 3000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use('/', indexRouter);

module.exports = app;
