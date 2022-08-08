const mongoose = require('mongoose');

// mongoose connecton to local database
mongoose.connect('mongodb://localhost:27017/prototype1DB', {
   useNewUrlParser: true,
   useUnifiedTopology: true
})
   .then(() => console.log('database running with no issues'))
   .catch(err => console.log(err));

   module.exports = mongoose;