const express = require('express')
const router = express.Router()

const listing = require('./listing.js')

router.get("/listings", listing.get)
router.post("/listings", listing.post)
router.patch("/listings", listing.patch)
router.delete("/listings", listing.deleteById)

module.exports = router