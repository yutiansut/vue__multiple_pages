//bar
var NavHeader = React.createClass({
  displayName: "NavHeader",

  render: function () {
    return React.createElement(
      "div",
      { className: "container-fluid" },
      React.createElement(
        "div",
        { className: "navbar-header" },
        React.createElement(
          "a",
          { href: "goBack", className: "navbar-brand", id: "goBack" },
          React.createElement("img", { src: "../../images/goback.png", alt: "返回" })
        )
      ),
      React.createElement(
        "p",
        { className: "navbar-text" },
        this.props.name
      )
    );
  }
});

//贵金属持仓内容
var PositionContentsGold = React.createClass({
  displayName: "PositionContentsGold",

  jump: function (content) {
    pbE.SYS().sendMessageToNative('Pbkey_H5_Position_XD_Data', JSON.stringify(content));
  },

  render: function () {
    var creatContents = function (content) {
      var pl = null,
          path = null,
          status = null,
          contract = null;
      
      if (isNaN(content['profit'])) {
        pl = React.createElement(
          "p",
          { className: "lh35" },
          React.createElement(
            "span",
            { className: "b2" },
            "浮盈  ",
            React.createElement(
              "span",
              { className: "a1 profit" },
              content['profit']
            )
          )
        );
      } else {
        if (content['profit'] > 0) {
          pl = React.createElement(
            "p",
            { className: "lh35" },
            React.createElement(
              "span",
              { className: "b2" },
              "浮盈  ",
              React.createElement(
                "span",
                { className: "a3 profit" },
                '+' + content['profit']
              )
            )
          );
          path = React.createElement(
            "div",
            { className: "imageBar pull-left" },
            React.createElement("img", { src: "../../images/redBar.png", alt: "盈利条" })
          );
        } else if (content['profit'] < 0) {
          pl = React.createElement(
            "p",
            { className: "lh35" },
            React.createElement(
              "span",
              { className: "b2" },
              "浮盈  ",
              React.createElement(
                "span",
                { className: "a4 profit" },
                content['profit']
              )
            )
          );
          path = React.createElement(
            "div",
            { className: "imageBar pull-left" },
            React.createElement("img", { src: "../../images/greenBar.png", alt: "盈利条" })
          );
        } else if (content['profit'] == 0) {
          pl = React.createElement(
            "p",
            { className: "lh35" },
            React.createElement(
              "span",
              { className: "b2" },
              "浮盈  ",
              React.createElement(
                "span",
                { className: "a1 profit" },
                content['profit']
              )
            )
          );
        }
      }
      if (path == null) {
        path = React.createElement("div",
                                   {className: "imageBar pull-left"},
                                   null
                                  );
      }

      if (content['112'] == '0') {
        status = React.createElement(
          "div",
          { className: "pull-left pd7t pd3zy" },
          React.createElement("img", { src: "../../images/duocang.png", alt: "多仓", width: "21px", height: "42px" })
        );
      } else if (content['112'] == '1') {
        status = React.createElement(
          "div",
          { className: "pull-left pd7t pd3zy" },
          React.createElement("img", { src: "../../images/kongcang.png", alt: "空仓", width: "21px", height: "42px" })
        );
      }

      if (content['64']) {
        contract = content['64'];
      } else {
        contract = content['63'];
      }

      return React.createElement(
        "div",
        null,
        React.createElement("div", { className: "nav-blank" }),
        React.createElement(
          "div",
          { className: "position-row", onClick: this.jump.bind(null, content), id: content['63'].slice(0, 2) + '_' + content['112'] },
          path,
          React.createElement(
            "div",
            { className: "details" },
            React.createElement(
              "div",
              { className: "details-title" },
              React.createElement(
                "p",
                { className: "a1" },
                contract
              ),
              pl
            ),
            React.createElement(
              "div",
              { className: "details-content row" },
              status,
              React.createElement(
                "div",
                { className: "col-my-10 details-top" },
                React.createElement(
                  "p",
                  { className: "c2" },
                  "开仓均价 ",
                  React.createElement(
                    "span",
                    { className: "c1" },
                    content['avg']
                  )
                ),
                React.createElement(
                  "p",
                  { className: "c2" },
                  "持仓数量 ",
                  React.createElement(
                    "span",
                    { className: "c1" },
                    content['135']
                  )
                )
              ),
              React.createElement(
                "div",
                { className: "pull-left col-my-6 details-top" },
                React.createElement(
                  "p",
                  { className: "c2" },
                  "现价 ",
                  React.createElement(
                    "span",
                    { className: "c1 price" },
                    content['price']
                  )
                ),
                React.createElement(
                  "p",
                  { className: "c2" },
                  "可用 ",
                  React.createElement(
                    "span",
                    { className: "c1" },
                    content['137']
                  )
                )
              )
            )
          )
        )
      );
    };
    return React.createElement(
      "div",
      null,
      this.props.contents.map(creatContents, this)
    );
  }
});

//库存查询title
var StorageTitle = React.createClass({
  displayName: "StorageTitle",

  render: function () {
    return React.createElement(
      "div",
      { className: "row four-title" },
      React.createElement(
        "div",
        { className: "col-my-2 text-left" },
        this.props.par[0].name
      ),
      React.createElement(
        "div",
        { className: "col-my-2 text-left" },
        this.props.par[1].name
      ),
      React.createElement(
        "div",
        { className: "col-my-2 text-left" },
        this.props.par[2].name
      ),
      React.createElement("div", { className: "col-my-22" })
    );
  }
});

//库存查询contents
var StorageContents = React.createClass({
  displayName: "StorageContents",

  /*jump: function(index, content) {
    storageDetail = content;
  },*/
  render: function () {
    var creatContents = function (content) {
      var contract = null;
      if (this.props.par[0].num == '365') {
         if (content['365']) {
          contract = content['365'];
        } else {
          contract = content['364'];
        } 
      }
      var href = "gold-strg-dt.html?par=" + JSON.stringify(content);
      return React.createElement(
        "a",
        { href: href },
        React.createElement(
          "div",
          { className: "row content" },
          React.createElement(
            "div",
            { className: "col-my-2 text-left" },
            React.createElement(
              "p",
              { className: "c1 lh55" },
              contract
            )
          ),
          React.createElement(
            "div",
            { className: "col-my-2 text-left" },
            React.createElement(
              "p",
              { className: "b1 lh55" },
              content[this.props.par[1].num]
            )
          ),
          React.createElement(
            "div",
            { className: "col-my-2 text-left" },
            React.createElement(
              "p",
              { className: "b1 lh55" },
              content[this.props.par[2].num]
            )
          ),
          React.createElement(
            "div",
            { className: "col-my-22 text-right image" },
            React.createElement("img", { src: "../../images/more.png" })
          )
        )
      );
    };
    return React.createElement(
      "div",
      null,
      this.props.contents.map(creatContents, this)
    );
  }
});

//提货查询title
var TihuoTitle = React.createClass({
  displayName: "TihuoTitle",

  render: function () {
    return React.createElement(
      "div",
      { className: "row four-title" },
      React.createElement(
        "div",
        { className: "col-xs-4 text-left" },
        this.props.par[0].name
      ),
      React.createElement(
        "div",
        { className: "col-xs-4 text-left" },
        this.props.par[1].name
      ),
      React.createElement(
        "div",
        { className: "col-xs-4 text-left" },
        this.props.par[2].name
      )
    );
  }
});

