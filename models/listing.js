mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    Address: {
        type: String
    },
    Location: {
        type: String
    },
    Price: {
        type: Number
    },
    MonthlyFee: {
        type: String
    },
    Type: {
        type: String
    },
    Coordinate: {
        Longitude: {
            type: Number
        },
        Latitude: {
            type: Number
        }
    }

});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;