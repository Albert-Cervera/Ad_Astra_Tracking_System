export default {
  RESET_ORBIT_INFORMATION(state) {
    state.showLeo = null
    state.showMeo = null
    state.showHeo = null
    state.showGeo = null
    state.showUnc = null
    state.showSat = null
    state.showDebris = null
    state.showRocket = null
  },

  SET_LEO(state, payload) {
    state.showLeo = payload
  },

  SET_MEO(state, payload) {
    state.showMeo = payload
  },

  SET_HEO(state, payload) {
    state.showHeo = payload
  },

  SET_GEO(state, payload) {
    state.showGeo = payload
  },

  SET_UNC(state, payload) {
    state.showUnc = payload
  },

  SET_SAT(state, payload) {
    state.showSat = payload
  },

  SET_DEBRIS(state, payload) {
    state.showDebris = payload
  },

  SET_ROCKET(state, payload) {
    state.showRocket = payload
  },
  
}
