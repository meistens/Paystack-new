const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/testRoute');
const ejs = require('ejs')
const path = require('path')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
   extended: false
}
));

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs')

app.use('/', routes);

module.exports = app;