const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const mongoose = require("mongoose");
const PORT = 4000;
const listingRoutes = express.Router();

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
listingRoutes.route("/").get(function (req, res, next) {
  var name = req.query.name;
  if (name) {
    Listing.find({ Location: name }, function (err, listing) {
      res.status(200).json(listing);
    });
  } else {
    Listing.find(function (err, listings) {
      if (err) {
        next(err);
      } else {
        res.status(200).json(listings);
      }
    });
  }
});

//Create new Listing
listingRoutes.route("/").post(function (req, res, next) {
  let listing = new Listing(req.body);
  listing
    .save()
    .then((listing) => {
      res.status(201).json(listing);
    })
    .catch((err) => {
      next(err);
    });
});

//GET Listing by id
listingRoutes.route("/:id").get(function (req, res, next) {
  let id = req.params.id;
  Listing.findById(id, function (err, listing) {
    if (err) {
      next(err);
    } else {
      res.status(200).json(listing);
    }
  });
});

//DELETE Listing by id
listingRoutes.route("/:id").delete((req, res, next) => {
  Listing.findByIdAndDelete(req.params.id)
    .then((deleted) => {
      if (deleted) return res.send(deleted).status(200);
      res.sendStatus(204);
    })
    .catch((error) => next(error));
});

//PUT creates, updates and no change for listing
listingRoutes.route("/:id").put(function (req, res, next) {
  Listing.updateOne(
    { _id: req.params.id },
    {
      Address: req.body.Address,
      Location: req.body.Location,
      Price: req.body.Price,
      MonthlyFee: req.body.MonthlyFee,
      Type: req.body.Type,
      Coordinate: {
        Longitude: req.body.Coordinate.Longitude,
        Latitude: req.body.Coordinate.Latitude,
      },
    },
    {
      new: true,
      upsert: true,
      runvalidators: true,
    }
  )
    .then((status) => {
      console.log("status: ", status);
      if (status.upserted) {
        res.status(201);
      } else if (status.nModified) {
        res.status(200);
      } else {
        res.status(204);
      }
      Listing.findById(req.params.id).then((listing) => {
        res.send(listing);
      });
    })
    .catch((error) => next(error));
});

var options = {
  explorer: true,
  editor: true,
  swaggerOptions: {
    urls: [
      {
        url: "/swagger.yaml",
        name: "Spec1",
      },
    ],
  },
};

app.use("/", express.static(__dirname + "/swagger"));
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(null, options));
app.use("/listings", listingRoutes);

//If path doesnt exist
app.use((req, res, next) => {
  const err = new Error();
  err.status = 404;
  next(err);
});

//Custom Error Handler
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(error.statusCode || error.status || 500).send({ error: error });
});

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
