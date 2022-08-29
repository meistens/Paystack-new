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

// json fails to display, check callback url on the dashboard
router.get('/callback', (req, res) => {
   const ref = req.params.reference
   try {
      verifyTx(ref)
      res.json({ message: "Payment successful" })
   } catch (err) {
      res.status(400).json({ err })
   }
})


router.get('/list', async (req, res) => {
   const list = await listTx()
   res.status(200).json(list)
})


router.get('/list/:id', async (req, res) => {
   const id = req.params.id
   try {
      const fetch = await fetchTx(id)
      res.json({ fetch })
   } catch (err) {
      res.status(404).json({ message: err })
   }
})


module.exports = router;