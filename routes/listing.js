dotify = require('node-dotify')

get = (req, res, next) => {
  let search = {}
  if(req.query.Location){
    search = {Location: req.query.Location}
  }
  if(req.query.Author){
    search = {Author: req.query.Author}
  }
  req.models.Listing.find(search).then((listings) => {
      return res.send(listings);
    }).catch((error) => {
      next(error)
    })
}

post = (req, res, next) => {
  req.models.Listing.create({
    Address: req.body.Address,
    Location: req.body.Location,
    Author: req.body.Author,
    Price: req.body.Price,
    MonthlyFee: req.body.MonthlyFee,
    Type: req.body.Type,
    Coordinate: {
      Longitude: req.body.Coordinate.Longitude,
      Latitude: req.body.Coordinate.Latitude,
    }
  }).then((listings) => {
    return res.status(201).send(listings)
  }).catch((error) => next(error))
}

getById = (req, res, next) => {
  req.models.Listing.findById(req.params.id).then((listing) => {
    return res.send(listing);
  }).catch((error) => next(error))
}

deleteById = (req, res, next) => {
  req.models.Listing.findByIdAndDelete(req.params.id).then((deleted)=> {
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
  }).then((listing) => {
    console.log("Listing after request:", listing)
    res.status(201).json(listing)
  }).catch((error) => next(error))
}

module.exports = {
  get,
  post,
  getById,
  deleteById,
  patch
}
