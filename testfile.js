const { initializeTx, verifyTx } = require('./config/paystack')


async function init() {
   // initialize transaction API call
   let initialize = await initializeTx();
  // console.log(initialize);

   // verify transaction API call
   let verify = await verifyTx(initialize.data.reference)
   console.log(verify)

};
init();

// initialize tx works. Test successful
// verify tx works, need to pass a reference to it
// update: IT WORKED!!!

// write a proper unit test and create a personal collection