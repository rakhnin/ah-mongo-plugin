'use strict'

const ActionHero = require('actionhero')
const api = ActionHero.api
const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')

module.exports = class Mongo extends ActionHero.Initializer {
  constructor () {
    super()
    this.name = 'mongo'
    this.loadPriority = 1000
    this.startPriority = 1000
    this.stopPriority = 1000
  }

  async initialize () {
    mongoose.Promise = global.Promise
    api.mongo = {
      config: api.config.mongo || {},
      mongoose: mongoose,
      models: [],
      init: function () {
        this.initLogger()
        this.initModels()
      },
      initLogger: function () {
        const logLevel = this.config.logLevel
        if (logLevel) {
          this.mongoose.set('debug', function () {
            api.log && api.log('[ ah-mongo-plugin ]', logLevel, Array.prototype.slice.call(arguments))
          })
        }
      },
      initModels: function () {
        if (this.config.modelPath) {
          const dir = path.normalize(this.config.modelPath)
          fs.readdirSync(dir).forEach((file) => {
            const filePath = path.join(dir, file)
            let name = path.parse(filePath).name
            if (name[0]) {
              name = name[0].toUpperCase() + name.substring(1)
            }
            this.models[name] = require(filePath)
          })
        }
      },
      connect: async function () {
        if (this.config.isAutoStart) {
          try {
            await this.mongoose.connect(this.config.connectionURL, this.config.connectionOptions || {})
          } catch (e) {
            throw e
          }
        }
      },
      disconnect: async function () {
        await this.mongoose.disconnect()
      }
    }
    api.mongo.init()
  }

  async start () {
    await api.mongo.connect()
  }
  async stop () {
    await api.mongo.disconnect()
  }
}
