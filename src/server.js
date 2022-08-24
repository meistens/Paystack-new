const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/testRoute');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
   extended: false
}
));
app.use('/pay', routes);

app.listen(process.env.PORT || 5000, () => {
   console.log('works')
});

module.exports = app;