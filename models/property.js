//// SCHEMA AND MODEL ////

// import mongoose
const mongoose = require('mongoose')

// destructure schema and model functions
const { Schema, model } = mongoose

// property schema
const propertySchema = new Schema({
    name: String,
    address: String,
    floors: Number,
    available: Boolean
})

// property model
const Property = model('Property', propertySchema)

//// EXPORT MODEL ////

module.exports = Property