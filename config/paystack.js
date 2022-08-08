// need to figure out a way to use dotenv and store the keys properly
// remove all unused declarations during clean-up

const { default: axios } = require("axios");

const paystack = (axios) => {
   const secret = 'Bearer sk_';

   const initPayment = (form, callback) => {
      const options = {
         url: 'https://api.paystack.co/transaction/initialize',
         headers: {
            authorization: secret,
            'content-type': 'application/json',
            'cache-control': 'no-cache'
         }, form
      }
      // error handling
      let callBack = (err, response, body) => {
         return callback(err, body);
      }
      axios.post(options, callBack);
   }

   // verify payment function
   const verifyPayment = (ref, callback) => {
      const options = {
         url: 'https://api.paystack.co/transaction/verify/'+encodeURIComponent(ref),
         headers: {
            authorization: MySecretKey,
            'content-type': 'application/json',
            'cache-control': 'no-cache'
         }
      }
      let callBack = (err, response, body) => {
         return callback(err, body);
      }
      axios(options, callBack);
   }
   return { initPayment, verifyPayment };
};

module.exports = paystack;