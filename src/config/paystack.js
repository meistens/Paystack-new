// @ts-check
require('dotenv').config();
const axios = require('axios');
const formData = require('form-data');
let formsData = new formData();
let secret = process.env.secret

/**
 * Global declaration of this variable
 * 
 * @type {string}
 */
let data = JSON.stringify({
   "email": "testuser@mail.com",
   "amount": "1000000",
   "channels": ["card", "bank"]
});

/**
 * Initialize a transaction
 * @async
 * 
 * @function initializeTx
 * 
 * @returns {Promise<object|Error>} Object contains an authorization url. If error, debug your code|check with the team whose API you are consuming
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

/**
 * verify an initialized transaction
 * @async
 * 
 * @function verifyTx
 * 
 * @param {string} reference For use in the server, query the server to get the reference immediately a transaction is initialized
 * 
 * @returns {Promise<object|Error>} Transaction is successful, requires one to pass a callback url either on your paystack dashboard or configured server-side. If error, debug your code|check with the team whose API you are consuming
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
 * 
 * @function listTx
 * 
 * @returns {Promise<object|Error>} Returns an object with a large payload. Pagination set by default or specify your range by passing it as a query parameter. If no payload, throws an error and debug|check with the team whose API you are consuming
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
         // this.customer and status necessary?
         // best not to pass it to the url string
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

/**
 * Fetch a transaction carried out on your account
 * 
 * @function fetchTx
 * 
 * @param {number} id Send a query to fetch the id, which is passed as a callback parameter
 * 
 * @returns {Promise<object|Error>} Returns with the data object of that particular id. If error, debug your code|check with the team whose API you are consuming
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

// create an instance to prevent connection from randomly timing out at all, i mean i am the only one making the calls



module.exports.initializeTx = initializeTx;
module.exports.verifyTx = verifyTx;
module.exports.listTx = listTx;
module.exports.fetchTx = fetchTx;