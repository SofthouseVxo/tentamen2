mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
        Address:{
            type:String
        },
        Location:{
            type:String
        },
        Price:{
            type:String
        },
        MonthlyFee :{
            type:String
        },
        Type:{
            type:String
        },
        Coordinate : {
            Longitude: {
                type:Number
            },
            Latitude: {
                Type:Number
            },
        }
    
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;