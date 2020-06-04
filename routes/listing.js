//gets all listinfs or by location-query if provided
get = (req, res, next) => {
  let query;
  if (req.query.location) {
    query = req.models.Listing.find({
      location: req.query.location
    })
  } else {
    query = req.models.Listing.find()
  }
  query.exec()
    .then(properties => res.status(200).send(properties))
    .catch((error) => next(error))
}


//posts a new listing
post = (req, res, next) => {
  //destructuring requet body
  const { address, location, price, monthlyFee, type, coordinate } = req.body
  req.models.Listing.create({
    address: address,
    location: location,
    price: price,
    monthlyFee: monthlyFee,
    type: type,
    coordinate: {
      longitude: coordinate.longitude,
      latitude: coordinate.latitude
    }
  })
    .then(newProperty => res.status(201).send(newProperty))
    .catch(err => next(err))
}
//gets a specific listing by id
getById = (req, res, next) => {
  req.models.Listing.findById(req.params.id)
    .then(property => res.send(property))
    .catch((err) => next(err))
}
//deletes a specific listing by id
deleteById = (req, res, next) => {
  req.models.Listing.findByIdAndDelete(req.params.id)
    .then((property) => {
      if (property) {
        res.status(200).send(property)
      }
      res.status(204).send()
    })
    .catch(err => next(err))
}
//updates existing listing by id
updateById = (req, res, next) => {
  const { address, location, price, monthlyFee, type, coordinate } = req.body
  req.models.Listing.updateOne({ _id: req.params.id }, {
    address: address,
    location: location,
    price: price,
    monthlyFee: monthlyFee,
    type: type,
    coordinate: {
      longitude: coordinate.longitude,
      latitude: coordinate.latitude
    }
  }, {
    //returns the property after its been updated
    new: true,
    //cretes a new property if we dont find an existing listing with the provided id
    upsert: true,
  })
    .then((update) => {
      if (update.upserted) res.status(201).send("new document created")
      if (update.nModified) res.status(200).send("document updated")
      else res.status(204)
    })
    .catch(err => next(err))
}

module.exports = {
  get, post, getById, deleteById, updateById
}

