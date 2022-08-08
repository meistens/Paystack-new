const mongoose = require('../config/mongoose');
const Schema = mongoose.Schema;

// payment form schema
const paySchema = new Schema({
   full_name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   amount: {
      type: Number,
      required: true
   },
   reference: {
      type: String,
      required: true
   }
}, { timestamps: true });

module.exports = mongoose.model('Pay', paySchema);