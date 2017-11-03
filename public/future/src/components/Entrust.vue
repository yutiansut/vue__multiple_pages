<template>
  <div id="contents" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="50">
    <div class="folder-row" v-for="(data, index) in dataShow" :key="data['65']">
      <div class="row content" @click="note(index)">
        <div class="col-my-11 text-left">
          <p class="a1 name-row"><span class="display-table-cell">{{ data['name'] ? data['name'] : data['64'] ? data['64'] : data['63'] }}</span></p>
          <p class="d2 time-row"><span class="display-table-cell">{{ data['159'] }}</span></p>
        </div>
        <div class="col-my-13 text-right"><p class="lh55" :class="getClass(data['112'])">{{ getDirection(data['112'], data['117']) }}</p></div>
        <div class="col-my-11 text-center">
          <p class="b1 lh28">{{ data['40'] != undefined && data['40'] != '2' ? '市价' : floatToFixed(data['129'], 2) }}</p>
          <p class="b1 lh27">
            <span class="b3">{{ floatToFixed(data['113'], 0) }}</span><span>&nbsp;|&nbsp;</span><span>{{ floatToFixed(data['130'], 0) }}</span>
          </p>
        </div>
        <div class="col-my-13 text-right">
          <img v-if="data['163'] && data['163'].trim().length > 0" class="pd24t pull-right" :id="'arrow' + index" src="../images/arrow-down.png" alt="更多">
          <div>
            <p v-if="data['156'] == 3" class="b3 lh55">已成</p>
            <p v-else-if="data['156'] == 4" class="b4 lh55">已撤</p>
            <div v-else-if="data['156'] == 1 && !history">
              <p class="b1 lh28">已报</p>
              <p class="lh27"><input class="btn btn-my-xs bgc-fe0000" type="button" value="撤单" @click="withdrawal(data)" /></p>
            </div>
            <p v-else-if="data['156'] == 1 && history" class="b1 lh55">已报</p>
            <div v-else-if="data['156'] == 6 && !history">
              <p class="b1 lh28">待撤</p>
              <p class="lh27"><input class="btn btn-my-xs bgc-fe0000" type="button" value="撤单" @click="withdrawal(data)" /></p>
            </div>
            <p v-else-if="data['156'] == 6 && history" class="b1 lh55">待撤</p>
            <div v-else-if="data['156'] == 8 && !history">
              <p class="b1 lh28">待改</p>
              <p class="lh27"><input class="btn btn-my-xs bgc-fe0000" type="button" value="撤单" @click="withdrawal(data)" /></p>
            </div>
            <p v-else-if="data['156'] == 8 && history" class="b1 lh55">待改</p>
            <div v-else-if="data['156'] == 'h' && !history">
              <p class="b1 lh28">挂起</p>
              <p class="lh27"><input class="btn btn-my-xs bgc-fe0000" type="button" value="撤单" @click="withdrawal(data)" /></p>
            </div>
            <p v-else-if="data['156'] == 'h' && history" class="b1 lh55">挂起</p>
            <div v-else-if="data['156'] == 'p' && !history">
              <p class="b1 lh28">本地开盘触发</p>
              <p class="lh27"><input class="btn btn-my-xs bgc-fe0000" type="button" value="撤单" @click="withdrawal(data)" /></p>
            </div>
            <p v-else-if="data['156'] == 'p' && history" class="b1 lh55">本地开盘触发</p>
            <div v-else-if="data['156'] == 2 && !history">
              <p class="b1 lh28">部成</p>
              <p class="lh27"><input class="btn btn-my-xs bgc-fe0000" type="button" value="撤单" @click="withdrawal(data)" /></p>
            </div>
            <p v-else-if="data['156'] == 2 && history" class="b1 lh55">部成</p>
            <p v-else-if="data['156'] == 5" class="b4 lh55">部撤</p>
            <div v-else-if="data['156'] == 0 && !history">
              <p class="b1 lh28">正报</p>
              <p class="lh27"><input class="btn btn-my-xs bgc-fe0000" type="button" value="撤单" @click="withdrawal(data)" /></p>
            </div>
            <p v-else-if="data['156'] == 0 && history" class="b1 lh55">正报</p>
            <p v-else-if="data['156'] == 'e'" class="b4 lh55">废单</p>
            <div v-else-if="data['156'] == 'x' && !history">
              <p class="b1 lh28">未知</p>
              <p class="lh27"><input class="btn btn-my-xs bgc-fe0000" type="button" value="撤单" @click="withdrawal(data)" /></p>
            </div>
            <p v-else-if="data['156'] == 'x' && history" class="b1 lh55">未知</p>
          </div>
        </div>
      </div>
      <div v-if="data['163'] && data['163'].trim().length > 0" class="hide" :id="'hideB' + index">
        <div class="row col-xs-12 deal2">
          备注：{{ data['163'].trim() }}
        </div>
      </div>
    </div>
    <div class="my-modal" :class="{ hide: !withdrawalFlag}">
      <div class="my-modal-backdrop" @click.self="cancelWithdrawal"></div>
      <div class="my-modal-dialog">
        <p class="title">撤&nbsp;&nbsp;单</p>
        <div class="row">
          <div class="col-my-19">
            <span>合约名称：</span><span>{{ withdrawalData.name }}</span>
          </div>
          <div class="col-my-20">
            <span>交易所：</span><span>{{ withdrawalData['54'] }}</span>
          </div>
        </div>
        <div class="row">
          <div class="col-my-19">
            <span>委托时间：</span><span>{{ withdrawalData.time }}</span>
          </div>
          <div>
            <span>操作方向：</span><span>{{ withdrawalData.direction }}</span>
          </div>
        </div>
        <div class="row">
          <div class="col-my-19">
            <span>委托价格：</span><span>{{ withdrawalData.price }}</span>
          </div>
          <div class="col-my-20">
            <span>委托数量：</span><span>{{ withdrawalData.num }}</span>
          </div>
        </div>
        <div class="row btn-bottom">
          <input class="btn btn-3d0" type="button" value="是" @click.self="confirmWithdrawal" />
          <input class="btn btn-6d1" type="button" value="否" @click.self="cancelWithdrawal" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: ['history'],
  data () {
    return {
      CID: 0,
      dataHis: [],
      dataShow: [],
      timer: 0,
      refreshFlag: 1,
      withdrawalFlag: false,
      withdrawalData: {
        name: '',
        time: '',
        direction: '',
        price: '',
        num: '',
        '65': '',
        '160': '',
        '52': '',
        '54': '',
        '161': '',
        '162': '',
        '44': '',
        '63': ''
      },
      busy: false,
      pageNo: 1,
      pageNum: 20
    }
  },
  mounted () {
    this.setEntrust();
    window.callback = function (message) {
      var msg = JSON.parse(message);
      if (msg.functionNO == 56004) {
        if (msg.jData['223'] == 1) {
          if (!this.refreshFlag) {
            pbE.SYS().stopLoading();
            this.refreshFlag = 1;
          }
          this.setEntrust();
        }
      } else if (msg.functionNO == 6022) {
        pbE.SYS().hideCircleView('Pbkey_Trade_WT_Circle');
        if (msg.jData['1'] >= 0) {
          document.getElementById('indicate').className = 'col-center';
          //撤单请求已发送的弹框，定时器1s
          this.timer = setTimeout(function () {
            document.getElementById('indicate').className = 'col-center hide';
          }, 1000);
        } else {
          this.withdrawalFlag = false;
          alert(msg.jData['2']);
        }
      } else if (msg.functionNO == 56005) {
        this.setEntrust();
      }
    }.bind(this);
    window.reload = function () {
      document.getElementById('indicate').className = 'col-center hide';
      this.withdrawalFlag = false;
      this.setEntrust();
    }.bind(this);
    window.refresh = function () {
      pbE.SYS().startLoading();
      this.refreshFlag = 0;
      pbE.WT().wtSynFlash(this.CID);
    }.bind(this);
    window.doShow = function (flag) {
      if (!flag) {
        pbE.SYS().stopLoading(); //离开页面时停止转圈
        this.withdrawalFlag = false;
        document.getElementById('indicate').className = 'col-center hide';
        clearTimeout(this.timer);
      }
    };
  },
  methods: {
    sortEntrust(arr) {
      var nightArr = arr.filter(function (item) {
        var timeStr = item['159'].replace(/\:/g, "");
        return timeStr > '195959';
      });
      var todayArr = arr.filter(function (item) {
        var timeStr = item['159'].replace(/\:/g, "");
        return timeStr < '200000';
      });
      nightArr = nightArr.sort(function (item1, item2) {
        var time1 = item1['159'].replace(/\:/g, "");
        var time2 = item2['159'].replace(/\:/g, "");
        return time2 - time1;
      });
      todayArr = todayArr.sort(function (item1, item2) {
        var time1 = item1['160'].replace(/\-/g, "") + item1['159'].replace(/\:/g, "");
        var time2 = item2['160'].replace(/\-/g, "") + item2['159'].replace(/\:/g, "");
        return time2 - time1;
      });
      var newArr = [];
      newArr = newArr.concat(todayArr, nightArr);
      return newArr;
    },
    setEntrust () {
      // pbE.SYS().startLoading();
      this.CID = pbE.WT().wtGetCurrentConnectionCID();
      var dataHis1 = pbE.WT().wtQueryEntrustRe(this.CID);
      if (dataHis1) {
        var dataHis = JSON.parse(dataHis1).data;
        for (var i = 0; i < dataHis.length; i++) {
          var market = dataHis[i]['54'],
              code = dataHis[i]['63'];
          var marketInfo = JSON.parse(pbE.WT().wtGetHQInfo(code, market)); //交易信息转换行情信息
          dataHis[i]["name"] = marketInfo.HQName || "";
        }
        if (dataHis[0]) {
          this.dataHis = this.sortEntrust(dataHis);
          this.dataShow = this.dataHis.slice(0, this.pageNum);
        }
      }
      pbE.SYS().hideCircleView('Pbkey_Trade_WT_Circle');
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
    withdrawal (data) {
      pbE.WT().wtResetKeepAccOnlineTimer;
      document.body.className = 'entrust-body modal-open';
      this.withdrawalData.name = data['name'] ? data['name'] : data['64'] ? data['64'] : data['63'];
      this.withdrawalData.time = data['159'];
      this.withdrawalData.direction = this.getDirection(data['112'], data['117']);
      this.withdrawalData.price = data['40'] != undefined && data['40'] != '2' ? '市价' : this.floatToFixed(data['129'], 2);
      this.withdrawalData.num = this.floatToFixed(data['130'], 0);
      this.withdrawalData['65'] = data['65'];
      this.withdrawalData['160'] = data['160'];
      this.withdrawalData['52'] = pbE.WT().wtGetGDZH(data['54']);
      this.withdrawalData['54'] = data['54'];
      this.withdrawalData['161'] = pbE.WT().wtGetXWH(data['54']);
      this.withdrawalData['162'] = data['162'];
      this.withdrawalData['44'] = data['44'];
      this.withdrawalData['63'] = data['63'];
      if (pbE.SYS().showFutureTradeConfirm()) {
        this.withdrawalFlag = true;
      } else {
        this.confirmWithdrawal();
      }
    },
    cancelWithdrawal () {
      document.body.className = 'entrust-body';
      this.withdrawalFlag = false;
    },
    confirmWithdrawal () {
      document.body.className = 'entrust-body';
      this.withdrawalFlag = false;
      var data = {
        '65': this.withdrawalData['65'],
        '160': this.withdrawalData['160'],
        '52': this.withdrawalData['52'],
        '54': this.withdrawalData['54'],
        '161': this.withdrawalData['161'],
        '162': this.withdrawalData['162'],
        '44': this.withdrawalData['44'],
        '63': this.withdrawalData['63']
      };
      var par = { 'Pbkey_Circle_CID': this.CID };
      pbE.SYS().showCircleView('Pbkey_Trade_WT_Circle', JSON.stringify(par));
      pbE.WT().wtCancelEntrust(this.CID, JSON.stringify(data));
    },
    note (index) {
      var hideB = document.getElementById('hideB' + index);
      var img = document.getElementById('arrow' + index);
      if (hideB && img) {
        if (hide.className.indexOf('hide') > -1) {
          hideB.className = '';
        } else {
          hideB.className = 'hide';
        }
        if (img.attributes['src'].value == '../images/arrow-up.png') {
          img.attributes['src'].value = '../images/arrow-down.png';
        } else if (img.attributes['src'].value == '../images/arrow-down.png') {
          img.attributes['src'].value = '../images/arrow-up.png';
        }
      }
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
