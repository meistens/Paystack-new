const app = require('../server');
let port = process.env.PORT || 5000

app.listen(port, () => {
   console.log('works')
});
