var isApp = typeof pbE != 'undefined';
if (typeof pbE == 'undefined') {
    window.pbE = {
        WT: function () {
            var obj = {
                wtGetCurrentConnectionCID: function () {
                },
                wtGeneralRequest: function () {
                },
                wtQueryStock: function () {
                    var data = {
                        functionNO: 6014,
                        moduleId: 90002,
                        jData: {
                            '1': 1,
                            'data': [
                                {'64': '上海', '63': 'HZ', '54': 'CU1788', '513': '沪铜1789', '137': '123'},
                                {'64': 'vvv', '63': 'vvv', '54': 'CU1788', '513': '沪铜1789', '137': '123'},
                                {'64': 'dsds', '63': 'dsdsds', '54': 'CU1788', '513': '沪铜1789', '137': '123'},
                                {'64': '1111', '63': '1111', '54': 'CU1788', '513': '沪铜1789', '137': '123'}
                            ]
                        }
                    };
                    callback(JSON.stringify(data));
                },
                wtGetHQInfo: function () {
                    return JSON.stringify("Felix");
                },
                wtIsGoldFutureOrSpot: function () {
                    return 0;
                }
            };
            return obj;
        },
        SYS: function () {
            var obj1 = {
                startLoading: function () {
                },
                stopLoading: function () {
                },
                getPrivateData: function (a) {/*return position;*/
                },
                storePrivateData: function (a, b) {/*position = b;*/
                }
            };
            return obj1;
        }
    }
}
//var position;

function dealStock(data) {

        if (data.length == 0) {
            $('#alert').removeClass('hide');
        } else if (data.length > 0) {
            var yanqi = [], xianhuo = [];
            for (var i = 0, j = data.length; i < j; i++) {
                var market = data[i]['54'], code = data[i]['63'];
                var marketInfo = pbUtils.parseJSON(pbE.WT().wtGetHQInfo(code, market));  //交易信息转换行情信息
                var flag = pbE.WT().wtIsGoldFutureOrSpot(marketInfo.HQCode, marketInfo.HQMarket); //0:延期，1:现货
                if (flag == 0) {
                    if (xianhuo.indexOf(code) < 0) {
                      xianhuo.push(code);
                      yanqi.push(data[i]);
                    }
                }/* else if (flag == 1) {
                    xianhuo.push(data[i]);
                }*/
            }
            if (yanqi.length == 0) {
              $('#alert').removeClass('hide');
              pbE.SYS().storePrivateData("position", '');
              return;
            }
            var position = pbE.SYS().getPrivateData('position'),
                positionArr,
                par = pbUtils.GetQueryString("par");
            /*position = pbE.SYS().getPrivateData('position');
             var positionArr,
             par = pbUtils.GetQueryString("par");*/
            if (position) {
                positionArr = position.split(',');  //[code, market, 合约名称, 买入均价]
            }
            /*if (par == 2) {  //中立仓（当前黄金市场所有延期合约）
                var cid = pbE.WT().wtGetCurrentConnectionCID();
                var allData = JSON.parse(pbE.WT().wtGeneralRequestRe(cid, 6018)).data;
                var allYan = [],allXian = [];

                for (var i = 0, j = allData.length; i < j; i++) {
                    var market = allData[i]['54'], code = allData[i]['63'];
                    var marketInfo = pbUtils.parseJSON(pbE.WT().wtGetHQInfo(code, market));  //交易信息转换行情信息
                    var flag = pbE.WT().wtIsGoldFutureOrSpot(marketInfo.HQCode, marketInfo.HQMarket); //0:延期，1:现货
                    if (flag == 0) {
                        allYan.push(allData[i]);
                    } else if (flag == 1) {
                        allXian.push(data[i]);
                    }
                }
                console.log(allYan);
                if (allYan.length == 0) {
                    $('#alert').removeClass('hide');
                    pbE.SYS().storePrivateData("position", '');
                    return;
                }
                if (position) {
                    for (var i = 0; i < allYan.length; i++) {
                        if (allYan[i]['63'] == positionArr[0] && allYan[i]['136'] == positionArr[3]) {
                            $('.clearfix').append('<div class="row status-row" code=' + allYan[i]['63'] + ' market=' + allYan[i]['54'] + ' avg=' + allYan[i]['136'] + '>' + allYan[i]['63'] + '<span class="pull-right">&radic;</span></div>');
                        } else {
                            $('.clearfix').append('<div class="row status-row" code=' + allYan[i]['63'] + ' market=' + allYan[i]['54'] + ' avg=' + allYan[i]['136'] + '>' + allYan[i]['63'] + '<span class="pull-right hide">&radic;</span></div>');
                        }
                    }
                } else {
                    for (var i = 0; i < allYan.length; i++) {
                        $('.clearfix').append('<div class="row status-row" code=' + allYan[i]['63'] + ' market=' + allYan[i]['54'] + ' avg=' + allYan[i]['136'] + '>' + allYan[i]['63'] + '<span class="pull-right hide">&radic;</span></div>');
                    }
                }
            } else if (par == 1) {  //交割申报（持仓延期）*/
                /*if (yanqi.length == 0) {
                    $('#alert').removeClass('hide');
                    pbE.SYS().storePrivateData("position", '');
                    return;
                }*/
                if (position) {
                    for (var i = 0; i < yanqi.length; i++) {
                        if (yanqi[i]['63'] == positionArr[0] && String(yanqi[i]['136']) == positionArr[3]) {
                            $('.clearfix').append('<div class="row status-row" code=' + yanqi[i]['63'] + ' market=' + yanqi[i]['54'] + ' avg=' + String(yanqi[i]['136']) + '>' + yanqi[i]['63'] + '<span class="pull-right">&radic;</span></div>');
                        } else {
                            $('.clearfix').append('<div class="row status-row" code=' + yanqi[i]['63'] + ' market=' + yanqi[i]['54'] + ' avg=' + String(yanqi[i]['136']) + '>' + yanqi[i]['63'] + '<span class="pull-right hide">&radic;</span></div>');
                        }
                    }
                } else {
                    for (var i = 0; i < yanqi.length; i++) {
                        $('.clearfix').append('<div class="row status-row" code=' + yanqi[i]['63'] + ' market=' + yanqi[i]['54'] + ' avg=' + String(yanqi[i]['136']) + '>' + yanqi[i]['63'] + '<span class="pull-right hide">&radic;</span></div>');
                    }
                }
            //}
            $('.status-row').click(function () {
                var s = $(this).text();
                s = s.substring(0, s.length - 1);
                pbE.SYS().storePrivateData("position", $(this).attr("code") + ',' + $(this).attr("market") + ',' + s + ',' + $(this).attr("avg"));
                console.log("listposition");
                console.log(pbE.SYS().getPrivateData("position"));
                if ($("span", this).hasClass("hide")) {
                    $('.status-row span').addClass('hide');
                    $("span", this).removeClass("hide");
                }
            })
        }
}

