const express = require('express')
const router = express.Router()

const listing = require('./listing.js')

router.get("/listings", listing.get)

router.post("/", listing.post)

router.delete('/:id', listing.deleteOne)

router.get('/listings/:id', listing.findById)

router.put('/listings/:id', listing.put)

module.exports = router