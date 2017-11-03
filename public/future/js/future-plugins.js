var dayDeal = '当日成交',
    dayEntrust = '当日委托',
    historicalDeal = '历史成交',
    historicalEntrust = '历史委托',
    capitalStatus = '资金现状',
    stockName = '股票名称',
    direction = '方向',
    num = '数量',
    pri = '价格',
    dealName = '合约名称',
    pn = '价 | 量',
    dealTime = '成交时间',
    anarchy = '状态',
    entrustTime = '委托时间',
    buy = '买入',
    sold  = '卖出',
    buyOpen = '买开',
    sellFlat = '卖平',
    buyFla = '买平',
    sellOff = '卖开',
    dealloan = '成交金额',
    ynCovered = '是否备兑',
    contractCode = '合约编码',
    noteinfo = '备注信息',
    note = '备注',
    buyFlaDay = '买平今',
    sellFlatDay = '卖平今',
    entrustNum = '委托数量',
    secondMenu1 = '委托数量',
    secondMenu2 = '成交数量',
    secondMenu3 = '',
    secondMenu4 = '',
    operate = '操作方向',
    entrustpri = '委托价格',
    hasBecome = '已成',
    hasDeclare = '已报',
    Part = '部成',
    withdrawal = '部撤',
    BeingReported = '未报',
    revoke = '已撤';

var NavHeader = React.createClass({
  displayName: 'NavHeader',

  render: function () {
    return React.createElement(
      'div',
      { className: 'container-fluid' },
      React.createElement(
        'div',
        { className: 'navbar-header' },
        React.createElement(
          'a',
          { href: 'goBack', className: 'navbar-brand' },
          React.createElement('img', { src: '../../images/goback.png', alt: '返回' })
        )
      ),
      React.createElement(
        'p',
        { className: 'navbar-text' },
        this.props.name
      )
    );
  }
});

