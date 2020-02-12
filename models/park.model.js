const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Aquí el esquema
const parkSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    active: Boolean,
}, {
    timestamps: true
})

module.exports = mongoose.model('Park', parkSchema)