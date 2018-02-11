import path from 'path'
import fs from 'fs'
/**
 * 建立文件夹文件索引
 *
 * @param {string} rootpath 文件夹路径
 * @param {any} [{ startLevel = 1, endLevel = 100 }={}]
 * @returns
 */
async function load (rootpath, { startLevel = 1, endLevel = 100 } = {}) {
  let files = await readdir(rootpath)
  if (startLevel > endLevel) {
    let hasDir = files.some(f => fs.statSync(path.join(rootpath, f)).isDirectory())
    return {
      name: path.basename(rootpath),
      canExpand: hasDir, // TODO:根据是否有文件夹进行计算处理
      isExpand: hasDir,
      level: startLevel,
      items: []
    }
  } else {
    let fileItems = []
    let promises = files.filter(f => {
      let file = path.join(rootpath, f)
      let filestat = fs.statSync(file)
      let isdir = filestat.isDirectory()
      let extname = path.extname(f)
      let name = path.basename(f, extname)
      let createDate = dateFormat(filestat.birthtime)
      let fileStruct = {
        name: name,
        level: startLevel + 1,
        ext: extname.substring(1),
        createDate: createDate
      }
      fileItems.push(fileStruct)
      return isdir
    }).map(async f => {
      let folder = await load(path.join(rootpath, f), { startLevel: startLevel + 1, endLevel: endLevel })
      return folder
    })
    let results = await Promise.all(promises)
    let hasDir = results.length > 0
    return {
      name: path.basename(path.resolve(rootpath)),
      canExpand: hasDir,
      isExpand: hasDir,
      level: startLevel,
      items: results,
      files: fileItems
    }
  }
}

function dateFormat (date) {
  let month = String(date.getMonth() + 1).padStart(2, 0)
  let day = String(date.getDate() + 1).padStart(2, 0)
  return `${date.getFullYear()}-${month}-${day}`
}
/*
function stat (path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) {
        err.code === 'ENOENT' ? resolve(false) : reject(err)
      }
      resolve(stats)
    })
  })
}
*/
/**
 * 根据文件夹路径获取目录下的文件列表
 * @param {string} path 文件夹路径
 * @returns {Array.<string>} 文件列表
 */
function readdir (path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) reject(err)
      resolve(files.filter(item => !/(^|\/)\.[^/.]/g.test(item)))
    })
  })
}

export default {
  initLoad: load
}
