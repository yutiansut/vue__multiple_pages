<template>
  <ul class="notice-group" id="notice-group" style="top: 0;">
    <li v-for="notice in noticeList" class="notice-item"><a :href="'pobo:pageId=900005&url=consult/index.html#/detail?cId='+notice.id">{{ notice.infotitle }}</a></li>
    <template v-if="noticeList.length > 1">
      <li v-for="n in 2" class="notice-item"><a :href="'pobo:pageId=900005&url=consult/index.html#/detail?cId='+noticeList[n-1].id">{{ noticeList[n - 1].infotitle }}</a></li>
    </template>
    <template v-if="noticeList.length == 0">
      <li class="notice-item">暂无公告</li>
    </template>
  </ul>
</template>

<script>
export default {
  name: 'vertical-swipe',
  props: ['noticeList', 'delay'],
  mounted () {
    this.setLoop();
  },
  updated () {
    this.setLoop();
  },
  methods: {
    setLoop () {
      var _this = this;
      if (_this.noticeList.length > 1) {
        var noticeDom = document.getElementById('notice-group');
        var t = setInterval(function () {
          var top = parseInt(noticeDom.style.top);
          top = top - 35;
          noticeDom.style.transition = 'top .3s ease-in-out';
          noticeDom.style.top = top + 'px';
          if (top + (_this.noticeList.length + 1) * 35 <= 0) {
            setTimeout(function () {
              noticeDom.style.transition = 'none';
              noticeDom.style.top = '-35px';
            }, 500);
          }
        }, _this.delay);
      }
    }
  }
}
</script>
