import path from 'path'
import electron from 'electron'
import config from 'nconf'

const settingKey = 'setting'
const tagsKey = 'tags'
const favoritesKey = 'favorites'

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

export default {
  save: save,
  read: read,
  saveSetting: (setting) => save(settingKey, setting),
  readSetting: () => read(settingKey),

  saveTags: (tags) => save(tagsKey, tags),
  readTags: () => read(tagsKey),

  saveFavorites: (favorites) => save(favoritesKey, favorites),
  readFavorites: () => read(favoritesKey)
}
