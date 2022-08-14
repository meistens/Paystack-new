const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 8888;
const payRoutes = require('./routes/paymentRoutes');
const app = express();

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public/')));
app.set('view engine', 'ejs');


// routes use
app.use('/', payRoutes);

app.listen(PORT, () => {
   console.log(`express app works`)
});
