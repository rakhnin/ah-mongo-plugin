#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const originalConfigFile = path.normalize(path.join(__dirname, '..', 'config', 'mongo.js'))
const projectConfigFile = path.normalize(path.join(process.cwd(), '..', '..', 'config', 'mongo.js'))

if (!fs.existsSync(projectConfigFile)) {
  fs.createReadStream(originalConfigFile).pipe(fs.createWriteStream(projectConfigFile))
}

try {
  fs.mkdirSync(path.normalize(path.join(process.cwd(), '..', '..', 'models')))
} catch (e) {}
