require("babel-polyfill");
var Vue = require('vue');
var infiniteScroll =  require('vue-infinite-scroll');
var Entrust = require('./components/Entrust.vue');

Vue.use(infiniteScroll);

var entrust = new Vue({
  el: '#entrust',
  render: h => h(
    Entrust,
    {
      props: { history: false }
    }
  )
});
