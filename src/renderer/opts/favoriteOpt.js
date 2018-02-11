import constatnts from '../../constants.js'
import config from '../../config.js'

const defFavorite = constatnts.FAVORITE_DEFAULT_LIST

function initLoad (fun) {
  let favorites = config.readFavorites()
  fun(favorites || defFavorite)
}

export default {
  initLoad: initLoad
}
