import {clipboard} from 'electron'
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

export default{
  readTextFromClip: readTextFromClip,
  writeTextToClip: writeTextToClip
}
