'use strict'

const connectionURL = process.env.MONGO_DB_URL || 'mongodb://127.0.0.1:27017/test'
const path = require('path')

exports['default'] = {
  mongo: (api) => {
    return {
      connectionURL: connectionURL,
      // see http://mongoosejs.com/docs/connections.html#options
      connectionOptions: {
        useMongoClient: true,
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE
      },
      isUseDebug: true,
      isAutoStart: true,
      modelPath: path.join(api.projectRoot, 'models')
    }
  }
}

exports['test'] = {
  mongo: (api) => {
    return {
      modelPath: path.join(__dirname, '../test/fixture/models')
    }
  }
}
