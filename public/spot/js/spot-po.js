var isApp = typeof pbE != 'undefined';
if (!isApp) {
    window.pbE = {
        WT: function () {
            var obj = {
                wtGetCurrentConnectionCID: function () {
                },
                wtGetHQInfo: function () {
                },
                wtQueryMoney: function () {
                    var data = {
                        moduleId: 90002,
                        functionNO: 6012,
                        jData: {
                            data: [
                                {
                                    '56': '0',
                                    '97': '88888888',
                                    '111': '88888888',
                                    '152': '88888888',
                                    '345': '88.88%',
                                    '96': '88888888'
                                }
                            ]
                        }
                    };
                    callback(JSON.stringify(data));
                },

                wtQueryStock: function () {
                    var data = {
                        moduleId: 90002,
                        functionNO: 6013,
                        jData: {
                            data: [
                                {
                                    'profit': '88',
                                    'avg': '888',
                                    'fd': '-988',
                                    '133': '8888',
                                    '64': '88888888',
                                    '112': '1',
                                    '66': '88.88%',
                                    '63': '88888888',
                                    '116': '08:08:08',
                                    '1007': 1,
                                    '503': '2'
                                },
                                {
                                    '113': '88',
                                    '114': '888',
                                    '112': '1',
                                    '133': '8888',
                                    '64': '88888888',
                                    '116': '88888888',
                                    '66': '88.88%',
                                    '63': '88888888',
                                    '116': '17:08:08'
                                },
                                {
                                    '113': '88',
                                    '114': '888',
                                    '112': '0',
                                    '133': '8888',
                                    '64': '88888888',
                                    '116': '88888888',
                                    '66': '88.88%',
                                    '63': '88888888',
                                    '116': '13:08:08'
                                }
                            ]
                        }
                    };
                    ReactDOM.render(React.createElement(PositionContents, {contents: data.jData.data}), document.getElementById('contents'));
                },
                wtGetMSSL: function () {
                },
                wtLoginRe: function () {
                    return '{"data":[{"51":"123","74":"刘","50":"456"}]}';
                },
                wtGetLoginList: function () {
                    return '{"Accinfo":[{"AccType": "a"}]}';
                },
                wtLoginOut: function () {
                },
                wtSetCurrentAccLoginOutState: function () {
                }

            }
            return obj;
        },
        SYS: function () {
            var obj1 = {
                stopLoading: function () {
                },
                startLoading: function () {
                },
                storePrivateData: function () {
                }
            }
            return obj1;
        },
        HQ: function () {
            var obj2 = {
                hqGetPriceRate: function () {
                },
                hqGetLastBasePrice: function () {
                },
                hqSubscribe: function () {
                },
                hqUnSubscribe: function () {
                },
                hqGetGroupFlag: function () {
                },
                hqGetNowPrice: function () {
                },
                hqGetPriceDecimal: function () {
                }
            }
            return obj2;
        }
    }
    $('#total-PL').removeClass();
    $('#total-PL').addClass('c3');
    $('#total-PL').html('+' + 888888 + '元');
}

function queryMoneyPart(msg) {
    var asset = msg.jData.data[0];
    if (asset['97']) {
        $('#total').html(pbUtils.comma(asset['97'], 2) + '元');
    }
    if (asset['152']) {
        $('#taken').html(pbUtils.comma(asset['152'], 2) + '元');
    }
    if (asset['111']) {
        $('#available').html(pbUtils.comma(asset['111'], 2) + '元');
    }
    if (asset['102']) {
        pcFl = asset['102'];
    } else {
        pcFl = 0;
    }
}

