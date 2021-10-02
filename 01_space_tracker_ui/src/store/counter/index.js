import actions from './actions'
import mutations from './mutations'

const state = {
  count: 0,
}

export default {
  namespaced: false,
  actions,
  mutations,
  state,
}
