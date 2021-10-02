<template>
  <div>
    <p><b>Ad Astra "To the stars!"</b></p>
    
    <el-switch
      v-model="showSatellites"
      active-text="Show satellites"
      inactive-text=":("
    >
    </el-switch>
    <br />
  

    <canvas id="canvasOne" width="1024" height="500" style="width: 100%; height: auto; background-color: black;">
        Your browser does not support HTML5 Canvas.
    </canvas>
    
  </div>
</template>

<script>
import { launchGlobe } from '@/services/WorldWindService'
import { onMounted, onUpdated, ref } from 'vue'

export default {
  name: 'Interface',

  setup() {
    const showSatellites = ref(true)
     
    // Methods

    onMounted(async () => {
      //console.log('Interface || mounted --------------------------')        
      launchGlobe()
      
    })

    onUpdated(async () => {
      //console.log('Interface || onUpdated')
      console.log('showSatellites: ', showSatellites.value)      
    })
 

    

    return {
      showSatellites,
    }

  },  
}
 
 

 
</script>
