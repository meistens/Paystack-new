const express = require('express');
const router = express.Router();
const { initializeTx, verifyTx, listTx, fetchTx } = require('../config/paystack');
require('dotenv').config()

router.get('/', (req, res) => {
   res.render('index')
});

router.post('/pay', async (req, res) => {
   const data = {
      email: req.body.email,
      amount: req.body.amount * 100,
      "channels": ["card", "bank"],
      callback_url: process.env.CALLBACK
   }
   console.log(data)

   try {
      const init = await initializeTx(data)
      res.status(302).redirect(init.data.authorization_url)
   } catch (err) {
      res.status(400).json({ err })
   }
})


router.get('/call', async (req, res) => {
   const ref = req.query.reference
   try {
      const ver = await verifyTx(ref)
      let tx = ver.data.id
      res.redirect('/receipt/' + tx)
      // res.json({ message: "works either  way, prefer to hide the long query address by setting a redirect route"})
   } catch (err) {
      res.status(400).json({ err })
   }
})


// redirect route
router.get('/receipt/:id', (req, res) => {
   const { id } = req.params
   try {
      if (id) {
         res.status(200).json({ message: "Payment successful" })
      }
   } catch (err) {
      res.json({ err })
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