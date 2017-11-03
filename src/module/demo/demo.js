import 'lib-flexible'
import Vue from 'vue'
import Axios from 'axios'
import pbUI from '../../components'
import FastClick from 'fastclick'
import router from './router'
import store from './vuex/store.js'
import mixinDatas from './utils/datas.js'
import mixinMethods from './utils/methods.js'

import Index from './index.vue'
// 去掉ios上300毫秒延迟
FastClick.attach(document.body)
Vue.prototype.$axios = Axios
Vue.use(pbUI)

Vue.mixin(Object.assign(mixinDatas, mixinMethods))

const index = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(Index)
})
