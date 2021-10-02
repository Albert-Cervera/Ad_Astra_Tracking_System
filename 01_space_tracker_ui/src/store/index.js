import { createStore } from 'vuex'
import counter from './counter'

export default createStore({
  modules: {
    counter,    
  },
})
