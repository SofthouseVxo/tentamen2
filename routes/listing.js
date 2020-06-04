dotify = require('node-dotify')

get = (req, res, next) => {
  let search = {}
  if(req.query.Location){
    search = {Location: req.query.Location}
  }
  req.models.Listing.find(search).then((listings) => {
      return res.send(listings);
    }).catch((error) => {
      next(error)
    })
}

post = (req, res, next) => {
  // console.log(req.body.Location)
  req.models.Listing.create({
    Address: req.body.Address,
    Location: req.body.Location,
    Author: req.body.Author,
    Price: req.body.Price,
    MonthlyFee: req.body.MonthlyFee,
    Type: req.body.Type,
    Coordinate: {
      Longitude: req.body.Coordinate.Longitude,
      Latitude: req.body.Coordinate.Latitude
    }
  }).then((listings) => {
    console.log(req.body)
    return res.status(201).send(listings)
  }).catch((error) => next(error))
}

put = (req, res, next) => {
  req.models.Listing.updateOne({_id: req.params.id},
    {
      Address: req.body.Address,
      Location: req.body.Location,
      Author: req.body.Author,
      Price: req.body.Price,
      MonthlyFee: req.body.MonthlyFee,
      Type: req.body.Type,
      Coordinate:{
        Longitude: req.body.Coordinate.Longitude,
        Latitude: req.body.Coordinate.Latitude
      }
    },{
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

getById = (req, res, next) => {
  req.models.Listing.findById(req.params.id).then((listing) => {
    return res.send(listing)
  }).catch((error) => next(error))
}

deleteById = (req, res, next) => {
  req.models.Listing.findByIdAndDelete(req.params.id).then((deleted) => {
    if(deleted)
      return res.send(deleted).status(200)
    res.sendStatus(204)
  }).catch((error) => next(error))
}

module.exports = {
  get,
  post,
  put,
  getById,
  deleteById,
}