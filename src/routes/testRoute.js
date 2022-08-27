const express = require('express');
const router = express.Router();
const { initializeTx, verifyTx, listTx, fetchTx } = require('../config/paystack');

router.get('/pay', (req, res) => {
   //res.set('Accept', 'application/json')
   const message = 'sup'
   res.json({ message })
});

router.post('/pay', async (req, res) => {
   const data = {
      email: req.body.email,
      amount: req.body.amount * 100,
      "channels": ["card", "bank"]
   }
   //console.log(data)
   try {
      const init = await initializeTx(data)
      res.json(init.data.authorization_url)
   } catch (err) {
      res.status(400).json({ msg: err })
   }
})

router.get('/callback', (req, res) => {
   const ref = req.params.reference
   const verify = verifyTx(ref)
   res.json(verify)
})


module.exports = router;