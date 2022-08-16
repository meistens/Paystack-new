const Pay = require('../models/payments');

const { default: axios } = require("axios");

//const { initializePayment, verifyPayment } = require('../config/paystack')(axios);

const _ = require('lodash');

// verify payment endpoint start
const secret = 'Bearer sk_test';
let FormData = require('form-data');
let data = new FormData();

exports.getForm = (req, res) => {
   res.render('index');
};


exports.postForm = async (req, res) => {

   await axios({
      method: 'post',
      url: 'https://api.paystack.co/transaction/initialize',
      headers: {
         'Authorization': secret,
         'Content-Type': 'application/json',
         'cache-control': 'no-cache'
      },
      data: {
         "email": req.body.email,
         "amount": req.body.amount
      }
   })
   .then((response) => {
      res.status(302).redirect(response.data.authorizaton_url)
      console.log(response.data)
   })
   .catch((error) => {
      console.log(error);
   });
};
// successful? it renders a page alright but server response slow making the get request... vpn maybe?

// issue is in the controller above? renders html page but redirecting to the authorization url is an issue...



// verify payment endpoint continuation
exports.callback = (req, res) => {
   const ref = req.query.reference;


   let config = {
      method: 'get',
      url: 'https://api.paystack.co/transaction/verify/' + encodeURIComponent(ref),
      headers: {
         authorization: secret,
         ...data.getHeaders()
      },
      data: data
   };



   //    // prepping select data to push to db, code below will be reformatted once path param issue is fixed
   //    const data = _.at(response.data, ['reference', 'amount', 'customer.email', 'metadata.full_name']);

   //    [reference, amount, email, full_name] = data;

   //    newPay = { reference, amount, email, full_name }

   //    const pay = new Pay(newPay);
   //    pay.save().then((pay) => {
   //       if (!pay) {
   //          return res.status(400).redirect('/error');
   //       }
   //       res.redirect('/receipt/' + pay._id);
   //    }).catch((error) => {
   //       res.redirect('/error');
   //       console.log(error)
   //    })
   //    axios(config).then((response) => {
   //       console.log(response)
   //       return res.status(200).redirect('/receipt/' + pay._id);
   //    }).catch((error) => {
   //       console.log(error)
   //    })
};


exports.receipt = (req, res) => {
   const id = req.params.id;
   Pay.findById(id).then((pay) => {
      if (!pay) {
         res.status(400).redirect('/error')
      }
      res.render('success', { pay });
   }).catch((err) => {
      console.log(err);
      res.status.redirect('/error')
   })
}

exports.error = (req, res) => {
   res.render('error')
}