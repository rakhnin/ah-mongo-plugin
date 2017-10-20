const mongoose = require('mongoose')

module.exports = mongoose.model('TestMongooseModel', new mongoose.Schema({ name: 'string' }))
