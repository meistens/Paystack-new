const { initializeTx, verifyTx, listTx, fetchTx } = require('./config/paystack')


async function init() {
   // initialize transaction API call
   let initialize = await initializeTx();
    console.log(initialize);

   // verify transaction API call
   // fetches reference from initialize endpoint
   // authorization url in there as well
   let verify = await verifyTx(initialize.data.reference)
    console.log(verify)

   // list transactions
   let listTxs = await listTx();
   console.log(listTxs)

   // fetch a transaction
   // fetches from verification endpoint using the id
   // using any endpoint aside this will throw a long error log(message at the end of the log)
   let  fetch = await fetchTx(verify.data.id)
   console.log(fetch)
};
init();

// initialize tx works. Test successful
// verify tx works, need to pass a reference to it
// update: IT WORKED!!!

// write a proper unit test and create a personal collection