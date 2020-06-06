const Listing = require('../models/listing')

get = (req, res, next) => {
  let findType = {}
  if (req.query.Type) {
    findType = { Type: req.query.Type }
  }
  req.models.Listing.find(findType).then((listings) => {
      return res.send(listings);
    }).catch((error) => next(error))
}

post = (req, res, next) => {
  console.log(req.body)
  const listing = new Listing({
    Address: req.body.Address,
    Location: req.body.Location,
    Price: req.body.Price,
    MonthlyFee: req.body.MonthlyFee,
    Type: req.body.Type,
    Coordinate: {
      Longitude: req.body.Coordinate.Longitude,
      Latitude: req.body.Coordinate.Latitude,
    }
  })
  try {
    const addedList = listing.save()
    res.status(201).send(addedList)
  }
  catch (err) {
    next(err)
  }
}

deleted = (req, res, next) => {
  Listing.findByIdAndDelete(req.params.id).then((deleted)=> {
    if (deleted)
      return res.status(200).send(deleted)
    res.sendStatus(204)
  }).catch((error) => next(error))
}
// req.models.User.findById(req.params.id).then((user) => {
  find = (req, res, next) => {
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
  deleted,
  find,
  put
}


