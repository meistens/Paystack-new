// need to figure out a way to use dotenv and store the keys properly
// remove all unused declarations during clean-up

// const { default: axios } = require("axios");


// how not to hardcode this but use it when a user inputs his/her data?
let data = JSON.stringify({
// use of formdata or not?
})

const paystack = (axios) => {
   const secret = 'Bearer sk_';

   const initializePayment = () => {
      let config = {
         method: 'post',
         url: 'https://api.paystack.co/transaction/initialize',
         headers: {
            authorization: secret,
            'content-type': 'application/json',
            'cache-control': 'no-cache'
         }, data
      }
      axios(config).then((response) => {
         console.log(response.data);
      }).catch((error) => {
         console.log(error);
      });
   };

   // verify payment function
   const verifyPayment = () => {
      const config = {
         method: 'get',
         url: 'https://api.paystack.co/transaction/verify/'+encodeURIComponent(ref),
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