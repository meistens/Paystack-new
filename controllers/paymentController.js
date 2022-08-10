
exports.getForm = (req, res) => {
   res.render('index');
};

// node: internal / process / promises: 279
// triggerUncaughtException(err, true /* fromPromise */);
//             ^

//    [UnhandledPromiseRejection: This error originated either by throwing inside of an 
// async function without a catch block, or 
// by rejecting a promise which was not handled with .catch().The promise rejected with the reason "AxiosError: Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream".] {
//    code: 'ERR_UNHANDLED_REJECTION'
// cannot tell where on earth the promise is from ... this is annoying
exports.postForm = (req, res) => {
   return new Promise(async (resolve, reject) => {
   try {
      const form = _.pick(req.body, ['full_name', 'email', 'amount']);
      form.metadata = {
         full_name: form.full_name
      }
      form.amount *= 100;
      initPayment(form, (err, body) => {
         if (err) {
            reject(err.message) // console.log(err);
            return res.status(400).redirect('/error')
         }
         const response = JSON.parse(body);
         res.status(200).redirect(response.data.authorization_url)
      });
   } catch (error) {
      error.source = 'start'
      return error
   }
})
};

exports.callback = (req, res) => {
   const ref = req.query.reference;
   verifyPayment(ref, (err, body) => {
      if (err) {
         console.log(err)
         return res.status(400).redirect('/error');
      }
      response = JSON.parse(body);

      const data = _.at(response.data, ['reference', 'amount', 'customer.email', 'metadata.full_name']);
      [reference, amount, email, full_name] = data;
      newPay = { reference, amount, email, full_name }


      const pay = new Pay(newPay)
      pay.save().then((pay) => {
         if (!pay) {
            return res.status(400).redirect('/error');
         }
         res.redirect('/receipt/' + pay._id);
      }).catch((error) => {
         console.log(error)
         res.redirect('/error');
      });
   });
};

