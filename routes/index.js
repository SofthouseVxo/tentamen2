const express = require('express')
const router = express.Router()

const listing = require('./listing.js')

router.get("/listings", listing.get)
router.post("/listings", listing.post)
router.get("/listings/:id", listing.getById)
router.delete("/listings/:id", listing.deleteById)
router.put("/listings/:id", listing.put)
// router.patch("/listings/:id", listing.patch)

module.exports = router