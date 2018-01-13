'use strict'
const path = require('path')
const electron = require('electron')
const dataPath = (electron.app || electron.remote.app).getPath('userData')
const fileUrl = path.join(dataPath, 'config.json')
var nconf = require('nconf').file({file: fileUrl})

function save (key, value) {
  nconf.set(key, value)
  nconf.save()
}

function read (key) {
  nconf.load()
  return nconf.get(key)
}

module.exports = {
  save: save,
  read: read
}
