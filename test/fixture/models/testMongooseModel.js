const mongoose = require('mongoose')

module.exports = function (modelName) {
  return mongoose.model(modelName, new mongoose.Schema({ name: 'string' }))
}
