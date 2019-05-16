<template>
  <div id="app">
      <!-- <router-view /> -->
      <b-alert show variant="success" dismissible v-model="showRate">
        <btcindex />
      </b-alert>
      <b-button variant="success" @click="showRate=true">Show Rate</b-button>
  </div>
</template>

<script>

import btcindex from './components/BtcIndex.vue'

export default {
  name: 'app', 
  components: {btcindex},
  data() {
    return {
      showRate: true
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
