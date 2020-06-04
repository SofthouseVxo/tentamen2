const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 4000;
const listingRoutes = express.Router();
const createError = require("http-errors");

let Listing = require("./listing.model");

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/listings", {
  useNewUrlParser: true,
});
const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

//Get all Listings and find by Location
listingRoutes.route("/").get(function (req, res) {
  var name = req.query.name;
  if (name) {
    Listing.find({ Location: name }, function (err, listing) {
      res.json(listing);
    });
  } else {
    Listing.find(function (err, listings) {
      if (err) {
        console.log(err);
      } else {
        res.json(listings);
        console.log();
      }
    });
  }
});

//Create new Listing
listingRoutes.route("/").post(function (req, res) {
  let listing = new Listing(req.body);
  listing
    .save()
    .then((listing) => {
      res.status(201).json(listing);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

//GET Listing by id
listingRoutes.route("/:id").get(function (req, res, next) {
  let id = req.params.id;
  Listing.findById(id, function (err, listing) {
    res.json(listing);
  });
});

//DELETE Listing by id
listingRoutes.route("/:id").delete((req, res) => {
  Listing.findByIdAndDelete(req.params.id)
    .then(() => res.json("Deleted"))
    .catch((err) => res.status(404).json(err));
});

//PUT updates listing
listingRoutes.route("/:id").put(function (req, res) {
  Listing.findById(req.params.id, function (err, listing) {
    if (!listing) res.status(404).send(err);
    else {
      listing.Address = req.body.Address;
      listing.Location = req.body.Location;
      listing.Price = req.body.Price;
      listing.MonthlyFee = req.body.MonthlyFee;
      listing.Type = req.body.Type;
      listing.Coordinate.Longitude = req.body.Coordinate.Longitude;
      listing.Coordinate.Latitude = req.body.Coordinate.Latitude;

      listing.save().then((listing) => {
        res.json(listing);
      });
    }
  });
});

app.use("/listings", listingRoutes);

//404 Not Found handler, => to Error Handler
app.use((req, res, next) => {
  next(createError(404, "Not Found"));
});

//Error Handler, Gives error 500 or the passed error object into Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
