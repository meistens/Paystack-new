// rewrite psystack module with axios server side
require('dotenv').config();
const axios = require('axios');
const formData = require('form-data');
let formsData = new formData();
let secret = process.env.secret


let data = JSON.stringify({
   "email": "testuser@mail.com",
   "amount": "1000000",
   // add more parameters to test it
   "channels": ["card", "bank"]
});
// console.log(data);

async function initializeTx() {
   try {
      let response = await axios({
         method: 'post',
         url: 'https://api.paystack.co/transaction/initialize',
         headers: {
            'Authorization': secret,
            'Content-Type': 'application/json',
            'cache-control': 'no-cache'
         },
         data: data
      });
      return response.data
   } catch (err) {
      console.log(err)
   }
}

// verify transaction
async function verifyTx(reference) {
   try {
      let response = await axios({
         method: 'get',
         url: `https://api.paystack.co/transaction/verify/${reference}`,
         headers: {
            'Authorization': secret,
            ...formsData.getHeaders(),
            'cache-control': 'no-cache'
         },
         formsData: formsData
      });
      return response.data
   } catch (err) {
      console.log(err);
   }
}


// list transactions
// same idea as above but there is the option of passing query parameters, either to paginate (added automatically) or add more parameters to the query string
async function listTx() {
   try {
      let response = await axios({
         method: 'get',
         url: 'https://api.paystack.co/transaction',
         params: {
            perPage: 10,
            customer: this.customer,
            status: 'this.status'
         },
         // this.customer necessary?
         headers: {
            'Authorization': secret,
            ...formsData.getHeaders(),
            'cache-control': 'no-cache'
         },
         formsData: formsData,
         timeout: 6000,
      });
      return response.data
   } catch (err) {
      console.log(err);
   }
}

async function fetchTx(id) {
   try {
      let response = await axios({
         method: 'get',
         url: `https://api.paystack.co/transaction/${id}`,
         headers: {
            'Authorization': secret,
            ...formsData.getHeaders(),
            'cache-control': 'no-cache'
         },
         formsData: formsData
      });
      return response.data
   } catch (err) {
      console.log(err);
   }
}




// reference passed as a parameter is a query string but also helps to chain the reference to the data gotten from initializing the  transaction

// for RESTful use with express, pass the data/form in initializeTx() as the parameter instead of hardcoding unless by request

// create an instance to prevent connection from randomly timing out at all, i mean i am the only one making the calls



module.exports.initializeTx = initializeTx;
module.exports.verifyTx = verifyTx;
module.exports.listTx = listTx;
module.exports.fetchTx = fetchTx;