//// SCHEMA AND MODEL ////

// import mongoose
const mongoose = require('mongoose')

// destructure schema and model functions
const { Schema, model } = mongoose

// property schema
const propertySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
    size: Number,
    available: Boolean
})

// property model
const Property = model('Property', propertySchema)

//// EXPORT MODEL ////

module.exports = Property