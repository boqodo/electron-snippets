import constatnts from '../../constants.js'
import config from '../../config.js'

const defTags = constatnts.TAG_DEFAULT_LIST

function initLoad (fun) {
  let tags = config.readTags()
  fun(tags || defTags)
}

export default {
  initLoad: initLoad
}