//提货查询contents
var TihuoContents = React.createClass({
  displayName: "TihuoContents",

  /*jump: function(index, content) {
    storageDetail = content;
  },*/
  render: function () {
    var creatContents = function (content) {
      var contract = null;
      if (content['365']) {
        contract = content['365'];
      } else {
        contract = content['364'];
      }
      var href = "gold-th-info.html?par=" + JSON.stringify(content);
      return React.createElement(
        "a",
        { href: href },
        React.createElement(
          "div",
          { className: "row content" },
          React.createElement(
            "div",
            { className: "col-xs-4 text-left" },
            React.createElement(
              "p",
              { className: "c1 lh30" },
              contract
            ),
            React.createElement(
              "p",
              { className: "d2 lh25" },
              content['364']
            )
          ),
          React.createElement(
            "div",
            { className: "col-xs-4 text-left" },
            React.createElement(
              "p",
              { className: "b8 lh27" },
              content['171']
            ),
            React.createElement(
              "p",
              { className: "b1 lh27" },
              content['201']
            )
          ),
          React.createElement(
            "div",
            { className: "col-xs-3 text-left" },
            React.createElement(
              "p",
              { className: "b1 lh27" },
              content['405']
            ),
            React.createElement(
              "p",
              { className: "b1 lh27" },
              content['412']
            )
          ),
          React.createElement(
            "div",
            { className: "col-xs-1 text-left image" },
            React.createElement("img", { src: "../../images/more.png" })
          )
        )
      );
    };
    return React.createElement(
      "div",
      null,
      this.props.contents.map(creatContents, this)
    );
  }
});

//预约转账查询title
var TransferTitle = React.createClass({
  displayName: "TransferTitle",

  render: function () {
    return React.createElement(
      "div",
      { className: "row four-title" },
      React.createElement(
        "div",
        { className: "col-xs-4 text-left" },
        "预约出金日期"
      ),
      React.createElement(
        "div",
        { className: "col-xs-4 text-left" },
        "预约出金金额"
      ),
      React.createElement(
        "div",
        { className: "col-xs-4 text-center" },
        "状态"
      )
    );
  }
});

//预约转账查询contents
var TransferContents = React.createClass({
  displayName: "TransferContents",

  /*jump: function(index, content) {
    storageDetail = content;
  },*/
  render: function () {
    var creatContents = function (content) {
      var contract = null;
      if (content['365']) {
        contract = content['365'];
      } else {
        contract = content['364'];
      }
      var href = "transfer-details.html?par=" + JSON.stringify(content);
      return React.createElement(
        "a",
        { href: href },
        React.createElement(
          "div",
          { className: "row content" },
          React.createElement(
            "div",
            { className: "col-xs-4 text-left" },
            React.createElement(
              "p",
              { className: "c1 lh55" },
              content['707']
            )
          ),
          React.createElement(
            "div",
            { className: "col-xs-4 text-left" },
            React.createElement(
              "p",
              { className: "c1 lh55" },
              content['708']
            )
          ),
          React.createElement(
            "div",
            { className: "col-xs-3 text-left" },
            React.createElement(
              "p",
              { className: "c1 lh55" },
              content['545']
            )
          ),
          React.createElement(
            "div",
            { className: "col-xs-1 text-left image" },
            React.createElement("img", { src: "../images/more.png" })
          )
        )
      );
    };
    return React.createElement(
      "div",
      null,
      this.props.contents.map(creatContents, this)
    );
  }
});

//提货查询，预约转账查询，历史成交 
var TimeTitle = React.createClass({
  displayName: "TimeTitle",

  getDefaultProps: function () {
    return {
      tihuo: false, //提货查询
      transfer: false, //预约转账查询
      deal: false, //历史成交
      entrust: false //历史委托
    };
  },
  getInitialState: function () {
    return { flag: 1 };
  },
  changeDate: function (tabFlag) {
    if (tabFlag == this.state.flag) {
      return;
    }
    var contentsDom = document.getElementById('contents');
    $(contentsDom).empty();
    $('#alert').addClass('hide');
    switch (tabFlag) {
      case 1:
        this.state.flag = 1;
        $('.active').removeClass('active');
        $('.tab-1').addClass('active');
        $('.two-date').addClass('hide');
        dataTime = {
          '171': this.props.times.three,
          '172': this.props.times.yesterday
        };
        if (this.props.tihuo) {
          if (!dataThree) {
            pbE.WT().wtGeneralRequest(CID, 9308, JSON.stringify(dataTime));
          } else {
            ReactDOM.render(React.createElement(TihuoContents, { contents: dataThree }), contentsDom);
          }
        } else if (this.props.transfer) {
          if (!dataThree) {
            pbE.WT().wtGeneralRequest(CID, 9317, JSON.stringify(dataTime));
          } else {
            ReactDOM.render(React.createElement(TransferContents, { contents: dataThree }), contentsDom);
          }
        } else if (this.props.deal) {
          if (!dataThree) {
            pbE.WT().wtGeneralRequest(CID, 6053, JSON.stringify(dataTime));
          } else {
            ReactDOM.render(React.createElement(DealContentsHis, { contents: dataThree }), contentsDom);
          }
        } else if (this.props.entrust) {
          if (!dataThree) {
            pbE.WT().wtGeneralRequest(CID, 6052, JSON.stringify(dataTime));
          } else {
            ReactDOM.render(React.createElement(EntrustContents, { contents: dataThree }), contentsDom);
          }
        }
        break;
      case 2:
        this.state.flag = 2;
        $('.active').removeClass('active');
        $('.tab-2').addClass('active');
        $('.two-date').addClass('hide');
        dataTime = {
          '171': this.props.times.week,
          '172': this.props.times.yesterday
        };
        if (this.props.tihuo) {
          if (!dataWeek) {
            pbE.WT().wtGeneralRequest(CID, 9308, JSON.stringify(dataTime));
          } else {
            ReactDOM.render(React.createElement(TihuoContents, { contents: dataWeek }), contentsDom);
          }
        } else if (this.props.transfer) {
          if (!dataWeek) {
            pbE.WT().wtGeneralRequest(CID, 9317, JSON.stringify(dataTime));
          } else {
            ReactDOM.render(React.createElement(TransferContents, { contents: dataWeek }), contentsDom);
          }
        } else if (this.props.deal) {
          if (!dataWeek) {
            pbE.WT().wtGeneralRequest(CID, 6053, JSON.stringify(dataTime));
          } else {
            ReactDOM.render(React.createElement(DealContentsHis, { contents: dataWeek }), contentsDom);
          }
        } else if (this.props.entrust) {
          if (!dataWeek) {
            pbE.WT().wtGeneralRequest(CID, 6052, JSON.stringify(dataTime));
          } else {
            ReactDOM.render(React.createElement(EntrustContents, { contents: dataWeek }), contentsDom);
          }
        }
        break;
      case 3:
        this.state.flag = 3;
        $('.active').removeClass('active');
        $('.tab-3').addClass('active');
        $('.two-date').addClass('hide');
        dataTime = {
          '171': this.props.times.month,
          '172': this.props.times.yesterday
        };
        if (this.props.tihuo) {
          if (!dataMonth) {
            pbE.WT().wtGeneralRequest(CID, 9308, JSON.stringify(dataTime));
          } else {
            ReactDOM.render(React.createElement(TihuoContents, { contents: dataMonth }), contentsDom);
          }
        } else if (this.props.transfer) {
          if (!dataMonth) {
            pbE.WT().wtGeneralRequest(CID, 9317, JSON.stringify(dataTime));
          } else {
            ReactDOM.render(React.createElement(TransferContents, { contents: dataMonth }), contentsDom);
          }
        } else if (this.props.deal) {
          if (!dataMonth) {
            pbE.WT().wtGeneralRequest(CID, 6053, JSON.stringify(dataTime));
          } else {
            ReactDOM.render(React.createElement(DealContentsHis, { contents: dataMonth }), contentsDom);
          }
        } else if (this.props.entrust) {
          if (!dataMonth) {
            pbE.WT().wtGeneralRequest(CID, 6052, JSON.stringify(dataTime));
          } else {
            ReactDOM.render(React.createElement(EntrustContents, { contents: dataMonth }), contentsDom);
          }
        }
        break;
      case 4:
        this.state.flag = 4;
        $('.active').removeClass('active');
        $('.tab-4').addClass('active');
        $('.two-date').removeClass('hide');
        dataTime = {
          '171': $('#date-from').val(),
          '172': $('#date-to').val()
        };
        if (this.props.tihuo) {
          if (!dataRandom) {
            pbE.WT().wtGeneralRequest(CID, 9308, JSON.stringify(dataTime));
          } else {
            ReactDOM.render(React.createElement(TihuoContents, { contents: dataRandom }), contentsDom);
          }
        } else if (this.props.transfer) {
          if (!dataRandom) {
            pbE.WT().wtGeneralRequest(CID, 9317, JSON.stringify(dataTime));
          } else {
            ReactDOM.render(React.createElement(TransferContents, { contents: dataRandom }), contentsDom);
          }
        } else if (this.props.deal) {
          if (!dataRandom) {
            pbE.WT().wtGeneralRequest(CID, 6053, JSON.stringify(dataTime));
          } else {
            ReactDOM.render(React.createElement(DealContentsHis, { contents: dataRandom }), contentsDom);
          }
        } else if (this.props.entrust) {
          if (!dataRandom) {
            pbE.WT().wtGeneralRequest(CID, 6052, JSON.stringify(dataTime));
          } else {
            ReactDOM.render(React.createElement(EntrustContents, { contents: dataRandom }), contentsDom);
          }
        }
        break;
      default:
        break;
    }
  },
  render: function () {
    return React.createElement(
      "ul",
      { className: "nav nav-tabs date-tabs" },
      React.createElement(
        "li",
        { role: "presentation", className: "tab-1 active" },
        React.createElement(
          "a",
          { href: "javascript:void(0);", onClick: this.changeDate.bind(null, 1) },
          "3 天"
        )
      ),
      React.createElement(
        "li",
        { role: "presentation", className: "tab-2" },
        React.createElement(
          "a",
          { href: "javascript:void(0);", onClick: this.changeDate.bind(null, 2) },
          "1 周"
        )
      ),
      React.createElement(
        "li",
        { role: "presentation", className: "tab-3" },
        React.createElement(
          "a",
          { href: "javascript:void(0);", onClick: this.changeDate.bind(null, 3) },
          "1 月"
        )
      ),
      React.createElement(
        "li",
        { role: "presentation", className: "tab-4" },
        React.createElement(
          "a",
          { href: "javascript:void(0);", onClick: this.changeDate.bind(null, 4) },
          React.createElement("img", { src: "../../images/calendar.png", alt: "日历" })
        )
      )
    );
  }
});

