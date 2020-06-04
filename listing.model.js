const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let Listing = new Schema({
  Address: {
    type: String,
  },
  Location: {
    type: String,
  },
  Price: {
    type: Number,
  },
  MontlyFee: {
    type: String,
  },
  Type: {
    type: String,
  },
  Coordinate: {
    Longitude: {
      type: Number,
    },
    Latitude: {
      type: Number,
    },
  },
});
module.exports = mongoose.model("Listing", Listing);
