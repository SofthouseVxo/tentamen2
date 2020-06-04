dotify = require('node-dotify')

get = (req, res, next) => {
  let search = {}
  if (req.query.Adress) {
    search = { Adress: req.query.Adress }
  }
  if (req.query.Location) {
    search = { Location: req.query.Location }
  }
  req.models.Listing.find(search).then((listings) => {
    return res.send(listings);
  }).catch((error) => {
    next(error)
  })
}

{
  req.models.Listing.find().then((listings) => {
      return res.send(listings);
    }).catch((error) => next(error))
}

post = (req, res, next) => {
  req.models.Listing.create ({
    Adress: req.body.Adress,
    Location: req.body.Location,
    Author: req.body.Author,
    Price: req.body.Price,
    MonthlyFee: req.body.MonthlyFee,
    Type: req.body.Type,
    Coordinate: {
      Longitude: req.body.Longitude,
      Latitude: req.body.Latitude
    }
  }).then((book) => {
    return res.status(201).send(book)
  }).catch((error) => {
    next(error)
  })
}

getById = (req, res, next) => {
  req.models.Listing.findById(req.params.id).then((Listing) => {
    return res.send(Listing);
  }).catch((error) => next(error))
}

deleteById = (req, res, next) => {
  req.models.Listing.findByIdAndDelete(req.params.id).then((deleted) => {
    if (deleted)
      return res.send(deleted).status(200)
    res.sendStatus(204)
  }).catch((error) => next(error))
}

patch = (req, res, next) => {
  console.log(dotify(req.body))
  req.models.Listing.findByIdAndUpdate(req.params.id,
    {
      $set: dotify(req.body)
    },
    {
      returnNewDocument: true,
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
  getById,
  deleteById,
  patch,



}