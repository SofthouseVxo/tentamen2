get = (req, res, next) => {
  var query;
if(req.query.address){
  query = req.models.address.find({address: req.query.address})
}
else
{
  query = req.models.Listings.find()
}

  query.exec().then((listings) => {
      return res.send(listings);
    }).catch((error) => next(error))
  }

post = (req, res, next) => {
  req.models.Listing.create({

    address: req.body.address,
    location: req.body.location,
    price: req.body.price,
    monthlyFee: req.body.monthlyFee,
    coordinate: {
      lat: req.body.coordinate.lat,
      lng: req.body.coordinate.lng,
      }
  }).then((listing) => {
    return res.status(201).send(listing)
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

put = (req, res, next) => {
  req.models.Listing.updateOne({_id: req.params.id},
    {
    address: req.body.address,
    location: req.body.location,
    price: req.body.price,
    monthlyFee: req.body.monthlyFee,
    coordinate: {
      lat: req.body.coordinate.lat,
      lng: req.body.coordinate.lng,
    },

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

// const patch = (req, res, next) => {
//   req.models.Listing.findByIdAndUpdate(req.params.id,
//   { 
//     $set: req.body
//   },
//   {
//     returnNewDocument: true,
//   }).then((listing) => {
//     res.send(listing)
//   }).catch((error) => next(error))
// }

module.exports = {
  get,
  post,
  getById,
  deleteById,
  put,
  // patch
}