const { default: axios } = require("axios");
const Pay = require('../models/payments');
const { initPayment, verifyPayment } = require('../config/paystack')(axios);
const _ = require('lodash');
const { reject } = require("lodash");

class paymentService {
   startPayment(data) {
      return new Promise(async (resolve, reject) => {
         try {
            const form = _.pick(data, ['amount', 'email', 'full_name']);
            form.metadata = {
               full_name: form.full_name
            }
            form.amount *= 100;

            initPayment(form, (err, body) => {
               if(err) {
                  reject(err.message);
               }
               const response = JSON.parse(body);
               console.log(response);
               return resolve(response);
            });
         } catch (error) {
          error.source = 'Start Payment Service';
          return reject(error);
         }
      })
   }

   createPayment(req) {
      const ref = req.reference;
      if(ref === null) {
         return reject({ code: 400, message: 'No reference passed in the query object!'});
      }
      // console.log(ref);
      return new Promise(async (resolve, reject) => {
         try {
            verifyPayment(ref, (err, body) => {
               
            })
         } catch (error) {}
      })
   }
}