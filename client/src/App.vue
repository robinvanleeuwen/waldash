<template>
  <div id="app">
      <!-- <router-view /> -->
      <div id="container">
        <b-alert id="btcrate" show variant="success" dismissible v-model="showRate">
          <btcindex />
        </b-alert>
        <b-button variant="success" @click="showRate=true">Show Rate</b-button>
      </div>
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
#btcrate {
  font-size: 18px;
  font-weight: bold;
}
#container {
  margin-right: 40%;
  margin-left: 40%;
}
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
