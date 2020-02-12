const express = require('express')
const router = express.Router()
const Park = require('../models/park.model')
// Aquí los endpoints
router.get('/new-park', (req, res) => res.render('parks/new-park'))
router.post('/new-park', (req, res) => {

    const {
        name,
        description,
        active,
    } = req.body

    Park.create({
            name,
            description,
            active,
        })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
})
module.exports = router