$(function () {
    $('#alert').addClass('hide');

    if (!isApp) {
        $('#goBack').click(function () {
            location.href = document.referrer;
        })
    }
    /* else{
     $('#goBack').click(function () {
     location.href = 'goBack';
     })
     }*/

    var option = {
        callbacks: [{
            fun: 6014, module: 90002, callback: function (msg) {
                    pbE.SYS().stopLoading();
                    if (msg.jData['1'] < 0) {  //错误信息
                        alert(msg.jData['2']);
                        return;
                    }
                    else {
                        dealStock(msg.jData.data);
                    }

            }
        }],

        reload: function () {
        },

        refresh: function () {
            var CID = pbE.WT().wtGetCurrentConnectionCID();
            pbE.SYS().startLoading();
            pbE.WT().wtQueryStock(CID, JSON.stringify({}));
        },

        doShow: function (flag) {
            if (!flag) {
                pbE.SYS().stopLoading();
            }
        },

        fresh: function () {
        }
    };

    pbPage.initPage(option);

    /*$('.status-row').click(function() {
     var s = $(this).text();
     s = s.substring(0, s.length - 1);
     pbE.SYS().storePrivateData("position", $(this).attr("code") + ',' + $(this).attr("market") + ',' + s);
     console.log("listposition");
     console.log(pbE.SYS().getPrivateData("position"));
     if ($("span", this).hasClass("hide")) {
     $('.status-row span').addClass('hide');
     $("span", this).removeClass("hide");
     }
     })*/
    var CID = pbE.WT().wtGetCurrentConnectionCID();
    pbE.SYS().startLoading();

    var par = pbUtils.GetQueryString("par");

    if(par == 1)//中立仓
    {
        var allData = JSON.parse(pbE.WT().wtGeneralRequestRe(CID, 6018)).data;
        dealStock(allData);

    }
    else//交割申报
    {
        pbE.WT().wtQueryStock(CID, JSON.stringify({}));
    }
});