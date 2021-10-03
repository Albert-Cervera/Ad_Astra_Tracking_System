export default {

  resetOrbitInformation({ commit }) {
    commit('RESET_ORBIT_INFORMATION')
  },

  setOrbitInformation({ commit }, orbitInformation) {
    commit('SET_ORBIT_INFORMATION', orbitInformation)
  },

  setLeo({ commit }, payload) {
    commit('SET_LEO', payload)
  },

  setMeo({ commit }, payload) {
    commit('SET_MEO', payload)
  },

  setHeo({ commit }, payload) {
    commit('SET_HEO', payload)
  },

  setGeo({ commit }, payload) {
    commit('SET_GEO', payload)
  },

  setUnc({ commit }, payload) {
    commit('SET_UNC', payload)
  },

  setSat({ commit }, payload) {
    commit('SET_SAT', payload)
  },

  setDebris({ commit }, payload) {
    commit('SET_DEBRIS', payload)
  },

  setRocket({ commit }, payload) {
    commit('SET_ROCKET', payload)
  },
   
}
