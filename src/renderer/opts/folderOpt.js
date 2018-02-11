import folder from '../../folder.js'
import helper from '../../helper.js'
import config from '../../config.js'
import constatnts from '../../constants.js'

const endLevel = constatnts.FOLDER_EXPAND_LEVEL
/**
 * 系统配置初始化加载文件夹列表
 * @param {any} setting 系统配置
 * @param {(f)=>{}} fun 执行函数
 */
function settingInitLoad (setting, fun) {
  folder.initLoad(setting.sys.storedir, {endLevel: endLevel}).then(fun)
}

/**
 *
 * 默认初始化加载文件列表
 * @param {(f)=>{}} fun 执行函数
 */
function initLoad (fun) {
  let setting = config.readSetting()
  let storedir = setting ? setting.sys.storedir : helper.getDefaultStoreDir()
  folder.initLoad(storedir, {endLevel: endLevel}).then(fun)
}

export default {
  settingInitLoad: settingInitLoad,
  initLoad: initLoad
}