var PositionContentsFutures = React.createClass({
  displayName: 'PositionContentsFutures',

  jump: function (content) {
    pbE.SYS().sendMessageToNative('Pbkey_H5_Position_XD_Data', JSON.stringify(content));
  },

  render: function () {
    var creatContents = function (content) {
      if (content['qhqq'] == '1') {
        content['125'] = 0;
        var pl = null,
            path = null,
            status = null,
            price = null,
            contract = null,
            remain = null,
            baozhi = null,
            contract1 = null;
        var href = 'pobo:pageId=807003&market=' + content['market'] + '&code=' + content['code'] + '&groupflag=' + content['groupflag'] + '&hideflag=1';
        if (isNaN(content['profit'])) {
          pl = React.createElement(
            'p',
            { className: 'lh35' },
            React.createElement(
              'span',
              { className: 'b2' },
              '浮盈  ',
              React.createElement(
                'span',
                { className: 'a1 profit' },
                content['profit']
              )
            )
          );
        } else {
          if (content['profit'] > 0) {
            pl = React.createElement(
              'p',
              { className: 'lh35' },
              React.createElement(
                'span',
                { className: 'b2' },
                '浮盈  ',
                React.createElement(
                  'span',
                  { className: 'a3 profit' },
                  '+' + content['profit']
                )
              )
            );
          } else if (content['profit'] < 0) {
            pl = React.createElement(
              'p',
              { className: 'lh35' },
              React.createElement(
                'span',
                { className: 'b2' },
                '浮盈  ',
                React.createElement(
                  'span',
                  { className: 'a4 profit' },
                  content['profit']
                )
              )
            );
          } else if (content['profit'] == 0) {
            pl = React.createElement(
              'p',
              { className: 'lh35' },
              React.createElement(
                'span',
                { className: 'b2' },
                '浮盈  ',
                React.createElement(
                  'span',
                  { className: 'a1 profit' },
                  content['profit']
                )
              )
            );
          }
        }
        if (content['125'] == '1' || content['125'] == '0' && content['112'] == '0') {
          if (content['profit'] > 0) {
            path = React.createElement(
              'div',
              { className: 'imageBar pull-left' },
              React.createElement('img', { src: '../../images/redBar.png', alt: '盈利条' })
            );
          } else if (content['profit'] < 0) {
            path = React.createElement(
              'div',
              { className: 'imageBar pull-left' },
              React.createElement('img', { src: '../../images/greenBar.png', alt: '盈利条' })
            );
          } else {
            path = React.createElement('div', null);
          }
        } else if (content['125'] == '0' && content['112'] == '1') {
          if (content['profit'] > 0) {
            path = React.createElement(
              'div',
              { className: 'imageBar pull-left' },
              React.createElement('img', { src: '../../images/redBar.png', alt: '盈利条', height: '100', width: '2' })
            );
          } else if (content['profit'] < 0) {
            path = React.createElement(
              'div',
              { className: 'imageBar pull-left' },
              React.createElement('img', { src: '../../images/greenBar.png', alt: '盈利条', height: '100', width: '2' })
            );
          } else {
            path = React.createElement('div', null);
          }
        }

        if (content['125'] == '1') {
          status = React.createElement(
            'div',
            { className: 'pull-left pd7t pd3zy' },
            React.createElement('img', { src: '../../images/beidui.png', alt: '备兑', width: '21px', height: '42px' })
          );
          if (content['remain'] == '0') {
            remain = React.createElement(
              'p',
              { className: 'pull-right' },
              '等待权利方行权'
            );
          } else {
            remain = React.createElement(
              'p',
              { className: 'pull-right' },
              '剩余',
              React.createElement(
                'span',
                null,
                content['remain']
              ),
              '天'
            );
          }
        } else if (content['125'] == '0') {
          if (content['112'] == '0') {
            status = React.createElement(
              'div',
              { className: 'pull-left pd7t pd3zy' },
              React.createElement('img', { src: '../images/quanli.png', alt: '权利', width: '21px', height: '42px' })
            );
            remain = React.createElement(
              'p',
              { className: 'pull-right' },
              '剩余',
              React.createElement(
                'span',
                null,
                content['remain']
              ),
              '天'
            );
          } else if (content['112'] == '1') {
            status = React.createElement(
              'div',
              { className: 'pull-left pd7t pd3zy' },
              React.createElement('img', { src: '../images/yiwu.png', alt: '义务', width: '21px', height: '42px' })
            );
            if (content['remain'] == '0') {
              remain = React.createElement(
                'p',
                { className: 'pull-right' },
                '等待权利方行权'
              );
            } else {
              remain = React.createElement(
                'p',
                { className: 'pull-right' },
                '剩余',
                React.createElement(
                  'span',
                  null,
                  content['remain']
                ),
                '天'
              );
            }
          }
        }
        contract = JSON.parse(pbE.HQ().getHQInfo(content['code'], content['market'])).name;
        if (!contract) {
          if (content['64']) {
            contract = content['64'];
          } else {
            contract = content['63'];
          }
        }
        if (content['119'] == '3') {
          baozhi = React.createElement(
            'div',
            { style: { display: 'inline-block', width: '20%' } },
            React.createElement('img', { src: '../../images/baozhi.png', width: '40' })
          );
          contract1 = React.createElement(
            'p',
            { className: 'a1', style: { width: '30%' } },
            contract
          );
        } else {
          baozhi = null;
          contract1 = React.createElement(
            'p',
            { className: 'a1' },
            contract
          );
        }

        if (content['125'] == '1' || content['125'] == '0' && content['112'] == '0') {
          return React.createElement(
            'div',
            { className: 'normal' },
            React.createElement('div', { className: 'nav-blank' }),
            React.createElement(
              'div',
              { className: 'position-row', onClick: this.jump.bind(null, content), id: content['63'] + '_' + content['112'] + '_' + content['qhqq'] + '_' + content['125'] + '_' + content['503'] },
              path,
              React.createElement(
                'div',
                { className: 'details' },
                React.createElement(
                  'div',
                  { className: 'details-title' },
                  contract1,
                  baozhi,
                  pl
                ),
                React.createElement(
                  'div',
                  { className: 'details-content row' },
                  status,
                  React.createElement(
                    'div',
                    { className: 'col-my-12 details-top' },
                    React.createElement(
                      'p',
                      { className: 'c2' },
                      '现价 ',
                      React.createElement(
                        'span',
                        { className: 'c1 price' },
                        content['price']
                      )
                    ),
                    React.createElement(
                      'p',
                      { className: 'c2' },
                      '成本 ',
                      React.createElement(
                        'span',
                        { className: 'c1' },
                        content['avg']
                      )
                    )
                  ),
                  React.createElement(
                    'div',
                    { className: 'pull-left col-my-6 details-top' },
                    React.createElement(
                      'p',
                      { className: 'c2' },
                      '持仓 ',
                      React.createElement(
                        'span',
                        { className: 'c1' },
                        content['135']
                      )
                    ),
                    React.createElement(
                      'p',
                      { className: 'c2' },
                      '可用 ',
                      React.createElement(
                        'span',
                        { className: 'c1' },
                        content['available']
                      )
                    )
                  ),
                  React.createElement(
                    'div',
                    { className: 'remain' },
                    remain,
                    React.createElement(
                      'p',
                      { className: 'pull-right' },
                      content['date']
                    )
                  )
                )
              )
            )
          );
        } else if (content['125'] == '0' && content['112'] == '1') {
          return React.createElement(
            'div',
            { className: 'special' },
            React.createElement('div', { className: 'nav-blank' }),
            React.createElement(
              'div',
              { className: 'position-row', onClick: this.jump.bind(null, content), id: content['63'] + '_' + content['112'] + '_' + content['qhqq'] + '_' + content['125'] + '_' + content['503'] },
              path,
              React.createElement(
                'div',
                { className: 'details' },
                React.createElement(
                  'div',
                  { className: 'details-title' },
                  React.createElement(
                    'p',
                    { className: 'a1' },
                    contract
                  ),
                  pl
                ),
                React.createElement(
                  'div',
                  { className: 'details-content row' },
                  status,
                  React.createElement(
                    'div',
                    { className: 'col-my-12 details-top' },
                    React.createElement(
                      'p',
                      { className: 'c2' },
                      '现价 ',
                      React.createElement(
                        'span',
                        { className: 'c1 price' },
                        content['price']
                      )
                    ),
                    React.createElement(
                      'p',
                      { className: 'c2' },
                      '成本 ',
                      React.createElement(
                        'span',
                        { className: 'c1' },
                        content['avg']
                      )
                    )
                  ),
                  React.createElement(
                    'div',
                    { className: 'pull-left col-my-6 details-top' },
                    React.createElement(
                      'p',
                      { className: 'c2' },
                      '持仓 ',
                      React.createElement(
                        'span',
                        { className: 'c1' },
                        content['135']
                      )
                    ),
                    React.createElement(
                      'p',
                      { className: 'c2' },
                      '可用 ',
                      React.createElement(
                        'span',
                        { className: 'c1' },
                        content['available']
                      )
                    )
                  ),
                  React.createElement(
                    'div',
                    { className: 'remain' },
                    remain,
                    React.createElement(
                      'p',
                      { className: 'pull-right' },
                      content['date']
                    )
                  )
                )
              ),
              React.createElement(
                'div',
                { className: 'bao' },
                React.createElement('img', { src: '../../images/bao.png', height: '20' }),
                React.createElement(
                  'span',
                  { className: 'bao-num' },
                  (content['152'] - 0).toFixed(2)
                )
              )
            )
          );
        }
      } else {
        var pl = null,
            path = null,
            status = null,
            contract = null,
            contract1 = null,
            baozhi = null;
        var href = 'pobo:pageId=807003&market=' + content['market'] + '&code=' + content['code'] + '&groupflag=' + content['groupflag'] + '&hideflag=1';
        if (isNaN(content['profit'])) {
          pl = React.createElement(
            'p',
            { className: 'lh35' },
            React.createElement(
              'span',
              { className: 'b2' },
              '浮盈  ',
              React.createElement(
                'span',
                { className: 'a1 profit' },
                content['profit']
              )
            )
          );
        } else {
          if (content['profit'] > 0) {
            pl = React.createElement(
              'p',
              { className: 'lh35' },
              React.createElement(
                'span',
                { className: 'b2' },
                '浮盈  ',
                React.createElement(
                  'span',
                  { className: 'a3 profit' },
                  '+' + content['profit']
                )
              )
            );
            path = React.createElement(
              'div',
              { className: 'imageBar pull-left' },
              React.createElement('img', { src: '../../images/redBar.png', alt: '盈利条' })
            );
          } else if (content['profit'] < 0) {
            pl = React.createElement(
              'p',
              { className: 'lh35' },
              React.createElement(
                'span',
                { className: 'b2' },
                '浮盈  ',
                React.createElement(
                  'span',
                  { className: 'a4 profit' },
                  content['profit']
                )
              )
            );
            path = React.createElement(
              'div',
              { className: 'imageBar pull-left' },
              React.createElement('img', { src: '../../images/greenBar.png', alt: '盈利条' })
            );
          } else if (content['profit'] == 0) {
            pl = React.createElement(
              'p',
              { className: 'lh35' },
              React.createElement(
                'span',
                { className: 'b2' },
                '浮盈  ',
                React.createElement(
                  'span',
                  { className: 'a1 profit' },
                  content['profit']
                )
              )
            );
          }
        }
        if (path == null) {
          path = React.createElement('div', null);
        }

        if (content['112'] == '0') {
          if (content['503'] == '1') {
            /*status = (<div className="e3 pull-right buy-sign">多今</div>);*/
            status = React.createElement(
              'div',
              { className: 'pull-left pd7t pd3zy' },
              React.createElement('img', { src: '../../images/duojin.png', alt: '多今', width: '21px', height: '42px' })
            );
          } else if (content['503'] == '2') {
            /*status = (<div className="e3 pull-right buy-sign">多昨</div>);*/
            status = React.createElement(
              'div',
              { className: 'pull-left pd7t pd3zy' },
              React.createElement('img', { src: '../../images/duozuo.png', alt: '多昨', width: '21px', height: '42px' })
            );
          } else {
            /*status = (<div className="e3 pull-right buy-sign">多仓</div>);*/
            status = React.createElement(
              'div',
              { className: 'pull-left pd7t pd3zy' },
              React.createElement('img', { src: '../../images/duocang.png', alt: '多仓', width: '21px', height: '42px' })
            );
          }
        } else if (content['112'] == '1') {
          if (content['503'] == '1') {
            /*status = (<div className="e4 pull-right buy-sign">空今</div>);*/
            status = React.createElement(
              'div',
              { className: 'pull-left pd7t pd3zy' },
              React.createElement('img', { src: '../../images/kongjin.png', alt: '空今', width: '21px', height: '42px' })
            );
          } else if (content['503'] == '2') {
            /*status = (<div className="e4 pull-right buy-sign">空昨</div>);*/
            status = React.createElement(
              'div',
              { className: 'pull-left pd7t pd3zy' },
              React.createElement('img', { src: '../../images/kongzuo.png', alt: '空昨', width: '21px', height: '42px' })
            );
          } else {
            /*status = (<div className="e4 pull-right buy-sign">空仓</div>);*/
            status = React.createElement(
              'div',
              { className: 'pull-left pd7t pd3zy' },
              React.createElement('img', { src: '../../images/kongcang.png', alt: '空仓', width: '21px', height: '42px' })
            );
          }
        }

        contract = JSON.parse(pbE.HQ().getHQInfo(content['code'], content['market'])).name;
        if (!contract) {
          if (content['64']) {
            contract = content['64'];
          } else {
            contract = content['63'];
          }
        }

        if (content['119'] == '3') {
          baozhi = React.createElement(
            'div',
            { style: { display: 'inline-block', width: '20%' } },
            React.createElement('img', { src: '../../images/baozhi.png', width: '40' })
          );
          contract1 = React.createElement(
            'p',
            { className: 'a1', style: { width: '30%' } },
            contract
          );
        } else {
          baozhi = null;
          contract1 = React.createElement(
            'p',
            { className: 'a1' },
            contract
          );
        }

        return React.createElement(
          'div',
          null,
          React.createElement('div', { className: 'nav-blank' }),
          React.createElement(
            'div',
            { className: 'position-row', onClick: this.jump.bind(null, content), id: content['63'] + '_' + content['112'] + '_' + content['qhqq'] + '_' + content['125'] + '_' + content['503'] },
            path,
            React.createElement(
              'div',
              { className: 'details' },
              React.createElement(
                'div',
                { className: 'details-title' },
                contract1,
                baozhi,
                pl
              ),
              React.createElement(
                'div',
                { className: 'details-content row' },
                status,
                React.createElement(
                  'div',
                  { className: 'col-my-12 details-top' },
                  React.createElement(
                    'p',
                    { className: 'c2' },
                    '现价 ',
                    React.createElement(
                      'span',
                      { className: 'c1 price' },
                      content['price']
                    )
                  ),
                  React.createElement(
                    'p',
                    { className: 'c2' },
                    '成本 ',
                    React.createElement(
                      'span',
                      { className: 'c1' },
                      content['avg']
                    )
                  )
                ),
                React.createElement(
                  'div',
                  { className: 'pull-left col-my-6 details-top' },
                  React.createElement(
                    'p',
                    { className: 'c2' },
                    '持仓 ',
                    React.createElement(
                      'span',
                      { className: 'c1' },
                      content['135']
                    )
                  ),
                  React.createElement(
                    'p',
                    { className: 'c2' },
                    '可用 ',
                    React.createElement(
                      'span',
                      { className: 'c1' },
                      content['available']
                    )
                  )
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

var DealTitleFutures = React.createClass({
  displayName: 'DealTitleFutures',

  render: function () {
    return React.createElement(
      'div',
      { className: 'row four-title' },
      React.createElement(
        'div',
        { className: 'col-my-11 text-left' },
          dealName
      ),
      React.createElement(
        'div',
        { className: 'col-my-13 text-left' },
          direction
      ),
      React.createElement(
        'div',
        { className: 'col-my-3 text-center' },
        '价 | 量'
      ),
      React.createElement(
        'div',
        { className: 'col-my-2 text-center' },
        '成交时间'
      )
    );
  }
});

var DealContentsFutures = React.createClass({
  displayName: 'DealContentsFutures',

  render: function () {
    var creatContents = function (content) {
      var direction = null,
          contract = null;
      var marketInfo = pbUtils.parseJSON(pbE.WT().wtGetHQInfo(content['63'], content['54'])), //交易信息转换行情信息
          decimal = pbE.HQ().hqGetPriceDecimal(marketInfo.HQCode, marketInfo.HQMarket),
          price = pbUtils.decimalDecPrice(decimal, content['114']);
      var num = pbUtils.floatToFixed(content['113'],0);
      //开平仓标志117,1平仓，0开仓
      //买卖类别112,1卖出c4，0买入c3
      if (content['112'] == 0 && content['117'] == 0) {
        direction = React.createElement(
            'p',
            { className: 'b3 lh55' },
            '买开'
        );
      } else if (content['112'] == 1 && content['117'] == 1) {
        direction = React.createElement(
            'p',
            { className: 'b4 lh55' },
            '卖平'
        );
      } else if (content['112'] == 0 && content['117'] == 1) {
        direction = React.createElement(
            'p',
            { className: 'b3 lh55' },
            '买平'
        );
      } else if (content['112'] == 1 && content['117'] == 0) {
        direction = React.createElement(
            'p',
            { className: 'b4 lh55' },
            '卖开'
        );
      } else if (content['112'] == 0 && content['117'] == 2) {
        direction = React.createElement(
            'p',
            { className: 'b3 lh55' },
            '买平今'
        );
      } else if (content['112'] == 1 && content['117'] == 2) {
        direction = React.createElement(
            'p',
            { className: 'b4 lh55' },
            '卖平今'
        );
      }
      var marketInfo = JSON.parse(pbE.WT().wtGetHQInfo(content['63'], content['54']));
      contract = JSON.parse(pbE.HQ().getHQInfo(marketInfo.HQCode, marketInfo.HQMarket)).name;
      if (!contract) {
        if (content['64']) {
          contract = content['64'];
        } else {
          contract = content['63'];
        }
      }
    
      return React.createElement(
          'div',
          { className: 'row content' },
          React.createElement(
              'div',
              { className: 'col-my-11 text-left' },
              React.createElement(
                  'p',
                  { className: 'a1 name-row' },
                  React.createElement(
                      'span',
                      { className: 'display-table-cell' },
                      contract
                  )
              )
          ),
          React.createElement(
              'div',
              { className: 'col-my-13 text-left' },
              direction
          ),
        
          React.createElement(
            'div',
            { className: 'col-my-3 text-center' },
            React.createElement(
              'p',
              { className: 'c1 lh28' },
              price
            ),
            React.createElement(
              'p',
              { className: 'c1 lh27' },
              num
            )
          ),
          React.createElement(
              'div',
              { className: 'col-my-2 text-center' },
              React.createElement(
                  'p',
                  { className: 'b1 lh55' },
                  content['116']
              )
          )
      );
    };
    return React.createElement(
        'div',
        null,
        this.props.contents.map(creatContents)
    );
  }
});

var EntrustTitleFutures = React.createClass({
  displayName: 'EntrustTitleFutures',

  render: function () {
    return React.createElement(
      'div',
      { className: 'row four-title' },
      React.createElement(
        'div',
        { className: 'col-my-2 text-left' },
          dealName
      ),
      React.createElement(
        'div',
        { className: 'col-my-13 text-left' },
          direction
      ),
      React.createElement(
        'div',
        { className: 'col-my-11 text-center' },
          pn
      ),
      React.createElement(
        'div',
        { className: 'col-my-3 status text-center' },
        React.createElement(
          'span',
          null,
            anarchy
        ),
        React.createElement('span', { id: 'order' })
      )
    );
  }
});

var WithdrawalsFutures = React.createClass({
  displayName: 'WithdrawalsFutures',

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
    if (this.props.content['112'] == 0 && this.props.content['117'] == 0) {
      direction = buyOpen;
    } else if (this.props.content['112'] == 1 && this.props.content['117'] == 0) {
      direction = sellOff;
    } else if (this.props.content['112'] == 0 && this.props.content['117'] == 1) {
      direction = buyFla;
    } else if (this.props.content['112'] == 1 && this.props.content['117'] == 1) {
      direction = sellFlat;
    } else if (this.props.content['112'] == 0 && this.props.content['117'] == 2) {
      direction = buyFlaDay;
    } else if (this.props.content['112'] == 1 && this.props.content['117'] == 2) {
      direction = sellFlatDay;
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
                dealName+'：'
            ),
            React.createElement(
              'span',
              null,
              this.props.content['contract']
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
                entrustTime+'：'
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
                operate+'：'
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
                entrustpri+'：'
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
                entrustNum+'：'
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

var EntrustContentsFutures = React.createClass({
  displayName: 'EntrustContentsFutures',

  fold: function (index) {
    $('#hideB' + index).toggleClass('hide');
    if ($('#arrow' + index).attr('src') == '../../images/arrow-up.png') $('#arrow' + index).attr('src', '../../images/arrow-down.png');else if ($('#arrow' + index).attr('src') == '../../images/arrow-down.png') $('#arrow' + index).attr('src', '../../images/arrow-up.png');
  },
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
        '63': '',
        '113':'',
        '163':''
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
    var creatContents = function (content,index) {
      var direction = null;
      var status = null;
      var contract = null,
          price = null,
          notes = null;
      var buyNum = null,
          sellNum = null,
          num = null,
          information = content['163'];  //备注信息
      var marketInfo = pbUtils.parseJSON(pbE.WT().wtGetHQInfo(content['63'], content['54'])), //交易信息转换行情信息
          decimal = pbE.HQ().hqGetPriceDecimal(marketInfo.HQCode, marketInfo.HQMarket);
          //price = pbUtils.decimalDecPrice(decimal, content['114']);
      if (content['117'] == '4') {
        direction = React.createElement(
          'p',
          { className: 'b1 lh55' },
            '强平'
        );
      } else if (content['117'] == '6') {
        direction = React.createElement(
          'p',
          { className: 'b1 lh55' },
            '转今'
        );
      } else if (content['112'] == 0 && content['117'] == 0) {
        direction = React.createElement(
            'p',
            { className: 'b3 lh55' },
            buyOpen
        );
      } else if (content['112'] == 1 && content['117'] == 0) {
        direction = React.createElement(
            'p',
            { className: 'b4 lh55' },
            sellOff
        );
      } else if (content['112'] == 0 && content['117'] == 1) {
        direction = React.createElement(
            'p',
            { className: 'b3 lh55' },
            buyFla
        );
      } else if (content['112'] == 1 && content['117'] == 1) {
        direction = React.createElement(
            'p',
            { className: 'b4 lh55' },
            sellFlat
        );
      } else if (content['112'] == 0 && content['117'] == 2) {
        direction = React.createElement(
            'p',
            { className: 'b3 lh55' },
            buyFlaDay
        );
      } else if (content['112'] == 1 && content['117'] == 2) {
        direction = React.createElement(
            'p',
            { className: 'b4 lh55' },
            sellFlatDay
        );
      }

      if (content['156'] == 3) {
        status = React.createElement(
            'p',
            { className: 'b3 lh55' },
            hasBecome
        );
      } else if (content['156'] == 4) {
        status = React.createElement(
            'p',
            { className: 'b4 lh55' },
            revoke
        );
      } else if (content['156'] == 1) {
        if (!this.props.history) {
          status = React.createElement(
              'div',
              null,
              React.createElement(
                  'p',
                  { className: 'b1 lh28' },
                  hasDeclare
              ),
              React.createElement(
                  'p',
                  { className: 'lh27'},
                  React.createElement('input', { className: 'btn btn-my-xs bgc-fe0000', type: 'button', value: '撤单', onClick: this.confirmCancel.bind(null, content) })
              )
          );
        } else {
          status = React.createElement(
              'p',
              { className: 'b1 lh55' },
              hasDeclare
          );
        }
      }else if (content['156'] == 6) {
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
            withdrawal
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
      }else if (content['156'] == 'e') {
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
      var marketInfo = JSON.parse(pbE.WT().wtGetHQInfo(content['63'], content['54']));
      contract = JSON.parse(pbE.HQ().getHQInfo(marketInfo.HQCode, marketInfo.HQMarket)).name;
      if (!contract) {
        if (content['64']) {
          contract = content['64'];
        } else {
          contract = content['63'];
        }
      }
      content['contract'] = contract;
      if (content['40'] == '2' && content['41'] == '1' && content['42'] == '3') { //期货限价FOK
        price = pbUtils.decimalDecPrice(decimal, content['129']) + 'FOK';
      } else if (content['40'] == '2' && content['41'] == '1' && content['42'] == '1') {
        price = pbUtils.decimalDecPrice(decimal, content['129']) + 'FAK';
      } else if (content['40'] != undefined && content['40'] != '2') {
        price = "市价";
      } else {
        //price = pbUtils.floatToFixed(content['129'], 2);
        price = pbUtils.decimalDecPrice(decimal, content['129']);
      }
      content['price'] = price;
      buyNum = pbUtils.floatToFixed(content['113'], 0);
      sellNum = pbUtils.floatToFixed(content['130'], 0);
      if (buyNum < sellNum) {
        num = React.createElement(
            'span',
            { className: 'b3' },
            buyNum
        );
      } else {
        num = React.createElement(
            'span',
            { className: 'b1' },
            buyNum
        );
      }
      if(content['163']){
        information = content['163'].replace(/(^\s*)|(\s*$)/g, "");
        notes = React.createElement(
            'div',
            { className: 'hide', id:'hideB'+index},
            React.createElement(
                'div',
                {className:'rowcol-xs-12 deal2'},
                note+'：',
                content['163']
            )
        )
      }
      
      return React.createElement(
          'div',
          { className: 'folder-row' },
          React.createElement(
              'div',
              { className: 'row content' ,onClick:this.fold.bind(null, index)},
              React.createElement(
                  'div',
                  { className: 'col-my-2 text-left' },
                  React.createElement(
                      'p',
                      { className: 'a1 name-row' },
                      React.createElement(
                          'span',
                          { className: 'display-table-cell' },
                          contract
                      )
                  )
              ),
              React.createElement(
                  'div',
                  { className: 'col-my-13 text-left' },
                  direction
              ),
              React.createElement(
                  'div',
                  { className: 'col-my-11 text-center' },
                  React.createElement(
                      'p',
                      { className: 'b1 lh28' },
                      price
                  ),
                  React.createElement(
                      'p',
                      { className: 'b1 lh27' },
                      num,
                      ' / ',
                      sellNum
                  )
              ),
              React.createElement(
                  'div',
                  { className: 'col-my-3 text-right' },
                  React.createElement('img', { src: '../../images/arrow-down.png', className: 'pd24t pull-right', alt: '更多',id: 'arrow' + index }),
                  status
              )
          ),
          /*content['163'] != ''&&content['163']&&information.length > 0?notes:''*/
          React.createElement(
              'div',
              { className: 'hide', id:'hideB'+index},
            React.createElement(
                  'div',
                  {className:'rowcol-xs-12 deal2'},
                  entrustTime+'：',
                  content['159']
              ),
            React.createElement(
                  'div',
                  {className:'rowcol-xs-12 deal2'},
                  note+'：',
                  content['163']
              )
          )
      )

    };
    return React.createElement(
        'div',
        null,
        this.props.contents.map(creatContents, this),
        React.createElement(WithdrawalsFutures, { content: this.state.content, cancelOrder: this.cancelOrder })
    );
  }
});

var RecContentsFutures = React.createClass({
  displayName: 'RecContentsFutures',

  render: function () {
    var creatContents = function (content) {

      var code = pbUtils.getCurrency(content['56']);
      var unit = pbUtils.getUnit(content['56']);
      var money = null,
          information = content['226'];
      var notes = React.createElement(
          'div',
          {className:'row'},
          React.createElement(
              'div',
              {className:'col-xs-12'},
              React.createElement('span',{style:{marginRight:'13px;'}},'备'),
              React.createElement('span',null,'注：'),
              React.createElement(
                  'span',
                  {style:{marginLeft:'10',lineHeight:'20px'}},
                  content['226']
              )
          )
      );
      var sty = null;
      if(content['226']){
        information = information.replace(/(^\s*)|(\s*$)/g, "");
        sty = {height:'auto'};
      }else{
        sty
      }
      if (!content['224'] && content['220']) {
        money = React.createElement(
            'p',
            null,
            code + '：' ,
            React.createElement('span',{className:'right'},content['220'] + unit)
        );
      } else if (content['224']) {
        money = React.createElement(
            'p',
            null,
            code + '：',
            React.createElement('span',{className:'right'},content['224'] + unit)
        );
      }
      return React.createElement(
          'li',
          { className: 'transfer-item',style:sty},
          React.createElement(
              'div',
              { className: 'row' },
              React.createElement(
                  'div',
                  { className: 'col-xs-6' },
                  money
              ),
              React.createElement(
                  'div',
                  { className: 'col-xs-6' },
                  React.createElement(
                      'p',
                      null,
                      React.createElement('span',{style:{marginRight:'13px;'}},'状'),
                      React.createElement('span',null,'态：'),
                      React.createElement('span',{className:'right'},content['211'])
                  )
              )
          ),
          React.createElement(
              'div',
              { className: 'row' },
              React.createElement(
                  'div',
                  { className: 'col-xs-6' },
                  React.createElement(
                      'p',
                      null,
                      React.createElement('span',{style:{marginRight:'13px;'}},'时'),
                      React.createElement('span',null,'间：'),
                      React.createElement('span',{className:'right'},content['228'])
                  )
              ),
              React.createElement(
                  'div',
                  { className: 'col-xs-6' },
                  React.createElement(
                      'p',
                      null,
                      '流水号：',
                      React.createElement('span',{className:'right'},content['200'])
                  )
              )
          ),
          React.createElement(
              'div',
              { className: 'row' },
              React.createElement(
                  'div',
                  { className: 'col-xs-6' },
                  React.createElement(
                      'p',
                      null,
                      React.createElement('span',{style:{marginRight:'13px;'}},'类'),
                      React.createElement('span',null,'型：'),
                      React.createElement('span',{className:'right'},content['207'])
                  )
              ),
              React.createElement(
                  'div',
                  { className: 'col-xs-6' },
                  React.createElement(
                      'p',
                      null,
                      React.createElement('span',{style:{marginRight:'13px;'}},'银'),
                      React.createElement('span',null,'行：'),
                      React.createElement('span',{className:'right'},content['216'])
                  )
              )
          ),
          content['226']&&content['226'] != ''&&information.length > 0?notes:''
      );
    };
    return React.createElement(
        'ul',
        { className: 'nav nav-pills nav-stacked d1' },
        this.props.contents.map(creatContents)
    );
  }
});