import os from 'os'
import fs from 'fs'
import path from 'path'
import { remote, clipboard } from 'electron'
import { spawn } from 'child_process'
const app = remote.app
/**
 * 从剪切板读取文本
 *
 * @returns {String}
 */
function readTextFromClip () {
  return clipboard.readText()
}
/**
 * 写入文本到剪切板
 * @param {String} text
 */
function writeTextToClip (text) {
  clipboard.writeText(text)
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

function getDefaultStoreDir () {
  return getHomeDir() || getAppStoreDir()
}

function getAppStoreDir () {
  let apppath = app.getAppPath()
  let index = apppath.indexOf('node_modules')
  return apppath.substring(0, index)
}

function getHomeDir () {
  let storedir = path.join(os.homedir(), 'snippets')
  if (!fs.existsSync(storedir)) {
    fs.mkdirSync(storedir)
  }
  return storedir
}

export default{
  readTextFromClip: readTextFromClip,
  writeTextToClip: writeTextToClip,
  hasGit: hasGit,
  getDefaultStoreDir: getDefaultStoreDir
}
