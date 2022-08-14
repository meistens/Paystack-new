// need to figure out a way to use dotenv and store the keys properly
// remove all unused declarations during clean-up

const { default: axios } = require("axios");
let FormData = require('form-data');
let data = new FormData(); //this is an object, passing a form object does not work backend
// append the data, will it work?

const paystack = (axios) => {
   const secret = 'Bearer sk_test_ddfd03c492c8c283ec550f1925304d789a517e0a';

   const initializePayment = () => {
      let config = {
         method: 'post',
         url: 'https://api.paystack.co/transaction/initialize',
         headers: {
            authorization: secret,
            'content-type': 'application/json',
            'cache-control': 'no-cache'
         },
         data: data
      };
      axios(config).then((response) => {
         console.log(JSON.stringify(response.data));
      }).catch((error) => {
         console.log(error);
      });
   };

   // verify payment function
   const verifyPayment = () => {
      const config = {
         method: 'get',
         url: 'https://api.paystack.co/transaction/verify/' + encodeURIComponent(ref),
         headers: {
            authorization: secret,
            'content-type': 'application/json',
            'cache-control': 'no-cache'
         }
      }
      axios(config).then((response) => {
         console.log(response.data);
      }).catch((err) => {
         console.log(err);
      });
   }
   return { initializePayment, verifyPayment };
};

module.exports = paystack;