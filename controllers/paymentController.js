const Pay = require('../models/payments');

const { default: axios } = require("axios");

const { initializePayment, verifyPayment } = require('../config/paystack')(axios);

const _ = require('lodash');

exports.getForm = (req, res) => {
   res.render('index');
};
exports.postForm = (req, res) => {
   const form = _.pick(req.body, ['full_name', 'email', 'amount']);

   form.metadata = {
      full_name: form.full_name
   }
   form.amount *= 100;

   initializePayment(form, (err, body) => {
      if (err) {
         console.log(err);
         return res.status(400).redirect('/error');
      }
      const response = JSON.parse(body);

      // assigning this to a variable to fix typeerror error
      authorization = response.data.authorizaton_url;

      res.status(302).redirect(authorization)
   });
}
exports.callback = (req, res) => {
   const ref = req.query.reference;
   verifyPayment(ref, (err, body) => {
      if (err) {
         console.log(err)
         return res.status(400).redirect('/error');
      }
      response = JSON.parse(body);

      const data = _.at(response.data, ['reference', 'amount', 'customer.email', 'metadata.full_name']);
      [reference, amount, email, full_name] = data;
      newPay = { reference, amount, email, full_name }


      const pay = new Pay(newPay)
      pay.save().then((pay) => {
         if (!pay) {
            return res.status(400).redirect('/error');
         }
         res.redirect('/receipt/' + pay._id);
      }).catch((error) => {
         console.log(error)
         res.redirect('/error');
      });
   });
};

