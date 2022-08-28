const express = require('express');
const router = express.Router();
const { initializeTx, verifyTx, listTx, fetchTx } = require('../config/paystack');

router.get('/', (req, res) => {
   res.render('index')
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
      res.status(302).redirect(init.data.authorization_url)
   } catch (err) {
      res.status(400).json({ err })
   }
})

// callback url same used in previous prototype, change it
router.get('/callback', (req, res) => {
   const ref = req.params.reference
   try {
      const verify = verifyTx(ref)
   res.json({message: "Payment successful"})
   } catch (err) {
      res.status(400).json({ err })
   }
})


router.get('/list', async (req, res) => {
   const list = await listTx()
   res.status(200).json(list)
})


module.exports = router;