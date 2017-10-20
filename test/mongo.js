const path = require('path')
const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect
chai.use(dirtyChai)

process.env.PROJECT_ROOT = path.join(__dirname, '..', 'node_modules', 'actionhero')
process.env.ACTIONHERO_CONFIG = path.join(__dirname, '..', 'config')
const ActionHero = require('actionhero')
const actionhero = new ActionHero.Process()
let api

describe('ah-mongo-plugin', () => {
  before(async () => {
    let configChanges = {
      plugins: {
        'ah-mongo-plugin': { path: path.join(__dirname, '..') }
      }
    }
    api = await actionhero.start({configChanges})
  })

  after(async () => { await actionhero.stop() })

  it('should be initialized', async () => {
    expect(api.mongo).to.exist()
    expect(api.mongo).to.be.instanceof(Object)
  })

  it('should load models', async () => {
    expect(api.mongo.models).to.exist()
    expect(api.mongo.models.TestMongooseModel).to.exist()
    expect(api.mongo.models.TestMongooseModel).to.be.a('function')
  })
})
