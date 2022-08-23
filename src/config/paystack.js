// @ts-check
require('dotenv').config();
const axios = require('axios');
const formData = require('form-data');
let formsData = new formData();
let secret = process.env.secret

/**
 * Global declaration of this variable
 * @type {string}
 */
let data = JSON.stringify({
   "email": "testuser@mail.com",
   "amount": "1000000",
   "channels": ["card", "bank"]
});

/**
 * initialize a transaction
 * @async
 * @function initializeTx
 * @returns {Promise<object|Error>} Object contains an authorization url. If not, error
 */
async function initializeTx() {
   try {
      // @ts-ignore
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
/**
 * verify transaction
 * @async
 * @function verifyTx
 * @param {string} reference
 * @returns {Promise<object|Error>} Transaction is successful, requires one to pass a callback url either on your paystack dashboard or configured server-side
 */
async function verifyTx(reference) {
   try {
      // @ts-ignore
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


/**
 * list the transactions carried out
 * @async
 * @function listTx
 * @returns {Promise<object|Error>} returns an object for all transactions. Pagination set by default or specify your range by passing the query parameters
 */
async function listTx() {
   try {
      // @ts-ignore
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
// fetch a transaction
/**
 * 
 * @param {number} id 
 * @returns {Promise<object|Error>}
 */
async function fetchTx(id) {
   try {
      // @ts-ignore
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