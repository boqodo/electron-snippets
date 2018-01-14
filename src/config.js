import path from 'path'
import electron from 'electron'
import config from 'nconf'
import { spawn } from 'child_process'
const settingKey = 'setting'
const dataPath = (electron.app || electron.remote.app).getPath('userData')
const fileUrl = path.join(dataPath, 'config.json')
const nconf = config.file({file: fileUrl})
/**
 * 保存键值对
 *
 * @param {String} key
 * @param {any} value
 */
function save (key, value) {
  nconf.set(key, value)
  nconf.save()
}
/**
 * 读取键对应的值
 *
 * @param {String} key
 * @returns {any}
 */
function read (key) {
  nconf.load()
  return nconf.get(key)
}
/**
 * 检查环境中是否包含git
 *
 * @returns {Promise.<boolean>}
 */
function hasGit () {
  return new Promise((resolve, reject) => {
    let git = spawn('git', ['--version'])

    git.stdout.on('data', data => {
    })

    git.on('error', data => {
      reject(data)
    })

    git.on('close', code => {
      if (code === 0) {
        resolve(true)
      } else {
        reject(code)
      }
    })
  })
}

export default {
  save: save,
  read: read,
  hasGit: hasGit,
  saveSetting: (setting) => save(settingKey, setting),
  readSetting: () => read(settingKey)
}
