import actions from './actions'
import mutations from './mutations'

const state = {
  showLeo: '',
  showMeo: '',
  showHeo: '',
  showGeo: '',
  showUnclassified: '',
  showSat: '',
  showDebris: '',
  showRocket: '',
}

export default {
  namespaced: false,
  actions,
  mutations,
  state,
}
