const Listing = require('../models/listing')
const uuid = require('uuid')

get = (req, res, next) => {
  req.models.Listing.find().then((listings) => {
      return res.send(listings);
    }).catch((error) => next(error))
}

post = (req, res, next) => {
  console.log(req.body)
  const listing = new Listing({
    Id: uuid.v4(),
    Address: req.body.Address,
    Location: req.body.Location,
    Price: req.body.Price,
    MonthlyFee: req.body.MonthlyFee,
    Type: req.body.Type,
    Coordinate: {
      Longitude: req.body.Longitude,
      Latitude: req.body.Latitude
    }
  })
  try {
    const newListing = listing.save()
    res.status(201).send(newListing)
  }
  catch (err) {

    res.status(400).json({ message: err.message })
  }
}

deleted = (async (req, res) => {
  const message = await Listing
    .findByIdAndRemove(req.params.id)
    .then(() => 'deleted');

  res.json({ message });
})

findById = (async (req, res) => {

  const message = await Listing
    .findById(req.params.id)
    .then(() => 'List Found');
  res.json({ message});
  
})

put = (req, res) => {
  req.models.Listing.updateOne({ _id: req.params.id },
    {
      Address: req.body.Address,
      Location: req.body.Location,
      Price: req.body.Price,
      MonthlyFee: req.body.MonthlyFee,
      Type: req.body.Type,
      Coordinate: {
        Longitude: req.body.Longitude,
        Latitude: req.body.Latitude
      },
    }, {

  }).then(() => {
    req.models.Listing.findById(req.params.id).then((listing) => {
      res.send(listing)
    })
  }).catch((error) => next(error))
}


module.exports = {
  get,
  post,
  deleted,
  findById,
  put
}


