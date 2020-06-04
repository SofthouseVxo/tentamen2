dotify = require ('dotify');

get = (req, res, next) => {
  var query;
  if (req.query.location) {
    query = req.models.Listing.find({location: req.query.location});
  } 
  else 
  {
    query = req.models.Listing.find();
  }

  query.exec().then((listing) => {
    return res.send(listing);
  }).catch((error) => {
    next(error);
  });
};

post = (req, res, next) => {
  req.models.Listing.create({
    Address: req.body.Address,
    Location: req.body.Location,
    Price: req.body.Price,
    MonthlyFee: req.body.MonthlyFee,
    Type: req.body.Type,
    Bidding: req.body.Bidding,
    Coordinate: {
      Longitude: req.body.Coordinate.Longitude,
      Latitude: req.body.Coordinate.Latitude
    } 
  }).then((listing) => {
    return res.status(201).send(listing)
  }).catch((error) => {
    next(error)
  })
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
      Address: String,
      Location: String,
      Price: Number,
      MonthlyFee: String,
      Type: String,
      Bidding: true,
      Coordinate: {
        Longitude: Number,
        Latitude: Number
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
    console.log("listing after request:", listing)
    res.status(201).json(listing)
  }).catch((error) => next(error))
}


module.exports = {
  get,
  post,
  getById,
  deleteById,
  put,
  patch
}