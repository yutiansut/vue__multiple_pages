//当日成交content
var DealContents = React.createClass({
  displayName: 'DealContents',
  
  getDefaultProps: function () {
    return {
      history: false
    };
  },

  fold: function (index) {
    $('#hideBox' + index).toggleClass('hide');
    if ($('#arrow' + index).attr('src') == '../../images/arrow-up.png') $('#arrow' + index).attr('src', '../../images/arrow-down.png');else if ($('#arrow' + index).attr('src') == '../../images/arrow-down.png') $('#arrow' + index).attr('src', '../../images/arrow-up.png');
  },
  render: function () {
    var creatContents = function (content, index) {
      var direction = null,
          contract = null;
      var marketInfo = pbUtils.parseJSON(pbE.WT().wtGetHQInfo(content['63'], content['54'])), //交易信息转换行情信息
          decimal = pbE.HQ().hqGetPriceDecimal(marketInfo.HQCode, marketInfo.HQMarket),
          price = pbUtils.decimalDecPrice(decimal, content['114']);
      
      if (content['112'] == 1) {
        direction = React.createElement(
          'p',
          { className: 'c4 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            '卖出'
          )
        );
      } else if (content['112'] == 0) {
        direction = React.createElement(
          'p',
          { className: 'c3 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            '买入'
          )
        );
      } else if (content['112'] == 2) {
        direction = React.createElement(
          'p',
          { className: 'c1 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            'ETF申购'
          )
        );
      } else if (content['112'] == 3) {
        direction = React.createElement(
          'p',
          { className: 'c1 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            'ETF赎回'
          )
        );
      } else if (content['112'] == 4) {
        direction = React.createElement(
          'p',
          { className: 'c1 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            '场内基金申购'
          )
        );
      } else if (content['112'] == 5) {
        direction = React.createElement(
          'p',
          { className: 'c1 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            '场内基金赎回'
          )
        );
      } else if (content['112'] == 6) {
        direction = React.createElement(
          'p',
          { className: 'c1 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            '场内基金认购'
          )
        );
      } else if (content['112'] == 7) {
        direction = React.createElement(
          'p',
          { className: 'c1 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            '基金拆分'
          )
        );
      } else if (content['112'] == 8) {
        direction = React.createElement(
          'p',
          { className: 'c1 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            '基金合并'
          )
        );
      } else if (content['112'] == 9) {
        direction = React.createElement(
          'p',
          { className: 'c1 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            '基金转换'
          )
        );
      } else if (content['112'] == 'A') {
        direction = React.createElement(
          'p',
          { className: 'c1 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            'ETF现金认购'
          )
        );
      } else if (content['112'] == 'B') {
        direction = React.createElement(
          'p',
          { className: 'c1 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            'ETF股票认购'
          )
        );
      } else if (content['112'] == 'a') {
        direction = React.createElement(
          'p',
          { className: 'c1 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            '融资买入'
          )
        );
      } else if (content['112'] == 'b') {
        direction = React.createElement(
          'p',
          { className: 'c1 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            '融券卖出'
          )
        );
      } else if (content['112'] == 'c') {
        direction = React.createElement(
          'p',
          { className: 'c1 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            '买券还券'
          )
        );
      } else if (content['112'] == 'd') {
        direction = React.createElement(
          'p',
          { className: 'c1 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            '卖券还款'
          )
        );
      } else if (content['112'] == 'e') {
        direction = React.createElement(
          'p',
          { className: 'c1 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            '直接还券'
          )
        );
      } else if (content['112'] == 'f') {
        direction = React.createElement(
          'p',
          { className: 'c1 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            '直接还款'
          )
        );
      } else if (content['112'] == 'g') {
        direction = React.createElement(
          'p',
          { className: 'c1 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            '信用买入'
          )
        );
      } else if (content['112'] == 'h') {
        direction = React.createElement(
          'p',
          { className: 'c1 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            '信用卖出'
          )
        );
      } else if (content['112'] == 'i') {
        direction = React.createElement(
          'p',
          { className: 'c1 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            '担保物转入'
          )
        );
      } else if (content['112'] == 'j') {
        direction = React.createElement(
          'p',
          { className: 'c1 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            '担保物转出'
          )
        );
      }
      if (content['64']) {
        contract = content['64'];
      } else {
        contract = content['63'];
      }
      if (!this.props.history) {
        return React.createElement(
          'div',
          { className: 'folder-row' },
          React.createElement(
            'div',
            { className: 'row content', onClick: this.fold.bind(null, index) },
            React.createElement(
              'div',
              { className: 'col-my-4 text-left' },
              React.createElement(
                'p',
                { className: 'a1 name-row' },
                React.createElement(
                  'span',
                  { className: 'display-table-cell' },
                  contract
                )
              ),
              React.createElement(
                'p',
                { className: 'd2 time-row' },
                React.createElement(
                  'span',
                  { className: 'display-table-cell' },
                  content['63']
                )
              )
            ),
            React.createElement(
              'div',
              { className: 'col-my-13 text-center' },
              direction
            ),
            React.createElement(
              'div',
              { className: 'col-my-1 text-center' },
              React.createElement(
                'p',
                { className: 'b1 lh28' },
                price
              ),
              React.createElement(
                'p',
                { className: 'b1 lh27' },
                content['113']
              )
            ),
            React.createElement(
              'div',
              { className: 'col-my-11 text-center' },
              React.createElement('img', { src: '../../images/arrow-down.png', className: 'pd24t pull-right', alt: '更多', id: 'arrow' + index }),
              React.createElement(
                'p',
                { className: 'b1 lh55' },
                content['116']
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'row hide', id: 'hideBox' + index },
            React.createElement(
              'div',
              { className: 'row' },
              React.createElement(
                'div',
                { className: 'col-xs-7' },
                React.createElement(
                  'span',
                  null,
                  '成交编号：'
                ),
                React.createElement(
                  'span',
                  null,
                  content['66']
                )
              ),
              React.createElement(
                'div',
                { className: 'col-xs-5' },
                React.createElement(
                  'span',
                  null,
                  '成交金额：'
                ),
                React.createElement(
                  'span',
                  null,
                  content['133']
                )
              )
            )
          )
        );
      } else {
        return React.createElement(
          "div",
          { className: "folder-row" },
          React.createElement(
            "div",
            { className: "row content", onClick: this.fold.bind(null, index) },
            React.createElement(
              "div",
              { className: "col-my-18 text-left" },
              React.createElement(
                "p",
                { className: "b1 display-table-row" },
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
                "p",
                { className: "b1 lh27" },
                content['113']
              )
            ),
            React.createElement(
              "div",
              { className: "col-my-11 text-center" },
              React.createElement("img", { src: "../../images/arrow-down.png", className: "pd24t pull-right", alt: "更多", id: 'arrow' + index }),
              React.createElement(
                "p",
                { className: "b1 lh55" },
                content['173']
              )
            )
          ),
          React.createElement(
            "div",
            { className: "row hide", id: 'hideBox' + index },
            React.createElement(
              "div",
              { className: "row" },
              React.createElement(
                "div",
                { className: "col-xs-7" },
                React.createElement(
                  "span",
                  null,
                  "成交编号："
                ),
                React.createElement(
                  "span",
                  null,
                  content['66']
                )
              ),
              React.createElement(
                "div",
                { className: "col-xs-5" },
                React.createElement(
                  "span",
                  null,
                  "成交金额："
                ),
                React.createElement(
                  "span",
                  null,
                  content['133']
                )
              )
            )
          )
        );
      }
      
    };
    return React.createElement(
      'div',
      null,
      this.props.contents.map(creatContents, this)
    );
  }
});

//当日委托撤单
var Withdrawals = React.createClass({
  displayName: 'Withdrawals',

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
    if (this.props.content['112'] == 0) {
      direction = '买入';
    } else if (this.props.content['112'] == 1) {
      direction = '卖出';
    }
    return React.createElement(
      'div',
      { className: 'my-modal hide', id: 'cancel' },
      React.createElement('div', { className: 'my-modal-backdrop' }),
      React.createElement(
        'div',
        { className: 'my-modal-dialog' },
        React.createElement(
          'p',
          { className: 'title' },
          '撤  单'
        ),
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'div',
            { className: 'col-my-19' },
            React.createElement(
              'span',
              null,
              '合约名称：'
            ),
            React.createElement(
              'span',
              null,
              this.props.content['64']
            )
          ),
          React.createElement(
            'div',
            { className: 'col-my-20' },
            React.createElement(
              'span',
              null,
              '交易所：'
            ),
            React.createElement(
              'span',
              null,
              this.props.content['54']
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'div',
            { className: 'col-my-19' },
            React.createElement(
              'span',
              null,
              '委托时间：'
            ),
            React.createElement(
              'span',
              null,
              this.props.content['159']
            )
          ),
          React.createElement(
            'div',
            { className: 'col-my-20' },
            React.createElement(
              'span',
              null,
              '操作方向：'
            ),
            React.createElement(
              'span',
              null,
              direction
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'div',
            { className: 'col-my-19' },
            React.createElement(
              'span',
              null,
              '委托价格：'
            ),
            React.createElement(
              'span',
              null,
              this.props.content['price']
            )
          ),
          React.createElement(
            'div',
            { className: 'col-my-20' },
            React.createElement(
              'span',
              null,
              '委托数量：'
            ),
            React.createElement(
              'span',
              null,
              this.props.content['130']
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'row btn-bottom' },
          React.createElement('input', { className: 'btn btn-3d0', type: 'button', value: '是', onClick: this.cancelOrder.bind(null, this.props.content) }),
          React.createElement('input', { className: 'btn btn-6d1', type: 'button', value: '否', onClick: this.hideConfirm })
        )
      )
    );
  }
});

//当日委托内容
var EntrustContents = React.createClass({
  displayName: 'EntrustContents',

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
    if (pbE.SYS().showFutureTradeConfirm()) {
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
      var num = content['130'] + '';
      var marketInfo = pbUtils.parseJSON(pbE.WT().wtGetHQInfo(content['63'], content['54'])), //交易信息转换行情信息
          decimal = pbE.HQ().hqGetPriceDecimal(marketInfo.HQCode, marketInfo.HQMarket);
          //price = pbUtils.decimalDecPrice(decimal, content['114']);
      
      if (num.indexOf('.') > 0) {
        num = num.substring(0, num.indexOf('.'));
      }
      if (content['112'] == 1) {
        direction = React.createElement(
          'p',
          { className: 'c4 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            '卖出'
          )
        );
      } else if (content['112'] == 0) {
        direction = React.createElement(
          'p',
          { className: 'c3 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            '买入'
          )
        );
      } else if (content['112'] == 2) {
        direction = React.createElement(
          'p',
          { className: 'c1 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            'ETF申购'
          )
        );
      } else if (content['112'] == 3) {
        direction = React.createElement(
          'p',
          { className: 'c1 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            'ETF赎回'
          )
        );
      } else if (content['112'] == 4) {
        direction = React.createElement(
          'p',
          { className: 'c1 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            '场内基金申购'
          )
        );
      } else if (content['112'] == 5) {
        direction = React.createElement(
          'p',
          { className: 'c1 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            '场内基金赎回'
          )
        );
      } else if (content['112'] == 6) {
        direction = React.createElement(
          'p',
          { className: 'c1 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            '场内基金认购'
          )
        );
      } else if (content['112'] == 7) {
        direction = React.createElement(
          'p',
          { className: 'c1 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            '基金拆分'
          )
        );
      } else if (content['112'] == 8) {
        direction = React.createElement(
          'p',
          { className: 'c1 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            '基金合并'
          )
        );
      } else if (content['112'] == 9) {
        direction = React.createElement(
          'p',
          { className: 'c1 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            '基金转换'
          )
        );
      } else if (content['112'] == 'A') {
        direction = React.createElement(
          'p',
          { className: 'c1 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            'ETF现金认购'
          )
        );
      } else if (content['112'] == 'B') {
        direction = React.createElement(
          'p',
          { className: 'c1 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            'ETF股票认购'
          )
        );
      } else if (content['112'] == 'a') {
        direction = React.createElement(
          'p',
          { className: 'c1 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            '融资买入'
          )
        );
      } else if (content['112'] == 'b') {
        direction = React.createElement(
          'p',
          { className: 'c1 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            '融券卖出'
          )
        );
      } else if (content['112'] == 'c') {
        direction = React.createElement(
          'p',
          { className: 'c1 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            '买券还券'
          )
        );
      } else if (content['112'] == 'd') {
        direction = React.createElement(
          'p',
          { className: 'c1 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            '卖券还款'
          )
        );
      } else if (content['112'] == 'e') {
        direction = React.createElement(
          'p',
          { className: 'c1 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            '直接还券'
          )
        );
      } else if (content['112'] == 'f') {
        direction = React.createElement(
          'p',
          { className: 'c1 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            '直接还款'
          )
        );
      } else if (content['112'] == 'g') {
        direction = React.createElement(
          'p',
          { className: 'c1 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            '信用买入'
          )
        );
      } else if (content['112'] == 'h') {
        direction = React.createElement(
          'p',
          { className: 'c1 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            '信用卖出'
          )
        );
      } else if (content['112'] == 'i') {
        direction = React.createElement(
          'p',
          { className: 'c1 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            '担保物转入'
          )
        );
      } else if (content['112'] == 'j') {
        direction = React.createElement(
          'p',
          { className: 'c1 display-table-row' },
          React.createElement(
            'span',
            { className: 'display-table-cell' },
            '担保物转出'
          )
        );
      }
      
      if (content['127'] != undefined && content['127'] != 0) {
        price = "市价";
      } else {
        price = pbUtils.decimalDecPrice(decimal, content['129']);
      }
      content['price'] = price;
      if (content['156'] == 3) {
        status = React.createElement(
          'p',
          { className: 'b3 lh55' },
          '已成'
        );
      } else if (content['156'] == 4) {
        status = React.createElement(
          'p',
          { className: 'b4 lh55' },
          '已撤'
        );
      } else if (content['156'] == 1) {
        if (!this.props.history) {
          status = React.createElement(
            'div',
            null,
            React.createElement(
              'p',
              { className: 'b1 lh28' },
              '已报'
            ),
            React.createElement(
              'p',
              { className: 'lh27' },
              React.createElement('input', { className: 'btn btn-my-xs bgc-fe0000', type: 'button', value: '撤单', onClick: this.confirmCancel.bind(null, content) })
            )
          );
        } else {
          status = React.createElement(
            'p',
            { className: 'b1 lh55' },
            '已报'
          );
        }
      } else if (content['156'] == 6) {
        if (!this.props.history) {
          status = React.createElement(
            'div',
            null,
            React.createElement(
              'p',
              { className: 'b1 lh28' },
              '待撤'
            ),
            React.createElement(
              'p',
              { className: 'lh27' },
              React.createElement('input', { className: 'btn btn-my-xs bgc-fe0000', type: 'button', value: '撤单', onClick: this.confirmCancel.bind(null, content) })
            )
          );
        } else {
          status = React.createElement(
            'p',
            { className: 'b1 lh55' },
            '待撤'
          );
        }
      } else if (content['156'] == 8) {
        if (!this.props.history) {
          status = React.createElement(
            'div',
            null,
            React.createElement(
              'p',
              { className: 'b1 lh28' },
              '待改'
            ),
            React.createElement(
              'p',
              { className: 'lh27' },
              React.createElement('input', { className: 'btn btn-my-xs bgc-fe0000', type: 'button', value: '撤单', onClick: this.confirmCancel.bind(null, content) })
            )
          );
        } else {
          status = React.createElement(
            'p',
            { className: 'b1 lh55' },
            '待改'
          );
        }
      } else if (content['156'] == 'h') {
        if (!this.props.history) {
          status = React.createElement(
            'div',
            null,
            React.createElement(
              'p',
              { className: 'b1 lh28' },
              '挂起'
            ),
            React.createElement(
              'p',
              { className: 'lh27' },
              React.createElement('input', { className: 'btn btn-my-xs bgc-fe0000', type: 'button', value: '撤单', onClick: this.confirmCancel.bind(null, content) })
            )
          );
        } else {
          status = React.createElement(
            'p',
            { className: 'b1 lh55' },
            '挂起'
          );
        }
      } else if (content['156'] == 'p') {
        if (!this.props.history) {
          status = React.createElement(
            'div',
            null,
            React.createElement(
              'p',
              { className: 'b1 lh28' },
              '本地开盘触发'
            ),
            React.createElement(
              'p',
              { className: 'lh27' },
              React.createElement('input', { className: 'btn btn-my-xs bgc-fe0000', type: 'button', value: '撤单', onClick: this.confirmCancel.bind(null, content) })
            )
          );
        } else {
          status = React.createElement(
            'p',
            { className: 'b1 lh55' },
            '本地开盘触发'
          );
        }
      } else if (content['156'] == 2) {
        if (!this.props.history) {
          status = React.createElement(
            'div',
            null,
            React.createElement(
              'p',
              { className: 'b1 lh28' },
              '部成'
            ),
            React.createElement(
              'p',
              { className: 'lh27' },
              React.createElement('input', { className: 'btn btn-my-xs bgc-fe0000', type: 'button', value: '撤单', onClick: this.confirmCancel.bind(null, content) })
            )
          );
        } else {
          status = React.createElement(
            'p',
            { className: 'b1 lh55' },
            '部成'
          );
        }
      } else if (content['156'] == 5) {
        status = React.createElement(
          'p',
          { className: 'b4 lh55' },
          '部撤'
        );
      } else if (content['156'] == 0) {
        if (!this.props.history) {
          status = React.createElement(
            'div',
            null,
            React.createElement(
              'p',
              { className: 'b1 lh28' },
              '未报'
            ),
            React.createElement(
              'p',
              { className: 'lh27' },
              React.createElement('input', { className: 'btn btn-my-xs bgc-fe0000', type: 'button', value: '撤单', onClick: this.confirmCancel.bind(null, content) })
            )
          );
        } else {
          status = React.createElement(
            'p',
            { className: 'b1 lh55' },
            '未报'
          );
        }
      } else if (content['156'] == 'e') {
        status = React.createElement(
          'p',
          { className: 'b4 lh55' },
          '废单'
        );
      } else if (content['156'] == 'x') {
        if (!this.props.history) {
          status = React.createElement(
            'div',
            null,
            React.createElement(
              'p',
              { className: 'b1 lh28' },
              '未知'
            ),
            React.createElement(
              'p',
              { className: 'lh27' },
              React.createElement('input', { className: 'btn btn-my-xs bgc-fe0000', type: 'button', value: '撤单', onClick: this.confirmCancel.bind(null, content) })
            )
          );
        } else {
          status = React.createElement(
            'p',
            { className: 'b1 lh55' },
            '未知'
          );
        }
      }
      if (content['64']) {
        contract = content['64'];
      } else {
        contract = content['63'];
      }

      return React.createElement(
        'div',
        { className: 'folder-row' },
        React.createElement(
          'div',
          { className: 'row content' },
          React.createElement(
            'div',
            { className: 'col-my-1 text-left' },
            React.createElement(
              'p',
              { className: 'a1 name-row' },
              React.createElement(
                'span',
                { className: 'display-table-cell' },
                contract
              )
            ),
            React.createElement(
              'p',
              { className: 'd1 time-row' },
              React.createElement(
                'span',
                { className: 'display-table-cell' },
                content['63']
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'col-my-16 text-center' },
            React.createElement(
              'p',
              { className: 'c1 lh55' },
              content['159']
            )
          ),
          React.createElement(
            'div',
            { className: 'col-my-14 text-right' },
            direction
          ),
          React.createElement(
            'div',
            { className: 'col-my-18 text-center' },
            React.createElement(
              'p',
              { className: 'b1 lh28' },
              price
            ),
            React.createElement(
              'p',
              { className: 'b1 lh27' },
              React.createElement(
                'span',
                { className: 'b3' },
                content['113']
              ),
              ' | ',
              num
            )
          ),
          React.createElement(
            'div',
            { className: 'col-my-13 text-right' },
            status
          )
        )
      );
    };
    return React.createElement(
      'div',
      null,
      this.props.contents.map(creatContents, this),
      React.createElement(Withdrawals, { content: this.state.content, cancelOrder: this.cancelOrder })
    );
  }
});

var EntrustContentsHistory = React.createClass({
  displayName: "EntrustContentsHistory",

  render: function () {
    var creatContents = function (content) {
      var direction = null;
      var status = null;
      var contract = null,
          price = null;
      var marketInfo = pbUtils.parseJSON(pbE.WT().wtGetHQInfo(content['63'], content['54'])), //交易信息转换行情信息
          decimal = pbE.HQ().hqGetPriceDecimal(marketInfo.HQCode, marketInfo.HQMarket);
          //price = pbUtils.decimalDecPrice(decimal, content['114']);
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
      if (content['64']) {
        contract = content['64'];
      } else {
        contract = content['63'];
      }
      if (content['127'] != undefined && content['127'] != 0) {
        price = "市价";
      } else {
        price = pbUtils.decimalDecPrice(decimal, content['129']);
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
        status = React.createElement(
          "p",
          { className: "b1 lh55" },
          "已报"
        );
      } else if (content['156'] == 6) {
        status = React.createElement(
          "p",
          { className: "b1 lh55" },
          "待撤"
        );
      } else if (content['156'] == 8) {
        status = React.createElement(
          "p",
          { className: "b1 lh55" },
          "待改"
        );
      } else if (content['156'] == 'h') {
        status = React.createElement(
          "p",
          { className: "b1 lh55" },
          "挂起"
        );
      } else if (content['156'] == 'p') {
        status = React.createElement(
          "p",
          { className: "b1 lh55" },
          "本地开盘触发"
        );
      } else if (content['156'] == 2) {
        status = React.createElement(
          "p",
          { className: "b1 lh55" },
          "部成"
        );
      } else if (content['156'] == 5) {
        status = React.createElement(
          "p",
          { className: "b4 lh55" },
          "部撤"
        );
      } else if (content['156'] == 0) {
        status = React.createElement(
          "p",
          { className: "b1 lh55" },
          "未报"
        );
      } else if (content['156'] == 'e') {
        status = React.createElement(
          "p",
          { className: "b4 lh55" },
          "废单"
        );
      } else if (content['156'] == 'x') {
        status = React.createElement(
          "p",
          { className: "b1 lh55" },
          "未知"
        );
      }
      return React.createElement(
        "div",
        { className: "folder-row" },
        React.createElement(
          "div",
          { className: "row content" },
          React.createElement(
            "div",
            { className: "col-my-1 text-left" },
            React.createElement(
              "p",
              { className: "c1 display-table-row" },
              React.createElement(
                "span",
                { className: "display-table-cell" },
                contract
              )
            )
          ),
          React.createElement(
            "div",
            { className: "col-my-16 text-center" },
            React.createElement(
              "p",
              { className: "e1 lh55" },
              content['160']
            )
          ),
          React.createElement(
            "div",
            { className: "col-my-14 text-right" },
            direction
          ),
          React.createElement(
            "div",
            { className: "col-my-18 text-center" },
            React.createElement(
              "p",
              { className: "b1 lh28" },
              price
            ),
            React.createElement(
              "p",
              { className: "b1 lh27" },
              React.createElement(
                "span",
                { className: "b3" },
                content['113']
              ),
              " | ",
              content['130']
            )
          ),
          React.createElement(
            "div",
            { className: "col-my-13 text-right" },
            status
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

var TimeTitle = React.createClass({
  displayName: "TimeTitle",
  
  getDefaultProps: function () {
    return {
      entrust: false
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
        if (!this.props.entrust) {
          if (!dataThree) {
            pbE.WT().wtGeneralRequest(CID, 6053, JSON.stringify(dataTime));
          } else {
            ReactDOM.render(React.createElement(DealContents, { contents: dataThree, history: true }), contentsDom);
          }
        } else {
          if (!dataThree) {
            pbE.WT().wtGeneralRequest(CID, 6052, JSON.stringify(dataTime));
          } else {
            ReactDOM.render(React.createElement(EntrustContentsHistory, { contents: dataThree }), contentsDom);
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
        if (!this.props.entrust) {
          if (!dataWeek) {
            pbE.WT().wtGeneralRequest(CID, 6053, JSON.stringify(dataTime));
          } else {
            ReactDOM.render(React.createElement(DealContents, { contents: dataWeek, history: true }), contentsDom);
          }
        } else {
          if (!dataWeek) {
            pbE.WT().wtGeneralRequest(CID, 6052, JSON.stringify(dataTime));
          } else {
            ReactDOM.render(React.createElement(EntrustContentsHistory, { contents: dataWeek }), contentsDom);
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
        if (!this.props.entrust) {
          if (!dataMonth) {
            pbE.WT().wtGeneralRequest(CID, 6053, JSON.stringify(dataTime));
          } else {
            ReactDOM.render(React.createElement(DealContents, { contents: dataMonth, history: true }), contentsDom);
          }
        } else {
          if (!dataMonth) {
            pbE.WT().wtGeneralRequest(CID, 6052, JSON.stringify(dataTime));
          } else {
            ReactDOM.render(React.createElement(EntrustContentsHistory, { contents: dataMonth }), contentsDom);
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
        if (!this.props.entrust) {
          if (!dataRandom) {
            pbE.WT().wtGeneralRequest(CID, 6053, JSON.stringify(dataTime));
          } else {
            ReactDOM.render(React.createElement(DealContents, { contents: dataRandom, history: true }), contentsDom);
          }
        } else {
          if (!dataRandom) {
            pbE.WT().wtGeneralRequest(CID, 6052, JSON.stringify(dataTime));
          } else {
            ReactDOM.render(React.createElement(EntrustContentsHistory, { contents: dataRandom }), contentsDom);
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

var PositionContents = React.createClass({
  displayName: "PositionContents",

  fold: function (index) {
    $('#hideBox' + index).toggleClass('hide');
    if ($('#arrow' + index).attr('src') == '../../images/arrow-up.png') $('#arrow' + index).attr('src', '../../images/arrow-down.png');else if ($('#arrow' + index).attr('src') == '../../images/arrow-down.png') $('#arrow' + index).attr('src', '../../images/arrow-up.png');
  },

  jump: function (content, flag) {
    content['mmflag'] = flag;
    pbE.SYS().sendMessageToNative('Pbkey_H5_Position_XD_Data', JSON.stringify(content));
  },

  render: function () {
    var creatContents = function (content, index) {
      var pl = null,
          path = null,
          contract = null,
          href = 'pobo:pageId=801001&market=' + content['market'] + '&code=' + content['code'] + '&groupflag=' + content['groupflag'] + '&hideflag=1';
      if (content['profit'] > 0) {
        path = React.createElement(
          "div",
          { className: "imageBar pull-left" },
          React.createElement("img", { src: "../../images/redBar.png", alt: "盈利条", width: "2", height: "130" })
        );
        if (isNaN(content['fd'])) {
          pl = React.createElement(
            "p",
            { className: "b3 lh55 profit" },
            '+' + content['profit'] + ' ' + '(' + content['fd'] + ')'
          );
        } else if (!isNaN(content['fd'])) {
          pl = React.createElement(
            "p",
            { className: "b3 lh55 profit" },
            '+' + content['profit'] + ' ' + '(+' + content['fd'] + ')'
          );
        }
      } else if (content['profit'] < 0) {
        path = React.createElement(
          "div",
          { className: "imageBar pull-left" },
          React.createElement("img", { src: "../../images/greenBar.png", alt: "盈利条", width: "2", height: "130" })
        );
        pl = React.createElement(
          "p",
          { className: "b4 lh55 profit" },
          content['profit'] + ' ' + '(' + content['fd'] + ')'
        );
      } else {
        path = React.createElement("div",
                                   {className: "imageBar pull-left"},
                                   null);
        pl = React.createElement(
          "p",
          { className: "b1 lh55 profit" },
          content['profit'] + ' ' + '(' + content['fd'] + ')'
        );
      }

      if (content['64']) {
        contract = content['64'];
      } else {
        contract = content['63'];
      }

      return React.createElement(
        "div",
        { onClick: this.fold.bind(null, index) },
        React.createElement("div", { className: "nav-blank row" }),
        React.createElement(
          "div",
          { className: "position-row", id: content['63'] + '_' + content['112']},
          path,
          React.createElement(
            "div",
            { className: "content"},
            React.createElement(
              "div",
              { className: "col-my-1 text-left" },
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
                  content['63']
                )
              )
            ),
            React.createElement(
              "div",
              { className: "col-my-2 text-left" },
              pl
            )
          ),
          React.createElement(
            "div",
            { className: "content" },
            React.createElement(
              "div",
              { className: "col-my-4 details-top" },
              React.createElement(
                "p",
                { className: "c2 lh30" },
                "现价 ",
                React.createElement(
                  "span",
                  { className: "c1 price" },
                  content['price']
                )
              ),
              React.createElement(
                "p",
                { className: "c2 lh30" },
                "成本 ",
                React.createElement(
                  "span",
                  { className: "c1" },
                  content['avg']
                )
              )
            ),
            React.createElement(
              "div",
              { className: "pull-left col-my-4 details-top" },
              React.createElement(
                "p",
                { className: "c2 lh30" },
                "持仓 ",
                React.createElement(
                  "span",
                  { className: "c1" },
                  content['135']
                )
              ),
              React.createElement(
                "p",
                { className: "c2 lh30" },
                "可用 ",
                React.createElement(
                  "span",
                  { className: "c1" },
                  content['137']
                )
              )
            ),
            React.createElement(
              "div",
              { className: "pull-left details-top col-my-5 style1" },
              React.createElement("img", { src: "../../images/arrow-down.png", id: 'arrow' + index })
            ),
            React.createElement(
              "div",
              { className: "a8 lh30" },
              "市值  ",
                React.createElement(
                    "span",
                    { className: "cap" },
                    pbUtils.comma(content['142'], 2)
                )
            ),
            React.createElement(
              "div",
              { className: "hide style2", id: 'hideBox' + index },
              React.createElement(
                "div",
                { className: "col-xs-4", onClick: this.jump.bind(null, content, '0') },
                React.createElement(
                  "a",
                  { href: "javascript:void(0);", className: "icon style3" },
                  React.createElement("img", { src: "../../images/iconBuy.png", alt: "买入" }),
                  React.createElement(
                    "span",
                    { className: "b19 lh30" },
                    " 买入"
                  )
                )
              ),
              React.createElement(
                "div",
                { className: "col-xs-4 text-center", onClick: this.jump.bind(null, content, '1') },
                React.createElement(
                  "a",
                  { href: "javascript:void(0);", className: "icon" },
                  React.createElement("img", { src: "../../images/sell.png", alt: "卖出" }),
                  React.createElement(
                    "span",
                    { className: "b19 lh30" },
                    " 卖出"
                  )
                )
              ),
              React.createElement(
                "div",
                { className: "col-xs-4 text-right" },
                React.createElement(
                  "a",
                  { href: href, className: "icon style4" },
                  React.createElement("img", { src: "../../images/situation.png", alt: "行情" }),
                  React.createElement(
                    "span",
                    { className: "b19 lh30" },
                    " 行情"
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