// 转账记录
var RecContents = React.createClass({
  displayName: 'RecContentsFutures',

  render: function () {
    var creatContents = function (content) {

            var code = pbUtils.getCurrency(content['56']);
            var unit = pbUtils.getUnit(content['56']);
            var money = null,
                information = content['226'],
                styles,
                styles7,
                styles6,
                displeyWT = {display: 'inline-block', width: '29%', textAlign: 'right'},
                margin = {marginLeft: '10'},
                marginLine = {marginLeft: '10', lineHeight: '20px'};
            if(content['211'].length <= 7){
                styles = displeyWT;
            }else if(content['211'].length > 7 && content['211'].length < 22){
                styles = margin;
            }else if(content['211'].length > 22){
                styles = marginLine;
            }
            if(content['207'].length <= 7){
                styles7 = displeyWT
            }else if(content['207'].length > 7 && content['207'].length <= 22){
                styles7 = margin
            }else if(content['207'].length > 22 ){
                styles7 = marginLine;
            }
            if(content['226'] && content['226'].length <= 7){
                styles6 = displeyWT
            }else if(content['226'] && content['226'].length > 7 && content['226'].length <= 22){
                styles6 = margin
            }else if(content['226'] && content['226'].length > 22 ){
                styles6 = marginLine;
            }
            if (content['226']) {
                information = information.replace(/(^\s*)|(\s*$)/g, "");
            }
            if (!content['224'] && content['220']) {
                money = React.createElement(
                    'p',
                    null,
                    code + '：',
                    React.createElement('span', {className: 'right'}, content['220'] + unit)
                );
            } else if (content['224']) {
                money = React.createElement(
                    'p',
                    null,
                    code + '：',
                    React.createElement('span', {className: 'right'}, content['224'] + unit)
                );
            }
        var notes = React.createElement(
            'div',
            {className: 'row'},
            React.createElement(
                'div',
                {className: 'col-xs-12'},
                React.createElement('span', {style: {marginRight: '13px;'}}, '备'),
                React.createElement('span', null, '注：'),
                React.createElement(
                    'span',
                    {style:styles6},
                    content['226']
                )
            )
        );
            return React.createElement(
                'li',
                {className: 'transfer-item', style: {height:'auto'}},
                React.createElement(
                    'div',
                    {className: 'row'},
                    React.createElement(
                        'div',
                        {className: 'col-xs-6'},
                        money
                    ),
                    React.createElement(
                        'div',
                        {className: 'col-xs-6'},
                        React.createElement(
                            'p',
                            null,
                            React.createElement('span', {style: {marginRight: '13px;'}}, '银'),
                            React.createElement('span', null, '行：'),
                            React.createElement('span', {className: 'right'}, content['216'])
                        )
                    )
                ),
                React.createElement(
                    'div',
                    {className: 'row'},
                    React.createElement(
                        'div',
                        {className: 'col-xs-6'},
                        React.createElement(
                            'p',
                            null,
                            React.createElement('span', {style: {marginRight: '13px;'}}, '时'),
                            React.createElement('span', null, '间：'),
                            React.createElement('span', {className: 'right'}, content['228'])
                        )
                    ),
                    React.createElement(
                        'div',
                        {className: 'col-xs-6'},
                        React.createElement(
                            'p',
                            null,
                            '流水号：',
                            React.createElement('span', {className: 'right'}, content['200'])
                        )
                    )
                ),
                React.createElement(
                    'div',
                    {className: 'row'},
                    React.createElement(
                        'div',
                        {className: 'col-xs-12'},
                        React.createElement(
                            'p',
                            null,
                            React.createElement('span', {style: {marginRight: '13px;'}}, '类'),
                            React.createElement('span', null, '型：'),
                            React.createElement('span', {style:styles7}, content['207'])
                        )
                    )
                ),
                React.createElement(
                    'div',
                    {className: 'row'},
                    React.createElement(
                        'p',
                        {className: 'col-xs-12'},
                        React.createElement('span', {style: {marginRight: '13px;'}}, '状'),
                        React.createElement('span', null, '态：'),
                        React.createElement(
                            'span',
                            {style: styles},
                            content['211']
                        )
                    )
                ),
                content['226'] && content['226'] != '' && information.length > 0 ? notes : ''
            );
        };
        return React.createElement(
            'ul',
            {className: 'nav nav-pills nav-stacked d1'},
            this.props.contents.map(creatContents)
        );
    }
});


