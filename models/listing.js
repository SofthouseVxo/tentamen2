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
            type: String,
            required: true
        },
        Latitude: {
            type: String,
            required: true
        }
    }
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;