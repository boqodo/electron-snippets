import {clipboard} from 'electron'
import { spawn } from 'child_process'
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

export default{
  readTextFromClip: readTextFromClip,
  writeTextToClip: writeTextToClip,
  hasGit: hasGit
}
