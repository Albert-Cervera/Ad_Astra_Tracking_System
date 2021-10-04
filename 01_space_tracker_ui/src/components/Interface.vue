<template slot-scope="scope">
  <div style="background-color: black;">

    <div class="text"> <h1><b>ORBIT WEB DEBRIS TRACKER (O.W.D.T.)</b></h1> </div>
    <div class="text"> <p><b>Ad Astra: To the Stars!</b></p> </div>

    <b-container class="bv-example-row">
      <b-row>
        <b-col> 

          <el-switch
            v-model="showLeo"
            active-text="Show LEO"
            inactive-text="Off"
          >
          </el-switch> 

          &nbsp;

          <el-switch
            v-model="showMeo"
            active-text="Show MEO"
            inactive-text="Off"
          >
          </el-switch>

          &nbsp;

          <el-switch
            v-model="showHeo"
            active-text="Show HEO"
            inactive-text="Off"
          >
          </el-switch>

          &nbsp;

          <el-switch
            v-model="showGeo"
            active-text="Show GEO"
            inactive-text="Off"
          >
          </el-switch>

          &nbsp;

          <el-switch
            v-model="showUnc"
            active-text="Show UNC"
            inactive-text="Off"
          >
          </el-switch>

          &nbsp;


        </b-col>
        
        <b-col> 
          <br />
          <el-switch
            v-model="showSat"
            active-text="Show Satellites"
            inactive-text="Off"
          >
          </el-switch>

          &nbsp;
          
          <el-switch
            v-model="showDebris"
            active-text="Show Debris"
            inactive-text="Off"
          >
          </el-switch>

          &nbsp;
          
          <el-switch
            v-model="showRocket"
            active-text="Show Rocket"
            inactive-text="Off"
          >
          </el-switch> 


        </b-col>
      </b-row>
    </b-container>
    <br />
    
    
    <canvas id="canvasOne" width="1024" height="400" style="width: 100%; height: auto; background-color: black;">
        Your browser does not support HTML5 Canvas.
    </canvas>
    <br />
    
    <div class="text"> <p><b>NASA App Challenge 2021 || Team: Albert Aarón Cervera Uribe, Jibin Rajan Varghese, Juan Guillermo Reséndiz Rojas, Paulina Palomino Alvarado and Gerardo Valencia Bacerra</b></p> </div>
  </div>
</template>

<script>
import { launchGlobe } from '@/services/WorldWindService'
import { onMounted, onUpdated, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Interface',

  setup() {
    const showLeo = ref(true)
    const showMeo = ref(true)
    const showHeo = ref(true)
    const showGeo = ref(true)
    const showUnc = ref(true)
    const showSat = ref(true)
    const showDebris = ref(true)
    const showRocket = ref(true)

    // hooks
      const store = useStore()
      const { dispatch } = store
     

    // Methods

    onMounted(async () => {
      //console.log('Interface || mounted --------------------------')
      dispatch('setLeo', showLeo.value)
      dispatch('setMeo', showMeo.value)
      dispatch('setHeo', showHeo.value)
      dispatch('setGeo', showGeo.value)        
      dispatch('setUnc', showUnc.value)
      dispatch('setSat', showSat.value) 
      dispatch('setDebris', showDebris.value) 
      dispatch('setRocket', showRocket.value)  
      
      launchGlobe()
      
    })

    onUpdated(async () => {
      console.log('Interface || onUpdated') 
      dispatch('setLeo', showLeo.value)
      dispatch('setMeo', showMeo.value)
      dispatch('setHeo', showHeo.value)
      dispatch('setGeo', showGeo.value)
      dispatch('setUnc', showUnc.value)
      dispatch('setSat', showSat.value) 
      dispatch('setDebris', showDebris.value) 
      dispatch('setRocket', showRocket.value)
      console.log('launch..')                  
      launchGlobe()           
    })    
    
    const dispatchState = async () => {   
      console.log('dispatch state') 
      console.log('showDebris.value ', showDebris.value)
      dispatch('setLeo', showLeo.value)
      dispatch('setMeo', showMeo.value)
      dispatch('setHeo', showHeo.value)
      dispatch('setGeo', showGeo.value)
      dispatch('setUnc', showUnc.value)
      dispatch('setSat', showSat.value) 
      dispatch('setDebris', showDebris.value) 
      dispatch('setRocket', showRocket.value)
      launchGlobe()
      
    }

    return {
      showLeo,
      showMeo,
      showHeo,
      showGeo,
      showUnc,
      showSat,    
      showDebris,
      showRocket,
      dispatchState,
    }

  },  
}
  
 
</script>

<style scoped>
  div {
    margin-bottom: 0.5em;
  }
  .text {  
    color: rgb(255, 255, 255);
  }
</style>