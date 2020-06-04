mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    monthlyFee: {
        type: Number,
        required: true,
    },
    coordinate: {
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;