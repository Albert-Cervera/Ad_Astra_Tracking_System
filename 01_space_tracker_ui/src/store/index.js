import { createStore } from 'vuex'
import counter from './counter'
import celestial_objects from './celestial_objects'

export default createStore({
  modules: {
    counter,
    celestial_objects,    
  },
})
