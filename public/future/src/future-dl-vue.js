require("babel-polyfill");
var Vue = require('vue');
var infiniteScroll =  require('vue-infinite-scroll');
var Deal = require('./components/Deal.vue');

Vue.use(infiniteScroll);

var deal = new Vue({
  el: '#deal',
  render: h => h(Deal)
});