function tradePart(cid) {
    pbE.SYS().stopLoading();
    var CONTENTS1 = pbE.WT().wtQueryStockRe(cid);
    if (CONTENTS1) {
        position = JSON.parse(CONTENTS1).data;
        if (position.length > 0) {
            $('#alert').addClass('hide');
            var marketData = [],
                unique = [],
                marketInfo = [];
            symbolData = {};
            for (var i = 0; i < position.length; i++) {
                var price,
                    base,
                    profit,
                    average = position[i]['136'];
                position[i]['flag'] = 0;
                var market = position[i]['54'],
                    code = position[i]['63'];
                var symbol = 0; //持仓信息(1：合约代码，2：成本价，3：当前数量，4：放大倍数，5：每手数量，6：买卖方向)
                marketInfo = pbUtils.parseJSON(pbE.WT().wtGetHQInfo(code, market)); //交易信息转换行情信息
                if (code.indexOf('&') >= 0) symbol = 1;

                if (!marketInfo.HQCode || !marketInfo.HQMarket || isNaN(average) || symbol) {
                    position[i]['flag'] = 1;
                }
                var rate = pbE.HQ().hqGetPriceRate(marketInfo.HQCode, marketInfo.HQMarket),
                    //获取行情商品价格倍数
                    handNum = pbE.WT().wtGetMSSL(code, market); //获取交易每手数量
                position[i]['rate'] = rate;
                position[i]['handNum'] = handNum;
                //去重数组不包含当前合约代码
                if (unique.indexOf(marketInfo.HQCode) < 0) {
                    //存入去重数组
                    unique.push(marketInfo.HQCode);
                    //存入市场合约代码集合
                    marketData.push({
                        '2': marketInfo.HQMarket,
                        '3': marketInfo.HQCode
                    });
                }
                position[i]['market'] = marketInfo.HQMarket;
                position[i]['code'] = marketInfo.HQCode;
                position[i]['groupflag'] = pbE.HQ().hqGetGroupFlag(marketInfo.HQCode, marketInfo.HQMarket);
                position[i]['decimal'] = pbE.HQ().hqGetPriceDecimal(marketInfo.HQCode, marketInfo.HQMarket);
                if (!position[i]['flag']) {
                    price = pbE.HQ().hqGetNowPrice(marketInfo.HQCode, marketInfo.HQMarket);
                    base = pbE.HQ().hqGetLastBasePrice(marketInfo.HQCode, marketInfo.HQMarket);
                    //计算每条合约的盈亏
                    if (price && !isNaN(price)) {
                        profit = ((price - average - 0).toFixed(4) - 0) * position[i]['135'] * handNum;
                        if (position[i]['112'] == '1') {
                            profit = 0 - profit;
                        }
                        position[i]['profit'] = (profit - 0).toFixed(2);
                        position[i]['price'] = pbUtils.decimalDecPrice(position[i]['decimal'], price);
                    } else if (base && !isNaN(base)) {
                        //接口没有拿到现价，有基准价就用基准价计算盈亏，现价显示'--'
                        profit = ((base - average - 0).toFixed(4) - 0) * position[i]['135'] * handNum;
                        if (position[i]['112'] == '1') {
                            profit = 0 - profit;
                        }
                        position[i]['profit'] = (profit - 0).toFixed(2);
                        position[i]['price'] = pbUtils.decimalDecPrice(position[i]['decimal'], base);//'--';
                    } else {
                        position[i]['profit'] = '--';
                        position[i]['price'] = '--';
                    }
                } else if (position[i]['flag']) {
                    position[i]['profit'] = '--';
                    position[i]['price'] = '--';
                }
                position[i]['avg'] = pbUtils.decimalDec(position[i]['decimal'], average); //保留到价格精度加上一位后的买入均价
            }
            $('#contents').empty();
            position.sort(
                firstBy(function (v) {
                    return v[63].toUpperCase();
                })
                    .thenBy("112")
            );
            ReactDOM.render(React.createElement(PositionContents, {contents: position}), document.getElementById('contents'));
            symbolData['1'] = marketData;
            /*symbolData['5'] = column;*/
            //symbolData['7'] = '1';
            pbE.HQ().hqSubscribe(0, JSON.stringify(symbolData));
        } else if (position.length <= 0) {
            pbE.SYS().stopLoading();
            $('#alert').removeClass('hide');
            //totalPL = 0;
            $('#contents').empty();
            $('#float').removeClass();
            $('#float').addClass('a1 bolder');
            $('#float').html('0' + '元');
        }
    }
}

