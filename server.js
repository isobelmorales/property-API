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

//// ROUTES ////

// initial route
app.get('/', (req, res) => {
    res.send('Your server is running...better catch it.')
})

// seed route
app.get('/properties/seed', (req, res) => {
    const startProperties = [
        { name: 'Empire State Building', address: '20 W 34th St, New York, NY 10001', floors: 102, available: false },
        { name: 'One World Trade Center', address: '285 Fulton St, New York, NY 10007', floors: 104, available: false },
        { name: 'Chrysler Building', address: '405 Lexington Ave, New York, NY 10174', floors: 77, available: true }
    ]

    Property.deleteMany({})
        .then(() => {
            Property.create(startProperties)
                .then((data) => {
                    res.json(data)
                })
                .catch(err => console.log('The following error occured: \n', err))
    })
})

// index route
app.get('/properties', (req, res) => {
    Property.find({})
        .then(properties => { res.json({ properties: properties })})
        .catch(err => console.log('The following error occured: \n', err))
})

// create route
app.post('/properties', (req, res) => {
    const newProperty = req.body
    Property.create(newProperty)
        .then(property => {
            res.status(201).json({ property: property.toObject() })
        })
        .catch((err) => {
            console.log(err)
            res.json({ err })
        })
})

// update route
app.put('/properties/:id', (req, res) => {
    const id = req.params.id
    const updatedProperty = req.body
    Property.findByIdAndUpdate(id, updatedProperty, { new: true })
        .then(property => {
            console.log('the newly updated property', property)
            res.sendStatus(204)
        })
        .catch(err => console.log(err))
})

// delete route
app.delete('/properties/:id', (req, res) => {
    const id = req.params.id
    Property.findByIdAndRemove(id)
        .then(() => {
            res.sendStatus(204)
        })
        .catch(err => console.log(err))
})

// show route
app.get('/properties/:id', (req, res) => {
    const id = req.params.id
    Property.findById(id)
        .then(property => {
            res.json({ property: property })
        })
        .catch(err => console.log(err))
})

//// SERVER LISTENER ////

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))

//// END ////