<template>
 <div>
   <tabbar class="no-margin" activeKey="tabs[0].name" @change="getNews" style="height: 35px; border-top: 1px solid #e4e7f0;">
      <tabbar-item v-for="item in tabs" :eventKey="item.name">{{item.name}}</tabbar-item>
  </tabbar>
  <group>
      <cell v-for="item in newsList">
         <a v-bind:href="'pobo:goback=0&uncheck=1&pageId=900005&url=consult/index.html#/detail?cId='+item.id">
          <media>
              <media-body>
                  <p :style="{fontSize: '14px', color: '#1a1a1a'}">{{item.infotitle}}</p>
                  <p :style="{fontSize: '10px', color: '#808086'}">{{item.authordep}} {{item.time}}</p>
              </media-body>
              <media-object>
                  <img :style="{width: '92px', height: '63px'}" v-bind:src="shortimgurl + item.thumbid + '.png'" onerror="this.src='../images/default.png'">
              </media-object>
          </media>
        </a>
      </cell>
  </group>
 </div>
</template>

<script>
  import axios from 'axios';
    export default{
      name: 'news-list',
    //  props: ['newsPar', 'tabs', 'tags'],
      props: {
        newsPar: {
          type: Array,
          default: []
        },
        tabs: {
          type: Array,
          default: []
        },
        tags: {
          type: Boolean,
          default: false
        }
      },
      data: function () {
        return {
                shortimgurl: pbRC.RHS('newsbase', 'shortimgurl'),
                newsList: [],  //新闻列表
                parArr: {},  //以tabs中name为key的参数对象
                DnewsPar: []
                /*data1: [],
                data2: [],
                data3: []*/
              }
      },
      watch: {
        'DnewsPar': function () {  //首页使用时newsPar一直为空，watch不会调用
          if (this.tags) {
            /*if (!this.data1.length) {  //第一次发查新闻请求
              this.getNews(this.tabs[0].name);
              console.log("第一次渲染");
            }*/
            this.getNews(this.tabs[0].name);
          }
          //console.log(this.newsPar);
        }
      },

      mounted() {
        this.DnewsPar = this.newsPar;
        for (var i = 0, j= this.tabs.length; i < j; i++) {
          this.parArr[this.tabs[i].name] = this.tabs[i].par;
        }

        console.log(this.parArr);

        if (!this.tags) {  //首页使用
          this.DnewsPar = []; //首页使用时tags需传null
          this.getNews(this.tabs[0].name);
        }
      },
      /*{"pageNo": 1, "pageSize": 10, "tags": this.DnewsPar, "part": ""}*/
      methods: {
        getNews: function (val) {
          var news = [], _this = this, tag;
          if (this.DnewsPar.length == 0) {
            tag = null;
          } else {
            tag = this.DnewsPar.split(',');
          }
          console.log(this.parArr[val]);
          console.log(this.DnewsPar);
          axios.post(pbRC.RHS('newsbase', 'listurl'),
            {"func":"7001", "data":[{
                    "pageNo":1,"pageSize":10, "tags": tag, "part": _this.parArr[val]
                    /*"pageNo":1,"pageSize":10, "tags": ["黄金"], "part": _this.parArr[val]*/
                }]
            }
          )
          .then(function(res){
            //_this.newsList = res.data.data[0].results;
            var news = res.data.data[0].results;
            for (var i = 0, j = news.length; i < j; i++) {
              var date = new Date(news[i].updatetime);
              news[i].time = _this.timeFmt(date);
            }
            _this.newsList = news;
            console.log(news);
          })
          .catch(function(err){
              console.log(err);
          })
        },

        timeFmt: function (date) {
          var Y = date.getFullYear() + '-',
              M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
              D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + ' ',
              h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ':',
              m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ':',
              s = (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
          return Y+M+D+h+m+s;
        }
      }
    }
</script>
