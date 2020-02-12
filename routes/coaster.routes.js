const express = require('express')
const router = express.Router()
const Coaster = require('../models/coaster.model')
const Park = require('../models/park.model')
// Aquí los endpoints
// coaster new
router.get('/new-coaster', (req, res) => {
    Park.find()
        .then(allParks => res.render('coasters/new-coaster', {
            park: allParks
        }))
})
router.post('/new-coaster', (req, res) => {

    const {
        name,
        description,
        length,
        inversions,
        active,
        park,
    } = req.body

    Coaster.create({
            name,
            description,
            length,
            inversions,
            active,
            park,
        })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
})
//coaster index
router.get('/coasters-index', (req, res) => {
    Coaster.find()
        .populate("park")
        .then(allCoasters => res.render('coasters/coasters-index', {
            coasters: allCoasters
        }))
        .catch(err => console.log("Error consultadno coasters en la BBDD: ", err))
})
//coaster details
router.get('/details/:theCoasterIdFromTheURL', (req, res) => {

    const coasterId = req.params.theCoasterIdFromTheURL

    Coaster.findById(coasterId)
        .populate('park')
        .then(theCoaster => res.render('coasters/coaster-details', theCoaster))
        .catch(err => console.log("Error consultadno coaster en la BBDD: ", err))
})

router.get('/delete/:theCoasterIdFromTheURL', (req, res) => {

    const coasterId = req.params.theCoasterIdFromTheURL

    Coaster.findByIdAndDelete(coasterId)
        .then((x) => res.redirect('/coasters/coasters-index'))
        .catch(err => console.log("ha ocurrido un error eliminando coasterde la DB", err))
})
router.get('/edit/:theCoasterIdFromTheURL', (req, res) => {

    const coasterId = req.params.theCoasterIdFromTheURL

    Coaster.findById(coasterId)
        .then(Park.find())
        .then(theCoaster => res.render('coasters/coaster-edit', theCoaster))
        .catch(err => console.log(err))
})
router.post('/edit/:coasterId', (req, res) => {
    console.log("EL Id del coaster que llega como URL param es:", req.params.coasterId)
    const coasterId = req.params.coasterId

    Coaster.findByIdAndUpdate(coasterId, req.body, {
            new: true
        })
        .then(x => res.redirect(`coasters/coaster-details/${coasterId}`))
        .catch(err => console.log(err))
})

module.exports = router