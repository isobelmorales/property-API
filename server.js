//// IMPORT DEPENDENCIES ////

require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')

//// IMPORT MODEL ////

const Property = require('./models/property')

//// DATABASE CONNECTION ////

// setup inputs
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

// establish connection
mongoose.connect(DATABASE_URL, CONFIG)

// events for when connection opens/disconnects/errors
mongoose.connection
    .on('open', () => console.log('Connected to Mongoose'))
    .on('close', () => console.log('Disconnected from Mongoose'))
    .on('error', (err) => console.log('An error occurred: \n', err))

//// EXPRESS APP OBJECT ////

const app = express()

//// MIDDLEWARE ////

app.use(morgan('tiny'))
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.json())