//当日成交
var DealTitle = React.createClass({
    displayName: "DealTitle",

    render: function () {
        return React.createElement(
            "div",
            { className: "row four-title" },
            React.createElement(
                "div",
                { className: "col-my-11 text-left" },
                "合约名称"
            ),
            React.createElement(
                "div",
                { className: "col-my-13 text-center" },
                "方向"
            ),
            React.createElement(
                "div",
                { className: "col-my-11 text-center" },
                "成交价"
            ),
            React.createElement(
                "div",
                { className: "col-my-13 text-right" },
                "成交量"
            )
        );
    }
});

//历史成交
var DealTitleHis = React.createClass({
    displayName: "DealTitle",

    render: function () {
        return React.createElement(
            "div",
            { className: "row four-title" },
            React.createElement(
                "div",
                { className: "col-my-18 text-left" },
                "合约名称"
            ),
            React.createElement(
                "div",
                { className: "col-my-3 text-center" },
                "方向"
            ),
            React.createElement(
                "div",
                { className: "col-my-16 text-center" },
                "价/量"
            ),
            React.createElement(
                "div",
                { className: "col-my-11 text-right" },
                "成交日期"
            )
        );
    }
});

//历史成交contents
var DealContentsHis = React.createClass({
    displayName: "DealContentsHis",

    render: function () {
        var creatContents = function (content) {
            var direction = null,
                contract = null;
            var marketInfo = pbUtils.parseJSON(pbE.WT().wtGetHQInfo(content['63'], content['54']));
            var flag = pbE.WT().wtIsGoldFutureOrSpot(marketInfo.HQCode, marketInfo.HQMarket); //0:延期，1:现货
            var marketInfo = pbUtils.parseJSON(pbE.WT().wtGetHQInfo(content['63'], content['54'])), //交易信息转换行情信息
                decimal = pbE.HQ().hqGetPriceDecimal(marketInfo.HQCode, marketInfo.HQMarket),
                price = pbUtils.decimalDecPrice(decimal, content['114']);
            if (flag == 1) {
                if (content['112'] == 1) {
                    direction = React.createElement(
                        "p",
                        { className: "c4 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "卖出"
                        )
                    );
                } else if (content['112'] == 0) {
                    direction = React.createElement(
                        "p",
                        { className: "c3 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "买入"
                        )
                    );
                } else if (content['112'] == 2) {
                    direction = React.createElement(
                        "p",
                        { className: "c1 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "ETF申购"
                        )
                    );
                } else if (content['112'] == 3) {
                    direction = React.createElement(
                        "p",
                        { className: "c1 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "ETF赎回"
                        )
                    );
                } else if (content['112'] == 4) {
                    direction = React.createElement(
                        "p",
                        { className: "c1 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "场内基金申购"
                        )
                    );
                } else if (content['112'] == 5) {
                    direction = React.createElement(
                        "p",
                        { className: "c1 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "场内基金赎回"
                        )
                    );
                } else if (content['112'] == 6) {
                    direction = React.createElement(
                        "p",
                        { className: "c1 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "场内基金认购"
                        )
                    );
                } else if (content['112'] == 7) {
                    direction = React.createElement(
                        "p",
                        { className: "c1 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "基金拆分"
                        )
                    );
                } else if (content['112'] == 8) {
                    direction = React.createElement(
                        "p",
                        { className: "c1 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "基金合并"
                        )
                    );
                } else if (content['112'] == 9) {
                    direction = React.createElement(
                        "p",
                        { className: "c1 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "基金转换"
                        )
                    );
                } else if (content['112'] == 'A') {
                    direction = React.createElement(
                        "p",
                        { className: "c1 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "ETF现金认购"
                        )
                    );
                } else if (content['112'] == 'B') {
                    direction = React.createElement(
                        "p",
                        { className: "c1 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "ETF股票认购"
                        )
                    );
                } else if (content['112'] == 'a') {
                    direction = React.createElement(
                        "p",
                        { className: "c1 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "融资买入"
                        )
                    );
                } else if (content['112'] == 'b') {
                    direction = React.createElement(
                        "p",
                        { className: "c1 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "融券卖出"
                        )
                    );
                } else if (content['112'] == 'c') {
                    direction = React.createElement(
                        "p",
                        { className: "c1 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "买券还券"
                        )
                    );
                } else if (content['112'] == 'd') {
                    direction = React.createElement(
                        "p",
                        { className: "c1 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "卖券还款"
                        )
                    );
                } else if (content['112'] == 'e') {
                    direction = React.createElement(
                        "p",
                        { className: "c1 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "直接还券"
                        )
                    );
                } else if (content['112'] == 'f') {
                    direction = React.createElement(
                        "p",
                        { className: "c1 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "直接还款"
                        )
                    );
                } else if (content['112'] == 'g') {
                    direction = React.createElement(
                        "p",
                        { className: "c1 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "信用买入"
                        )
                    );
                } else if (content['112'] == 'h') {
                    direction = React.createElement(
                        "p",
                        { className: "c1 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "信用卖出"
                        )
                    );
                } else if (content['112'] == 'i') {
                    direction = React.createElement(
                        "p",
                        { className: "c1 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "担保物转入"
                        )
                    );
                } else if (content['112'] == 'j') {
                    direction = React.createElement(
                        "p",
                        { className: "c1 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "担保物转出"
                        )
                    );
                }
            } else if (flag == 0) {
                if (content['112'] == 0 && content['117'] == 0) {
                    direction = React.createElement(
                        "p",
                        { className: "c3 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "买开"
                        )
                    );
                } else if (content['112'] == 1 && content['117'] == 1) {
                    direction = React.createElement(
                        "p",
                        { className: "c4 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "卖平"
                        )
                    );
                } else if (content['112'] == 0 && content['117'] == 1) {
                    direction = React.createElement(
                        "p",
                        { className: "c3 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "买平"
                        )
                    );
                } else if (content['112'] == 1 && content['117'] == 0) {
                    direction = React.createElement(
                        "p",
                        { className: "c4 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "卖开"
                        )
                    );
                } else if (content['112'] == 0 && content['117'] == 2) {
                    direction = React.createElement(
                        "p",
                        { className: "c3 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "买平今"
                        )
                    );
                } else if (content['112'] == 1 && content['117'] == 2) {
                    direction = React.createElement(
                        "p",
                        { className: "c4 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "卖平今"
                        )
                    );
                }
            }
            if (content['64']) {
                contract = content['64'];
            } else {
                contract = content['63'];
            }
            return React.createElement(
                "div",
                { className: "row content" },
                React.createElement(
                    "div",
                    { className: "col-my-18 text-left" },
                    React.createElement(
                        "p",
                        { className: "a1 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            contract
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "col-my-3 text-center" },
                    direction
                ),
                React.createElement(
                    "div",
                    { className: "col-my-16 text-center" },
                    React.createElement(
                        "p",
                        { className: "b1 lh28" },
                        price
                    ),
                    React.createElement(
                        'p',
                        { className: 'b1 lh27' },
                        pbUtils.floatToFixed(content['113'], 0)
                    )
                ),
                React.createElement(
                    "div",
                    { className: "col-my-11 text-right" },
                    React.createElement(
                        "p",
                        { className: "b1 lh55" },
                        content['173']
                    )
                )
            );
        };
        return React.createElement(
            "div",
            null,
            this.props.contents.map(creatContents)
        );
    }
});

//当日成交contents
var DealContents = React.createClass({
    displayName: "DealContents",

    render: function () {
        var creatContents = function (content) {
            var direction = null,
                contract = null;
            var marketInfo = pbUtils.parseJSON(pbE.WT().wtGetHQInfo(content['63'], content['54']));
            var flag = pbE.WT().wtIsGoldFutureOrSpot(marketInfo.HQCode, marketInfo.HQMarket); //0:延期，1:现货
            var marketInfo = pbUtils.parseJSON(pbE.WT().wtGetHQInfo(content['63'], content['54'])), //交易信息转换行情信息
                decimal = pbE.HQ().hqGetPriceDecimal(marketInfo.HQCode, marketInfo.HQMarket),
                price = pbUtils.decimalDecPrice(decimal, content['114']);
            if (flag == 1) {
                if (content['112'] == 1) {
                    direction = React.createElement(
                        "p",
                        { className: "c4 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "卖出"
                        )
                    );
                } else if (content['112'] == 0) {
                    direction = React.createElement(
                        "p",
                        { className: "c3 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "买入"
                        )
                    );
                } else if (content['112'] == 2) {
                    direction = React.createElement(
                        "p",
                        { className: "c1 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "ETF申购"
                        )
                    );
                } else if (content['112'] == 3) {
                    direction = React.createElement(
                        "p",
                        { className: "c1 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "ETF赎回"
                        )
                    );
                } else if (content['112'] == 4) {
                    direction = React.createElement(
                        "p",
                        { className: "c1 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "场内基金申购"
                        )
                    );
                } else if (content['112'] == 5) {
                    direction = React.createElement(
                        "p",
                        { className: "c1 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "场内基金赎回"
                        )
                    );
                } else if (content['112'] == 6) {
                    direction = React.createElement(
                        "p",
                        { className: "c1 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "场内基金认购"
                        )
                    );
                } else if (content['112'] == 7) {
                    direction = React.createElement(
                        "p",
                        { className: "c1 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "基金拆分"
                        )
                    );
                } else if (content['112'] == 8) {
                    direction = React.createElement(
                        "p",
                        { className: "c1 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "基金合并"
                        )
                    );
                } else if (content['112'] == 9) {
                    direction = React.createElement(
                        "p",
                        { className: "c1 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "基金转换"
                        )
                    );
                } else if (content['112'] == 'A') {
                    direction = React.createElement(
                        "p",
                        { className: "c1 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "ETF现金认购"
                        )
                    );
                } else if (content['112'] == 'B') {
                    direction = React.createElement(
                        "p",
                        { className: "c1 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "ETF股票认购"
                        )
                    );
                } else if (content['112'] == 'a') {
                    direction = React.createElement(
                        "p",
                        { className: "c1 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "融资买入"
                        )
                    );
                } else if (content['112'] == 'b') {
                    direction = React.createElement(
                        "p",
                        { className: "c1 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "融券卖出"
                        )
                    );
                } else if (content['112'] == 'c') {
                    direction = React.createElement(
                        "p",
                        { className: "c1 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "买券还券"
                        )
                    );
                } else if (content['112'] == 'd') {
                    direction = React.createElement(
                        "p",
                        { className: "c1 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "卖券还款"
                        )
                    );
                } else if (content['112'] == 'e') {
                    direction = React.createElement(
                        "p",
                        { className: "c1 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "直接还券"
                        )
                    );
                } else if (content['112'] == 'f') {
                    direction = React.createElement(
                        "p",
                        { className: "c1 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "直接还款"
                        )
                    );
                } else if (content['112'] == 'g') {
                    direction = React.createElement(
                        "p",
                        { className: "c1 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "信用买入"
                        )
                    );
                } else if (content['112'] == 'h') {
                    direction = React.createElement(
                        "p",
                        { className: "c1 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "信用卖出"
                        )
                    );
                } else if (content['112'] == 'i') {
                    direction = React.createElement(
                        "p",
                        { className: "c1 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "担保物转入"
                        )
                    );
                } else if (content['112'] == 'j') {
                    direction = React.createElement(
                        "p",
                        { className: "c1 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "担保物转出"
                        )
                    );
                }
            } else if (flag == 0) {
                if (content['112'] == 0 && content['117'] == 0) {
                    direction = React.createElement(
                        "p",
                        { className: "c3 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "买开"
                        )
                    );
                } else if (content['112'] == 1 && content['117'] == 1) {
                    direction = React.createElement(
                        "p",
                        { className: "c4 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "卖平"
                        )
                    );
                } else if (content['112'] == 0 && content['117'] == 1) {
                    direction = React.createElement(
                        "p",
                        { className: "c3 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "买平"
                        )
                    );
                } else if (content['112'] == 1 && content['117'] == 0) {
                    direction = React.createElement(
                        "p",
                        { className: "c4 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "卖开"
                        )
                    );
                } else if (content['112'] == 0 && content['117'] == 2) {
                    direction = React.createElement(
                        "p",
                        { className: "c3 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "买平今"
                        )
                    );
                } else if (content['112'] == 1 && content['117'] == 2) {
                    direction = React.createElement(
                        "p",
                        { className: "c4 display-table-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            "卖平今"
                        )
                    );
                }
            }
            if (content['64']) {
                contract = content['64'];
            } else {
                contract = content['63'];
            }
            return React.createElement(
                "div",
                { className: "row content" },
                React.createElement(
                    "div",
                    { className: "col-my-11 text-left" },
                    React.createElement(
                        "p",
                        { className: "a1 name-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            contract
                        )
                    ),
                    React.createElement(
                        "p",
                        { className: "d1 time-row" },
                        React.createElement(
                            "span",
                            { className: "display-table-cell" },
                            content['116']
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "col-my-13 text-right" },
                    direction
                ),
                React.createElement(
                    "div",
                    { className: "col-my-11 text-right" },
                    React.createElement(
                        "p",
                        { className: "b1 lh55" },
                        price
                    )
                ),
                React.createElement(
                    "div",
                    { className: "col-my-13 text-right" },
                    React.createElement(
                        "p",
                        { className: "b1 lh55" },
                        content['113']
                    )
                )
            );
        };
        return React.createElement(
            "div",
            null,
            this.props.contents.map(creatContents)
        );
    }
});

//当日委托
var EntrustTitle = React.createClass({
  displayName: "EntrustTitle",

  render: function () {
    return React.createElement(
      "div",
      { className: "row four-title" },
      React.createElement(
        "div",
        { className: "col-my-11 text-left" },
        "合约名称"
      ),
      React.createElement(
        "div",
        { className: "col-my-13 text-right" },
        "方向"
      ),
      React.createElement(
        "div",
        { className: "col-my-11 text-center" },
        "价/量"
      ),
      React.createElement(
        "div",
        { className: "col-my-13 status text-right" },
        React.createElement(
          "span",
          null,
          "状态"
        ),
        React.createElement("span", { id: "order" })
      )
    );
  }
});

//当日委托撤单
var Withdrawals = React.createClass({
  displayName: "Withdrawals",

  cancelOrder: function (content) {
    var X = $('#cancel').offset().top;
    var Y = X + 150;
    $('#indicate').css('top', Y);
    this.props.cancelOrder(content);
  },
  hideConfirm: function () {
    $('.my-modal').addClass('hide');
    /*$('#contents').removeClass('contents-fixed');*/
  },
  render: function () {
    var direction = null;
    if (this.props.content['flag'] == 1) {
      if (this.props.content['112'] == 1) {
        direction = '卖出';
      } else if (this.props.content['112'] == 0) {
        direction = '买入';
      } else if (this.props.content['112'] == 2) {
        direction = 'ETF申购';
      } else if (this.props.content['112'] == 3) {
        direction = 'ETF赎回';
      } else if (this.props.content['112'] == 4) {
        direction = '场内基金申购';
      } else if (this.props.content['112'] == 5) {
        direction = '场内基金赎回';
      } else if (this.props.content['112'] == 6) {
        direction = '场内基金认购';
      } else if (this.props.content['112'] == 7) {
        direction = '基金拆分';
      } else if (this.props.content['112'] == 8) {
        direction = '基金合并';
      } else if (this.props.content['112'] == 9) {
        direction = '基金转换';
      } else if (this.props.content['112'] == 'A') {
        direction = 'ETF现金认购';
      } else if (this.props.content['112'] == 'B') {
        direction = 'ETF股票认购';
      } else if (this.props.content['112'] == 'a') {
        direction = '融资买入';
      } else if (this.props.content['112'] == 'b') {
        direction = '融券卖出';
      } else if (this.props.content['112'] == 'c') {
        direction = '买券还券';
      } else if (this.props.content['112'] == 'd') {
        direction = '卖券还款';
      } else if (this.props.content['112'] == 'e') {
        direction = '直接还券';
      } else if (this.props.content['112'] == 'f') {
        direction = '直接还款';
      } else if (this.props.content['112'] == 'g') {
        direction = '信用买入';
      } else if (this.props.content['112'] == 'h') {
        direction = '信用卖出';
      } else if (this.props.content['112'] == 'i') {
        direction = '担保物转入';
      } else if (this.props.content['112'] == 'j') {
        direction = '担保物转出';
      }
    } else if (this.props.content['flag'] == 0) {
      if (this.props.content['112'] == 0 && this.props.content['117'] == 0) {
        direction = '买开';
      } else if (this.props.content['112'] == 1 && this.props.content['117'] == 1) {
        direction = '卖平';
      } else if (this.props.content['112'] == 0 && this.props.content['117'] == 1) {
        direction = '买平';
      } else if (this.props.content['112'] == 1 && this.props.content['117'] == 0) {
        direction = '卖开';
      } else if (this.props.content['112'] == 0 && this.props.content['117'] == 2) {
        direction = '买平今';
      } else if (this.props.content['112'] == 1 && this.props.content['117'] == 2) {
        direction = '卖平今';
      }
    }
    return React.createElement(
      "div",
      { className: "my-modal hide", id: "cancel" },
      React.createElement("div", { className: "my-modal-backdrop" }),
      React.createElement(
        "div",
        { className: "my-modal-dialog" },
        React.createElement(
          "p",
          { className: "title" },
          "撤  单"
        ),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-my-19" },
            React.createElement(
              "span",
              null,
              "合约名称："
            ),
            React.createElement(
              "span",
              null,
              this.props.content['64']
            )
          ),
          React.createElement(
            "div",
            { className: "col-my-20" },
            React.createElement(
              "span",
              null,
              "交易所："
            ),
            React.createElement(
              "span",
              null,
              this.props.content['54']
            )
          )
        ),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-my-19" },
            React.createElement(
              "span",
              null,
              "委托时间："
            ),
            React.createElement(
              "span",
              null,
              this.props.content['159']
            )
          ),
          React.createElement(
            "div",
            { className: "col-my-20" },
            React.createElement(
              "span",
              null,
              "操作方向："
            ),
            React.createElement(
              "span",
              null,
              direction
            )
          )
        ),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-my-19" },
            React.createElement(
              "span",
              null,
              "委托价格："
            ),
            React.createElement(
              "span",
              null,
              this.props.content['price']
            )
          ),
          React.createElement(
            "div",
            { className: "col-my-20" },
            React.createElement(
              "span",
              null,
              "委托数量："
            ),
            React.createElement(
              "span",
              null,
              this.props.content['130']
            )
          )
        ),
        React.createElement(
          "div",
          { className: "row btn-bottom" },
          React.createElement("input", { className: "btn btn-3d0", type: "button", value: "是", onClick: this.cancelOrder.bind(null, this.props.content) }),
          React.createElement("input", { className: "btn btn-6d1", type: "button", value: "否", onClick: this.hideConfirm })
        )
      )
    );
  }
});

