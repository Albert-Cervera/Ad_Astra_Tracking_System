<template>
  <div class="home">
    <div v-if="showAlert" class="alert">
      This is an alert, maybe some debris is about to fall
    </div>

    <div>
      <Interface />
    </div>
  </div>
</template>

<script>

/*
<div>Ad Astra content will go here!</div>

    <div>Firestore data from: {{ (testData || {}).env }}</div>

    <div>
      <p><b>Vuex store</b></p>
      <div>Dev Count from state: {{ count }}</div>
      <button @click="increment">Increment</button>
    </div>

    <div>
      <p><b>Double binding</b></p>
      <div><input type="text" v-model="text" /></div>
      <Message :message="text" />
    </div>
*/
  import { computed, onMounted, ref } from 'vue'
  import { useStore } from 'vuex'
  //import Message from '@/components/Message'
  import Interface from '@/components/Interface'

  import { getTestData } from '@/services/TestService'
  

  export default {
    name: 'Home',

    components: {
      //Message,
      Interface,
    },

    setup() {
      // hooks
      const store = useStore()
      const {
        state: { counter },
        dispatch,
      } = store

      const text = ref('Hello, NASA!')
      const testData = ref(null)
      const count = computed(() => counter.count)

      const showAlert = computed(
        () =>          
          //true
          false
      )

      // methods
      const increment = () => dispatch('incrementCounter')

      onMounted(async () => {        
        const { response, error } = await getTestData()        
        if (!error) {
          testData.value = response
        }
      })

      return {
        text,
        testData,
        count,
        increment,
        showAlert,
      }
    },
  }
</script>

<style scoped>
  div {
    margin-bottom: 0.5em;
  }
  .alert {
    padding: 20px;
    background: rgb(246, 192, 0);
    color: rgb(4, 17, 29);
  }
</style>
