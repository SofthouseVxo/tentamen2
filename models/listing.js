mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  monthlyFee: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  coordinate: {
    longitude: {
      type: Number,
      required: true
    },
    latitude: {
      type: Number,
      required: true
    }
  }
})



const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;

