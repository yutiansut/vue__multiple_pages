<template>
  <div id="contents" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="50">
    <div class="row content" v-for="data in dataShow" :key="data['65']">
      <div class="col-my-11 text-left">
        <p class="a1 name-row"><span class="display-table-cell">{{ data['name'] ? data['name'] : data['64'] ? data['64'] : data['63'] }}</span></p>
        <p class="d1 time-row"><span class="display-table-cell">{{ data['116'] }}</span></p>
      </div>
      <div class="col-my-13 text-right"><p class="lh55" :class="getClass(data['112'])">{{ getDirection(data['112'], data['117']) }}</p></div>
      <div class="col-my-11 text-right"><p class="b1 lh55">{{ floatToFixed(data['114'], 2) }}</p></div>
      <div class="col-my-13 text-right"><p class="b1 lh55">{{ floatToFixed(data['113'], 0) }}</p></div>
    </div>
  </div>
</template>

<script>
module.exports = {
  data () {
    return {
      CID: 0,
      dataHis: [],
      dataShow: [],
      refreshFlag: 1,
      busy: false,
      pageNo: 1,
      pageNum: 20
    }
  },
  mounted () {
    this.setBargain();
    window.callback = function (message) {
      var msg = JSON.parse(message);
      if (msg.functionNO == 56004) {
        console.log('56004');
        if (msg.jData['223'] == 3) {
          if (!this.refreshFlag) {
            pbE.SYS().stopLoading();
            this.refreshFlag = 1;
          }
          this.setBargain();
        }
      } else if (msg.functionNO == 56006) {
          this.setBargain();
      }
    }.bind(this);
    window.reload = function () {
      this.setBargain();
    }.bind(this);
    window.refresh = function () {
      pbE.SYS().startLoading();
      this.refreshFlag = 0;
      pbE.WT().wtSynFlash(this.CID);
    }.bind(this);
    window.doShow = function (flag) {
      if (!flag) {
        pbE.SYS().stopLoading(); //离开页面时停止转圈
      }
    };
  },
  methods: {
    sortDeal(arr) {
      var nightArr = arr.filter(function (item) {
        var timeStr = item['116'].replace(/\:/g, "");
        return timeStr > '195959';
      });
      var todayArr = arr.filter(function (item) {
        var timeStr = item['116'].replace(/\:/g, "");
        return timeStr < '200000';
      });
      nightArr = nightArr.sort(function (item1, item2) {
        var time1 = item1['116'].replace(/\:/g, "");
        var time2 = item2['116'].replace(/\:/g, "");
        return time2 - time1;
      });
      todayArr = todayArr.sort(function (item1, item2) {
        var time1 = item1['173'].replace(/\-/g, "") + item1['116'].replace(/\:/g, "");
        var time2 = item2['173'].replace(/\-/g, "") + item2['116'].replace(/\:/g, "");
        return time2 - time1;
      });
      var newArr = [];
      newArr = newArr.concat(todayArr, nightArr);
      return newArr;
    },
    setBargain () {
      this.CID = pbE.WT().wtGetCurrentConnectionCID();
      var dataHis1 = pbE.WT().wtQueryBargainRe(this.CID);
      if (dataHis1) {
        var dataHis = JSON.parse(dataHis1).data;
        for (var i = 0; i < dataHis.length; i++) {
          var market = dataHis[i]['54'],
              code = dataHis[i]['63'];
          var marketInfo = JSON.parse(pbE.WT().wtGetHQInfo(code, market)); //交易信息转换行情信息
          dataHis[i]["name"] = marketInfo.HQName || "";
        }
        if (dataHis[0]) {
          this.dataHis = this.sortDeal(dataHis);
          this.dataShow = this.dataHis.slice(0, this.pageNum);
        }
      }
      pbE.SYS().hideCircleView('Pbkey_Default_Circle');
    },
    getClass (mmlb) {
      var className;
      if (mmlb == 0) {
        className = 'b3';
      } else if (mmlb == 1) {
        className = 'b4';
      }
      return className;
    },
    getDirection (mmlb, kpbz) {
      var direction;
      if (mmlb == 0 && kpbz == 0) {
        direction = '买开';
      } else if (mmlb == 1 && kpbz == 1) {
        direction = '卖平';
      } else if (mmlb == 0 && kpbz == 1) {
        direction = '买平';
      } else if (mmlb == 1 && kpbz == 0) {
        direction = '卖开';
      } else if (mmlb == 0 && kpbz == 2) {
        direction = '买平今';
      } else if (mmlb == 1 && kpbz == 2) {
        direction = '卖平今';
      }
      return direction;
    },
    floatToFixed (value, fixedNum) {
      return (value - 0).toFixed(fixedNum);
    },
    loadMore () {
      this.busy = true;
      this.pageNo = this.pageNo + 1;
      this.dataShow = this.dataHis.slice(0, this.pageNo * this.pageNum);
      setTimeout(() => {
        this.busy = false;
      }, 500);
    }
  }
}
</script>
