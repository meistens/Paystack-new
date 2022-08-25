const express = require('express');
const router = express.Router();

router.get('/pay', (req, res) => {
   //res.set('Accept', 'application/json')
   const message = 'sup'
   res.json({message})
});

// router.post('/')

module.exports = router;