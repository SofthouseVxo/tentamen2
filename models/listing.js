mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    Address: {
        type: String,
        required: true
    },
    Location: {
        type: String,
        required: true
    },
    Price: {
        type: String,
        required: true
    },
    MonthlyFee: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        required: true
    },
    Coordinate: {
        Longitude: {
            type: Number,
            required: true
        },
        Latitude: {
            type: Number,
            required: true
        }
    }
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;