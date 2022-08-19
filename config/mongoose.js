require('dotenv').config();
const mongoose = require('mongoose');

let DB = process.env.DB

// mongoose connecton to local database
mongoose.connect(DB, {
   useNewUrlParser: true,
   useUnifiedTopology: true
})
   .then(() => console.log('database running with no issues'))
   .catch(err => console.log(err));

   module.exports = mongoose;