//当日委托contents
var EntrustContents = React.createClass({
  displayName: "EntrustContents",

  getDefaultProps: function () {
    return {
      history: false
    };
  },
  getInitialState: function () {
    return {
      content: {
        '64': '',
        '54': '',
        '159': '',
        '129': '',
        '112': '',
        '117': '',
        '130': '',
        '156': '',
        '63': ''
      }
    };
  },
  confirmCancel: function (content) {
    pbE.WT().wtResetKeepAccOnlineTimer;
    this.setState({ content: content });
    /*$('#contents').addClass('contents-fixed');*/
    if (pbE.SYS().showMetalTradeConfrim()) {
    //if (pbE.SYS().showFutureTradeConfirm()) {
      $('#cancel').removeClass('hide');
    } else {
      var X = $('#cancel').offset().top;
      var Y = X + 150;
      $('#indicate').css('top', Y);
      this.cancelOrder(content); //不需要bind
    }
  },
  cancelOrder: function (content) {
    /*$('#contents').removeClass('contents-fixed');*/
    $('#cancel').addClass('hide');
    var data = {
      '65': content['65'],
      '160': content['160'],
      '52': pbE.WT().wtGetGDZH(content['54']),
      '54': content['54'],
      '162': content['162'],
      '63': content['63'],
      '44': content['44'],
      '161': pbE.WT().wtGetXWH(content['54'])
    };
    var par = { 'Pbkey_Circle_CID': CID };
    pbE.SYS().showCircleView('Pbkey_Trade_WT_Circle', JSON.stringify(par));
    pbE.WT().wtCancelEntrust(CID, JSON.stringify(data));
  },
  render: function () {
    var creatContents = function (content) {
      var direction = null;
      var status = null;
      var contract = null,
          price = null;
      var marketInfo = pbUtils.parseJSON(pbE.WT().wtGetHQInfo(content['63'], content['54']));
      var flag = pbE.WT().wtIsGoldFutureOrSpot(marketInfo.HQCode, marketInfo.HQMarket); //0:延期，1:现货
      var buyNum;
      var decimal = pbE.HQ().hqGetPriceDecimal(marketInfo.HQCode, marketInfo.HQMarket);
          //price = pbUtils.decimalDecPrice(decimal, content['114']);
      if (content['113'] < content['130']) {
        buyNum = React.createElement(
          "span",
          { className: "b3" },
          content['113']
        );
      } else {
        buyNum = React.createElement(
          "span",
          { className: "b1" },
          content['113']
        );
      }
      content['flag'] = flag;
      if (flag == 1) {
        if (content['112'] == 1) {
          direction = React.createElement(
            "p",
            { className: "c4 display-table-row" },
            React.createElement(
              "span",
              { className: "display-table-cell" },
              "卖出"
            )
          );
        } else if (content['112'] == 0) {
          direction = React.createElement(
            "p",
            { className: "c3 display-table-row" },
            React.createElement(
              "span",
              { className: "display-table-cell" },
              "买入"
            )
          );
        } else if (content['112'] == 2) {
          direction = React.createElement(
            "p",
            { className: "c1 display-table-row" },
            React.createElement(
              "span",
              { className: "display-table-cell" },
              "ETF申购"
            )
          );
        } else if (content['112'] == 3) {
          direction = React.createElement(
            "p",
            { className: "c1 display-table-row" },
            React.createElement(
              "span",
              { className: "display-table-cell" },
              "ETF赎回"
            )
          );
        } else if (content['112'] == 4) {
          direction = React.createElement(
            "p",
            { className: "c1 display-table-row" },
            React.createElement(
              "span",
              { className: "display-table-cell" },
              "场内基金申购"
            )
          );
        } else if (content['112'] == 5) {
          direction = React.createElement(
            "p",
            { className: "c1 display-table-row" },
            React.createElement(
              "span",
              { className: "display-table-cell" },
              "场内基金赎回"
            )
          );
        } else if (content['112'] == 6) {
          direction = React.createElement(
            "p",
            { className: "c1 display-table-row" },
            React.createElement(
              "span",
              { className: "display-table-cell" },
              "场内基金认购"
            )
          );
        } else if (content['112'] == 7) {
          direction = React.createElement(
            "p",
            { className: "c1 display-table-row" },
            React.createElement(
              "span",
              { className: "display-table-cell" },
              "基金拆分"
            )
          );
        } else if (content['112'] == 8) {
          direction = React.createElement(
            "p",
            { className: "c1 display-table-row" },
            React.createElement(
              "span",
              { className: "display-table-cell" },
              "基金合并"
            )
          );
        } else if (content['112'] == 9) {
          direction = React.createElement(
            "p",
            { className: "c1 display-table-row" },
            React.createElement(
              "span",
              { className: "display-table-cell" },
              "基金转换"
            )
          );
        } else if (content['112'] == 'A') {
          direction = React.createElement(
            "p",
            { className: "c1 display-table-row" },
            React.createElement(
              "span",
              { className: "display-table-cell" },
              "ETF现金认购"
            )
          );
        } else if (content['112'] == 'B') {
          direction = React.createElement(
            "p",
            { className: "c1 display-table-row" },
            React.createElement(
              "span",
              { className: "display-table-cell" },
              "ETF股票认购"
            )
          );
        } else if (content['112'] == 'a') {
          direction = React.createElement(
            "p",
            { className: "c1 display-table-row" },
            React.createElement(
              "span",
              { className: "display-table-cell" },
              "融资买入"
            )
          );
        } else if (content['112'] == 'b') {
          direction = React.createElement(
            "p",
            { className: "c1 display-table-row" },
            React.createElement(
              "span",
              { className: "display-table-cell" },
              "融券卖出"
            )
          );
        } else if (content['112'] == 'c') {
          direction = React.createElement(
            "p",
            { className: "c1 display-table-row" },
            React.createElement(
              "span",
              { className: "display-table-cell" },
              "买券还券"
            )
          );
        } else if (content['112'] == 'd') {
          direction = React.createElement(
            "p",
            { className: "c1 display-table-row" },
            React.createElement(
              "span",
              { className: "display-table-cell" },
              "卖券还款"
            )
          );
        } else if (content['112'] == 'e') {
          direction = React.createElement(
            "p",
            { className: "c1 display-table-row" },
            React.createElement(
              "span",
              { className: "display-table-cell" },
              "直接还券"
            )
          );
        } else if (content['112'] == 'f') {
          direction = React.createElement(
            "p",
            { className: "c1 display-table-row" },
            React.createElement(
              "span",
              { className: "display-table-cell" },
              "直接还款"
            )
          );
        } else if (content['112'] == 'g') {
          direction = React.createElement(
            "p",
            { className: "c1 display-table-row" },
            React.createElement(
              "span",
              { className: "display-table-cell" },
              "信用买入"
            )
          );
        } else if (content['112'] == 'h') {
          direction = React.createElement(
            "p",
            { className: "c1 display-table-row" },
            React.createElement(
              "span",
              { className: "display-table-cell" },
              "信用卖出"
            )
          );
        } else if (content['112'] == 'i') {
          direction = React.createElement(
            "p",
            { className: "c1 display-table-row" },
            React.createElement(
              "span",
              { className: "display-table-cell" },
              "担保物转入"
            )
          );
        } else if (content['112'] == 'j') {
          direction = React.createElement(
            "p",
            { className: "c1 display-table-row" },
            React.createElement(
              "span",
              { className: "display-table-cell" },
              "担保物转出"
            )
          );
        }
      } else if (flag == 0) {
        if (content['117'] == '4') {
          direction = React.createElement(
            "p",
            { className: "c1 display-table-row" },
            React.createElement(
              "span",
              { className: "display-table-cell" },
              "强平"
            )
          );
      } else if (content['117'] == '6') {
        direction = React.createElement(
            "p",
            { className: "c1 display-table-row" },
            React.createElement(
              "span",
              { className: "display-table-cell" },
              "转今"
            )
          );
      } else if (content['112'] == 0 && content['117'] == 0) {
          direction = React.createElement(
            "p",
            { className: "c3 display-table-row" },
            React.createElement(
              "span",
              { className: "display-table-cell" },
              "买开"
            )
          );
        } else if (content['112'] == 1 && content['117'] == 1) {
          direction = React.createElement(
            "p",
            { className: "c4 display-table-row" },
            React.createElement(
              "span",
              { className: "display-table-cell" },
              "卖平"
            )
          );
        } else if (content['112'] == 0 && content['117'] == 1) {
          direction = React.createElement(
            "p",
            { className: "c3 display-table-row" },
            React.createElement(
              "span",
              { className: "display-table-cell" },
              "买平"
            )
          );
        } else if (content['112'] == 1 && content['117'] == 0) {
          direction = React.createElement(
            "p",
            { className: "c4 display-table-row" },
            React.createElement(
              "span",
              { className: "display-table-cell" },
              "卖开"
            )
          );
        } else if (content['112'] == 0 && content['117'] == 2) {
          direction = React.createElement(
            "p",
            { className: "c3 display-table-row" },
            React.createElement(
              "span",
              { className: "display-table-cell" },
              "买平今"
            )
          );
        } else if (content['112'] == 1 && content['117'] == 2) {
          direction = React.createElement(
            "p",
            { className: "c4 display-table-row" },
            React.createElement(
              "span",
              { className: "display-table-cell" },
              "卖平今"
            )
          );
        }
      }
      if (content['156'] == 3) {
        status = React.createElement(
          "p",
          { className: "b3 lh55" },
          "已成"
        );
      } else if (content['156'] == 4) {
        status = React.createElement(
          "p",
          { className: "b4 lh55" },
          "已撤"
        );
      } else if (content['156'] == 1) {
        if (!this.props.history) {
          status = React.createElement(
            "div",
            null,
            React.createElement(
              "p",
              { className: "b1 lh28" },
              "已报"
            ),
            React.createElement(
              "p",
              { className: "lh27" },
              React.createElement("input", { className: "btn btn-my-xs bgc-fe0000", type: "button", value: "撤单", onClick: this.confirmCancel.bind(null, content) })
            )
          );
        } else {
          status = React.createElement(
            "p",
            { className: "b1 lh55" },
            "已报"
          );
        }
      } else if (content['156'] == 6) {
        if (!this.props.history) {
          status = React.createElement(
            "div",
            null,
            React.createElement(
              "p",
              { className: "b1 lh28" },
              "待撤"
            ),
            React.createElement(
              "p",
              { className: "lh27" },
              React.createElement("input", { className: "btn btn-my-xs bgc-fe0000", type: "button", value: "撤单", onClick: this.confirmCancel.bind(null, content) })
            )
          );
        } else {
          status = React.createElement(
            "p",
            { className: "b1 lh55" },
            "待撤"
          );
        }
      } else if (content['156'] == 8) {
        if (!this.props.history) {
          status = React.createElement(
            "div",
            null,
            React.createElement(
              "p",
              { className: "b1 lh28" },
              "待改"
            ),
            React.createElement(
              "p",
              { className: "lh27" },
              React.createElement("input", { className: "btn btn-my-xs bgc-fe0000", type: "button", value: "撤单", onClick: this.confirmCancel.bind(null, content) })
            )
          );
        } else {
          status = React.createElement(
            "p",
            { className: "b1 lh55" },
            "待改"
          );
        }
      } else if (content['156'] == 'h') {
        if (!this.props.history) {
          status = React.createElement(
            "div",
            null,
            React.createElement(
              "p",
              { className: "b1 lh28" },
              "挂起"
            ),
            React.createElement(
              "p",
              { className: "lh27" },
              React.createElement("input", { className: "btn btn-my-xs bgc-fe0000", type: "button", value: "撤单", onClick: this.confirmCancel.bind(null, content) })
            )
          );
        } else {
          status = React.createElement(
            "p",
            { className: "b1 lh55" },
            "挂起"
          );
        }
      } else if (content['156'] == 'p') {
        if (!this.props.history) {
          status = React.createElement(
            "div",
            null,
            React.createElement(
              "p",
              { className: "b1 lh28" },
              "本地开盘触发"
            ),
            React.createElement(
              "p",
              { className: "lh27" },
              React.createElement("input", { className: "btn btn-my-xs bgc-fe0000", type: "button", value: "撤单", onClick: this.confirmCancel.bind(null, content) })
            )
          );
        } else {
          status = React.createElement(
            "p",
            { className: "b1 lh55" },
            "本地开盘触发"
          );
        }
      } else if (content['156'] == 2) {
        if (!this.props.history) {
          status = React.createElement(
            "div",
            null,
            React.createElement(
              "p",
              { className: "b1 lh28" },
              "部成"
            ),
            React.createElement(
              "p",
              { className: "lh27" },
              React.createElement("input", { className: "btn btn-my-xs bgc-fe0000", type: "button", value: "撤单", onClick: this.confirmCancel.bind(null, content) })
            )
          );
        } else {
          status = React.createElement(
            "p",
            { className: "b1 lh55" },
            "部成"
          );
        }
      } else if (content['156'] == 5) {
        status = React.createElement(
          "p",
          { className: "b4 lh55" },
          "部撤"
        );
      } else if (content['156'] == 0) {
        if (!this.props.history) {
          status = React.createElement(
            "div",
            null,
            React.createElement(
              "p",
              { className: "b1 lh28" },
              "未报"
            ),
            React.createElement(
              "p",
              { className: "lh27" },
              React.createElement("input", { className: "btn btn-my-xs bgc-fe0000", type: "button", value: "撤单", onClick: this.confirmCancel.bind(null, content) })
            )
          );
        } else {
          status = React.createElement(
            "p",
            { className: "b1 lh55" },
            "未报"
          );
        }
      } else if (content['156'] == 'e') {
        status = React.createElement(
          "p",
          { className: "b4 lh55" },
          "废单"
        );
      } else if (content['156'] == 'x') {
        if (!this.props.history) {
          status = React.createElement(
            "div",
            null,
            React.createElement(
              "p",
              { className: "b1 lh28" },
              "未知"
            ),
            React.createElement(
              "p",
              { className: "lh27" },
              React.createElement("input", { className: "btn btn-my-xs bgc-fe0000", type: "button", value: "撤单", onClick: this.confirmCancel.bind(null, content) })
            )
          );
        } else {
          status = React.createElement(
            "p",
            { className: "b1 lh55" },
            "未知"
          );
        }
      }
      if (content['64']) {
        contract = content['64'];
      } else {
        contract = content['63'];
      }
      /*if (content['40'] != undefined && content['40'] != '2') {
        price = "市价";
      } else {
        price = content['129'];
      }*/
      //price = content['129'];
      /*if (content['127'] != undefined && content['127'] == 'q') {
        price = pbUtils.decimalDecPrice(decimal, content['129']) + "FOK";
      } else if (content['127'] != undefined && content['127'] == 'p') {
        price = "市价FAK";
      } else if (content['127'] != undefined && content['127'] == 'r') {
        price = "市价FOK";
      } else {
        price = pbUtils.decimalDecPrice(decimal, content['129']);
      }*/
      price = pbUtils.decimalDecPrice(decimal, content['129']);
      content['price'] = price;
      return React.createElement(
        "div",
        { className: "row content" },
        React.createElement(
          "div",
          { className: "col-my-11 text-left" },
          React.createElement(
            "p",
            { className: "a1 name-row" },
            React.createElement(
              "span",
              { className: "display-table-cell" },
              contract
            )
          ),
          React.createElement(
            "p",
            { className: "d2 time-row" },
            React.createElement(
              "span",
              { className: "display-table-cell" },
              content['159']
            )
          )
        ),
        React.createElement(
          "div",
          { className: "col-my-13 text-right" },
          direction
        ),
        React.createElement(
          "div",
          { className: "col-my-11 text-center" },
          React.createElement(
            "p",
            { className: "b1 lh28" },
            price
          ),
          React.createElement(
            "p",
            { className: "b1 lh27" },
            buyNum,
            " ⁄ ",
            content['130']
          )
        ),
        React.createElement(
          "div",
          { className: "col-my-13 text-right" },
          status
        )
      );
    };
    return React.createElement(
      "div",
      null,
      this.props.contents.map(creatContents, this),
      React.createElement(Withdrawals, { content: this.state.content, cancelOrder: this.cancelOrder })
    );
  }
});

