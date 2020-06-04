mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    Adress: {
        type: String,
        require: true
    },
    Location: {
        type: String,
        require: true
    },
    Author: {
        type: String,
        require: true
    },
    Price: {
        type: Number,
        require: true
    },
    MonthlyFee: {
        type: String,
        require: true
    },
    Type: {
        type: String,
        require: true
    },
    Coordinate: {
        Longitude: {
            type: Number,
            require: true
        },
        Latitude: {
            type: Number,
            require: true
        }
    }
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;