
const Listing = require('../models/listing')

get = (req, res, next) => {
  let find = {}
  if (req.query.Type) {
    find = { Type: req.query.Type }
  }
  req.models.Listing.find(find).then((listings) => {
    return res.send(listings);
  }).catch((error) => next(error))
}

post = (req, res, next) => {
  console.log(req.body)
  const listing = new Listing({
    id: req.body.id,
    Address: req.body.Address,
    Location: req.body.Location,
    Price: req.body.Price,
    MonthlyFee: req.body.MonthlyFee,
    Type: req.body.Type,
    Coordinate: {
      Longitude: req.body.Coordinate.Longitude,
      Latitude: req.body.Coordinate.Latitude
    }
  })
  try {
    const newListing = listing.save()
    res.status(201).send(newListing)
  }
  catch (err) {
    next(err)
  }
}

deleteOne = (req, res, next) => {
  Listing.findByIdAndRemove(req.params.id).then((deleted) => {
    if (deleted)
      return res.send(deleted).status(200)
    res.sendStatus(204)
  }).catch((error) => next(error))
}


// findById = (req, res) => {

//   req.models.Listing.findById(req.params.id)
//     .then((listings) => {
//       return res.send(listings);
//     }).catch((error) 
// }

findById = (req, res, next) => {
  req.models.Listing.findById(req.params.id).then((found) => {
    return res.send(found);
  }).catch((error) => next(error))
}


put = (req, res, next) => {
  req.models.Listing.updateOne({ _id: req.params.id },
    {
      Address: req.body.Address,
      Location: req.body.Location,
      Price: req.body.Price,
      MonthlyFee: req.body.MonthlyFee,
      Type: req.body.Type,
      Coordinate: {
        Longitude: req.body.Coordinate.Longitude,
        Latitude: req.body.Coordinate.Latitude
      },
    }, {
    new: true,
    upsert: true,
    runvalidators: true,
  }).then((status) => {
    console.log("status: ", status)
    if (status.upserted) {
      res.status(201)
    } else if (status.nModified) {
      res.status(200)
    } else {
      res.status(204)
    }
    req.models.Listing.findById(req.params.id).then((listing) => {
      res.send(listing)
    })
  }).catch((error) => next(error))
}


module.exports = {
  get,
  post,
  deleteOne,
  findById,
  put
}