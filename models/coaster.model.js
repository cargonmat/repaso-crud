const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Aquí el esquema
const coasterSchema = new Schema({
    name: String,
    description: String,
    length: Number,
    inversions: Number,
    active: Boolean,
    park: [{
        type: Schema.Types.ObjectId,
        ref: 'Park'
    }],
}, {
    timestamps: true
})

module.exports = mongoose.model('Coaster', coasterSchema)