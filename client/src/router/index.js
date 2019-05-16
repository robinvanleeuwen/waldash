import Vue from 'vue'
import Router from 'vue-router'
import BtcIndex from '../components/BtcIndex.vue'

Vue.use(Router)
Vue.component("BtcIndex", BtcIndex)
export default new Router({
    routes: [
        {
            path:'/',
            name: 'BtcIndex',
            component: BtcIndex
        }
    ]
})