//预约转账查询title
var TransferTitle = React.createClass({
  displayName: "TransferTitle",

  render: function () {
    return React.createElement(
      "div",
      { className: "row four-title" },
      React.createElement(
        "div",
        { className: "col-xs-4 text-left" },
        "预约出金日期"
      ),
      React.createElement(
        "div",
        { className: "col-xs-4 text-left" },
        "预约出金金额"
      ),
      React.createElement(
        "div",
        { className: "col-xs-4 text-center" },
        "状态"
      )
    );
  }
});

//预约转账查询contents
var TransferContents = React.createClass({
  displayName: "TransferContents",

  /*jump: function(index, content) {
    storageDetail = content;
  },*/
  render: function () {
    var creatContents = function (content) {
      var contract = null;
      if (content['365']) {
        contract = content['365'];
      } else {
        contract = content['364'];
      }
      var href = "gold-yy-dt.html?par=" + JSON.stringify(content);
      return React.createElement(
        "a",
        { href: href },
        React.createElement(
          "div",
          { className: "row content" },
          React.createElement(
            "div",
            { className: "col-xs-4 text-left" },
            React.createElement(
              "p",
              { className: "c1 lh55" },
              content['707']
            )
          ),
          React.createElement(
            "div",
            { className: "col-xs-4 text-left" },
            React.createElement(
              "p",
              { className: "c1 lh55" },
              content['708']
            )
          ),
          React.createElement(
            "div",
            { className: "col-xs-3 text-left" },
            React.createElement(
              "p",
              { className: "c1 lh55" },
              content['545']
            )
          ),
          React.createElement(
            "div",
            { className: "col-xs-1 text-left image" },
            React.createElement("img", { src: "../../images/more.png" })
          )
        )
      );
    };
    return React.createElement(
      "div",
      null,
      this.props.contents.map(creatContents, this)
    );
  }
});