function hqPart(msg) {
    var data = msg.jData.Data;
    for (var i = 0, l = position.length; i < l; i++) {
        var lastPrice,
            pl,
            base,
            average = position[i]['136'];
        if (!position[i]['flag']) {
            for (var j = 0, ll = data.length; j < ll; j++) {
                if (position[i]['code'] == data[j]['10']) {
                    base = pbE.HQ().hqGetLastBasePrice(position[i]['code'], position[i]['market']);
                    if (data[j]['29'] && !isNaN(data[j]['29'])) {
                        lastPrice = (data[j]['29'] - 0) / position[i]['rate']; //获取现价/最新价
                        pl = ((lastPrice - average - 0).toFixed(4) - 0) * position[i]['135']*position[i]['handNum'];
                        if (position[i]['112'] == '1') {
                            pl = 0 - pl;
                        }
                        //浮动盈亏
                        position[i]['price'] = pbUtils.decimalDecPrice(position[i]['decimal'], lastPrice);
                        position[i]['dayPl'] = pl;
                        position[i]['profit'] = (pl - 0).toFixed(2);
                    } else if (base && !isNaN(base)) {
                        pl = ((base - average - 0).toFixed(4) - 0) * position[i]['135']*position[i]['handNum'];
                        if (position[i]['112'] == '1') {
                            pl = 0 - pl;
                        }
                        position[i]['price'] = pbUtils.decimalDecPrice(position[i]['decimal'], base);//'--';
                        position[i]['dayPl'] = pl;
                        position[i]['profit'] = (pl - 0).toFixed(2);
                    } else {
                        position[i]['dayPl'] = 0;
                        position[i]['profit'] = '--';
                        position[i]['price'] = '--';
                    }
                    hqFresh(position[i]);
                    break;
                }
            }
        } else if (position[i]['flag']) {
            position[i]['profit'] = '--';
            position[i]['price'] = '--';
            position[i]['dayPl'] = 0;
        }
        //position[i]['136'] = pbUtils.decimalDec(position[i]['decimal'], position[i]['136'] + '');
    }
    //ReactDOM.render(<PositionContents contents={position} />, document.getElementById('contents'));
    var complete = true,
        totalPL = 0;
    for (var i = 0, l = position.length; i < l; i++) {
        if (typeof position[i]['dayPl'] == 'undefined' || isNaN(position[i]['dayPl'])) {
            if (position[i]['flag']) {
                continue;
            }
        } else {
            totalPL = totalPL + (position[i]['dayPl'] - 0);
        }
    }

    if (complete) {
        p++;
        if (p == 1) pbE.SYS().stopLoading();
        var total = totalPL + (pcFl - 0);
        if (totalPL > 0) {
            $('#float').removeClass();
            $('#float').addClass('a3');
            $('#float').html('+' + pbUtils.comma(total, 2) + '元');
        } else if (totalPL < 0) {
            $('#float').removeClass();
            $('#float').addClass('a4');
            $('#float').html(pbUtils.comma(total, 2) + '元');
        } else {
            $('#float').removeClass();
            $('#float').addClass('a1 bolder');
            $('#float').html('0' + '元');
        }
    }
}

function hqFresh(position) {
    //行情推送时只刷新最新价和持仓，不重画整个页面的持仓显示
    var id = '#' + position['63'] + '_' + position['112']+'_'+position['742'];
    if (isNaN(position['profit'])) {
        $(id + ' .imageBar').empty();
        $(id + ' .profit').removeClass('a3').removeClass('a4').addClass('a1');
        $(id + ' .profit').html(position['profit']);
    } else {
        if (position['profit'] > 0) {
            $(id + ' .imageBar').empty();
            $(id + ' .imageBar').append('<img src=' + '../../images/redBar.png' + '>');
            $(id + ' .profit').removeClass('a1').removeClass('a4').addClass('a3');
            $(id + ' .profit').html('+' + position['profit']);
        } else if (position['profit'] < 0) {
            $(id + ' .imageBar').empty();
            $(id + ' .imageBar').append('<img src=' + '../../images/greenBar.png' + '>');
            $(id + ' .profit').removeClass('a1').removeClass('a3').addClass('a4');
            $(id + ' .profit').html(position['profit']);
        } else if (position['profit'] == 0) {
            $(id + ' .imageBar').empty();
            $(id + ' .profit').removeClass('a3').removeClass('a4').addClass('a1');
            $(id + ' .profit').html(position['profit']);
        }
    }
    $(id + " .price").html(position['price']);
}

var position = [],
    p = 0,
    symbolData = {},
    CID = pbE.WT().wtGetCurrentConnectionCID(),
    pcFl = 0;

$(function () {
    $('#alert').addClass('hide');
    var option = {
        callbacks: [{
            fun: 6012, module: 90002, callback: function (msg) {
                if (msg.reservId == CID) {
                    queryMoneyPart(msg);
                }
            }
        },
            {
                fun: 56004, module: 90002, callback: function (msg) {
                if (msg.reservId == CID && msg.jData['223'] == "5") {
                    //pbPage.fresh();
                  console.log("56004")
                    tradePart(CID)
                }
            }
            },
            {
                fun: 6014, module: 90002, callback: function (msg) {
                if (msg.reservId == CID) {
                    tradePart(CID);
                }
            }
            }, {
                module: 90000, callback: function (msg) {
                    hqPart(msg);
                }
            }],

        reload: function () {
            CID = pbE.WT().wtGetCurrentConnectionCID();
            p = 0, position = [];
            pbE.SYS().startLoading();
            pbE.WT().wtQueryMoney(CID, JSON.stringify({}));
            pbE.WT().wtSynFlash(CID);
        },

        refresh: function () {
            //点击按钮主动刷新，把refreshFlag置为0
            p = 0;
            pbE.SYS().startLoading();
            pbE.WT().wtQueryMoney(CID, JSON.stringify({}));
            pbE.WT().wtSynFlash(CID);
        },

        doShow: function (flag) {
            if (!flag) {
                pbE.SYS().stopLoading();
                //pbE.HQ().hqUnSubscribe(0, JSON.stringify(symbolData));
            }
        },

        fresh: function () {
        }
    };

    pbPage.initPage(option);

    pbE.SYS().startLoading();
    pbE.WT().wtQueryMoney(CID, JSON.stringify({}));
    pbE.WT().wtSynFlash(CID);
});
