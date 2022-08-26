
require('dotenv').config();
const axios = require('axios');
const formData = require('form-data');
let formsData = new formData();
let secret = process.env.secret

/**
 * @file Title testing 1, 2, 3
 * @author Mebo David
 * @see <a href="https://github.com/meistens">Click this text to visit my GitHub profile</a>
 */

/**
 * Global declaration of this variable
 * 
 * @type {}
 */
let data = {
   "email": "testuser@mail.com",
   "amount": "1000000",
   "channels": ["card", "bank"]
};

/**
 * Initialize a transaction
 * @async
 * 
 * @function initializeTx
 * 
 * @returns {Promise<object>} Returns an object that contains an authorization url and reference, which are important
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
 * @param {string} reference String of data gotten from the object while initializing the transaction. Query your server to get the reference.
 * 
 * @returns {Promise<object>} Returns a large object with the status of the transaction at the top. 
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
 * list the transactions carried out on your account
 * @async
 * 
 * @function listTx
 * 
 * @returns {Promise<object>} Returns an object with a large payload.
 */
async function listTx() {
   try {
      // @ts-ignore
      let response = await axios({
         method: 'get',
         url: 'https://api.paystack.co/transaction',
         params: {
            perPage: 10,
         },
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
 * @returns {Promise<object>} Returns with the data object of the id one wants
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