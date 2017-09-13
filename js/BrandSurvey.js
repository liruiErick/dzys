// 声明所需的全局变量
var typeId = '1';
// var startTime = new Date().getTime() - 3 * 30 * 24 * 60 * 60 * 1000;
// startTime = new Date(startTime).toJSON().substring(0, 10);
// var endTime = new Date().toJSON().substring(0, 10);
var startTime = '2017-04-30';
var endTime = '2017-06-30';
var rankSel = 'overall'; // 领域品牌排行选中项，默认'overall'-(综合)
var selItem = []; // 领域品牌排行选中项
// var selItem = ['Oracle', '阿里云']; // 测试选中项(`top20`和`top50`按钮以及其下`复选框`点击时都要及时刷新这个变量)
var selItemData = []; // 装载所选品牌的数据(注意这个变量-要及时重置和追加)

// 全局初始化echarts
var chart_BrandTolData = echarts.init(document.getElementById('BrandTolData'));
var chart_BrandSinData = echarts.init(document.getElementById('BrandSinData'));
var chart_BrandSinData1 = echarts.init(document.getElementById('BrandSinData1'));
var chart_BrandSinData2 = echarts.init(document.getElementById('BrandSinData2'));
var chart_BrandSinData3 = echarts.init(document.getElementById('BrandSinData3'));
var chart_BrandSinData4 = echarts.init(document.getElementById('BrandSinData4'));

// 品牌监测-模块化开发
var TecWarn = function () {
    this.__init()
};

// 初始化
TecWarn.prototype.__init = function () {
    var self = this;
    // 动态设置日期选择框默认时间
    var s_t = $('#startTime');
    var e_t = $('#endTime');
    s_t.val(startTime);
    e_t.val(endTime);
    s_t.blur(function () {
        if (self.chkDate(s_t.val())) {
            s_t.val(startTime)
        }
    });
    s_t.click(function () {
        var maxTime = e_t.val();
        if ((startTime.replace(/-/ig, '') * 1) > (maxTime.replace(/-/ig, '') * 1)) {
            s_t.val(maxTime)
        }
        laydate({
            elem: '#startTime',
            max: maxTime
        });
    });
    e_t.blur(function () {
        if (self.chkDate(e_t.val())) {
            e_t.val(endTime)
        }
    });
    // 配置日期组件
    laydate({
        elem: '#startTime',
        max: endTime
    });
    laydate({
        elem: '#endTime',
        max: endTime
        // max: new Date().toLocaleDateString()
    });

    // tab切换和提示弹出框
    var t_b = $(".Tipbox");
    var t_o = $("#TB_overlayBG");
    $('.ppjc_db').Tabs({
        event: 'click',
        timeout: 100
    });
    $(".showbox").click(function () {
        t_o.css({
            display: "block", height: $(document).height()
        });
        t_b.css({
            left: ($("body").width() - t_b.width()) / 2 - 20 + "px",
            top: ($(window).height() - t_b.height()) / 2 + $(window).scrollTop() + "px",
            display: "block"
        });
    });
    $(".close").click(function () {
        t_o.css("display", "none");
        t_b.css("display", "none");
    });

    // 八大类切换
    var type_name = '物联网';
    $('.tabGraphBtn li a').on('click', function () {
        type_name = $(this).text().replace(/[^\u4e00-\u9fa5]/gi, "");
        $(this).parents().addClass('current').siblings().removeClass('current');
        var new_typeId = this.rel;
        if (new_typeId !== typeId) {
            typeId = new_typeId;
            TecWarn.prototype.fetchBrandTolData(typeId, startTime, endTime, type_name);
            TecWarn.prototype.fetchBrandRankData(typeId, startTime, endTime, rankSel);
            // TecWarn.prototype.fetchBrandSinData(typeId, startTime, endTime, selItem);
        }
    });

    // 根据日期区间搜索数据
    $('.ser-btn').click(function () {
        var new_startTime = s_t.val();
        var new_endTime = e_t.val();
        if (new_startTime != startTime || new_endTime != endTime) {
            if ((new_startTime.replace(/-/ig, '') * 1) > (new_endTime.replace(/-/ig, '') * 1)) {
                $('.ser-box span.msg').animate({
                    top: '-30px',
                    opacity: 1
                }, 200)
            } else {
                startTime = new_startTime;
                endTime = new_endTime;
                TecWarn.prototype.fetchBrandTolData(typeId, startTime, endTime, type_name);
                TecWarn.prototype.fetchBrandRankData(typeId, startTime, endTime, rankSel);
                // TecWarn.prototype.fetchBrandSinData(typeId, startTime, endTime, selItem);
            }
        }
    });
    $('.ser-btn').mouseleave(function () {
        $('.ser-box span.msg').animate({
            top: '-50px',
            opacity: 0
        }, 100)
    });

    // `top20`和`top50`按钮切换，分别监测复选框已选中事件
    $('.pointer').click(function () {
        // var selItem = []; // 初始化
        // console.log(this.value);
        var new_selItem = [];
        if (this.value === 20) {
            $("#top20 input:checked").each(function () {
                new_selItem.push(this.value);
            });
        } else {
            $("#top50 input:checked").each(function () {
                new_selItem.push(this.value);
            });
        }
        if (selItem.join('') !== new_selItem.join('')) {
            selItem = new_selItem;
            // console.log(selItem);
            // 再传入 selItem 开始请求数据
            // console.log("开始请求！");
            TecWarn.prototype.fetchBrandSinData(typeId, startTime, endTime, selItem)
        } else {
            // console.log("重复不再请求！")
        }
    });

    // 排行类别切换
    $('.sec').hover(function () {
        $('.sec').css('display', 'block')
    });
    $('.sec li').on('click', function () {
        var new_rankSel = $(this).attr('value');
        if (new_rankSel !== rankSel) {
            rankSel = new_rankSel;
            // console.log(rankSel);
            var str = $(this).text();
            $('.selected').html(str);
            $('.sec').css('display', 'none');
            TecWarn.prototype.fetchBrandRankData(typeId, startTime, endTime, rankSel);
        }
    });

    // 单品牌详情hover事件
    $('#selBox span').on('mouseenter', function () {
        $(this).addClass('current').siblings().removeClass('current');
        var index = $(this).attr('rel') * 1;
        var this_div = $('.five-box div.ab')[index];
        $(this_div).removeClass('hide').siblings().addClass('hide');
    });

    this.fetchBrandTolData(typeId, startTime, endTime, type_name);
    this.fetchBrandRankData(typeId, startTime, endTime, rankSel);
    // this.fetchBrandSinData(typeId, startTime, endTime, selItem);
};

/**********************数据获取************************/

/**
 * 领域品牌总览-数据获取
 * @param typeId
 * @param startTime
 * @param endTime
 * @param type_name
 */
TecWarn.prototype.fetchBrandTolData = function (typeId, startTime, endTime, type_name) {
    // console.log(typeId);
    var self = this;
    $.ajax({
        type: 'POST',
        url: 'http://172.16.155.202:8080/axis2/services/BrandMonitor/getBrandOverview',
        data: {
            "class_num": typeId,
            "time_start": startTime,
            "time_end": endTime
        },
        dataType: 'text',
        success: function (RawData) {
            self.renderBrandTolData(typeId, RawData, type_name)
        },
        error: function (msg) {
            self._fetchDataFailed(msg)
        }
    })
};

/**
 * 领域品牌排行-数据获取
 * @param typeId
 * @param startTime
 * @param endTime
 * @param rankSel
 */
TecWarn.prototype.fetchBrandRankData = function (typeId, startTime, endTime, rankSel) {
    // console.log(rankSel);
    var self = this;
    $.ajax({
        type: "GET",
        url: 'http://172.16.155.202:8080/axis2/services/BrandMonitor/getBrandRank',
        data: {
            "class_num": typeId,
            "time_start": startTime,
            "time_end": endTime,
            "brand_num": 50,
            "rank_name": rankSel
        },
        dataType: "text",
        success: function (RawData) {
            self.renderBrandRankData(typeId, RawData)
        },
        error: function (msg) {
            self._fetchDataFailed(msg)
        }
    })
};

/**
 * 单品牌详情-数据获取
 * @param typeId
 * @param startTime
 * @param endTime
 * @param selItem
 */
TecWarn.prototype.fetchBrandSinData = function (typeId, startTime, endTime, selItem) {
    var self = this;
    var selItemLen = selItem.length;
    // console.log(selItem);
    if (selItemLen === 0) {
        self._addSelItemData('', selItem, selItemLen);
    } else {
        for (var i = 0; i < selItemLen; i++) {
            $.ajax({
                type: "GET",
                url: 'http://172.16.155.202:8080/axis2/services/BrandMonitor/getBrandDetail',
                data: {
                    "class_num": typeId,
                    "time_start": startTime,
                    "time_end": endTime,
                    "brand_list": selItem[i]
                },
                dataType: "text",
                success: function (RawData) {
                    var res = jQuery.parseJSON(loadXML(RawData));
                    self._addSelItemData(res, selItem, selItemLen);
                },
                error: function (msg) {
                    self._fetchDataFailed(msg)
                }
            })
        }
    }
};

/**
 * 单品牌详情-循环请求数据拼接-优先处理
 * @param res
 * @param selItem
 * @param selItemLen
 * @private
 */
TecWarn.prototype._addSelItemData = function (res, selItem, selItemLen) {
    // console.log(res);
    if (res !== '') {
        selItemData.push(res);
        if (selItemData.length === selItemLen) {
            this.renderBrandSinData(typeId, selItem, selItemData);
            selItemData = [] // 初始化
        }
    } else {
        this.renderBrandSinData(typeId, selItem, []);
    }
};

/**********************数据渲染************************/

/**
 * 领域品牌总览-数据渲染
 * @param typeId
 * @param RawData
 * @param type_name
 */
TecWarn.prototype.renderBrandTolData = function (typeId, RawData, type_name) {
    // 数据处理
    var finData = this._resolveBrandTolData(RawData);
    // console.log(finData);
    // console.log(typeId);
    // var chart_BrandTolData = echarts.init(document.getElementById('BrandTolData'));
    if (finData) {
        var schema = [
            {name: 'x', index: 0, text: '负面敏感度'},
            {name: 'y', index: 1, text: '价值认可度'},
            {name: 'color', index: 2, text: '品牌喜好度'},
            {name: 'size', index: 3, text: '品牌关注度'},
            {name: 'name', index: 4, text: ''}
        ];
        var option_BrandTolData = {
            backgroundColor: '#404a59',
            title: {
                text: type_name + '-品牌四维值总览',
                textStyle: {
                    color: '#fff',
                    fontSize: 16
                },
                left: 'center'
            },
            color: [
                '#dd4444', '#fec42c', '#80F1BE'
            ],
            grid: {
                x: '6%',
                x2: 150,
                y: '15%',
                y2: '10%'
            },
            tooltip: {
                padding: 10,
                backgroundColor: '#222',
                borderColor: '#777',
                borderWidth: 1,
                formatter: function (obj) {
                    var value = obj.value;
                    return '<div style="color: #fff;border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                        + value[4]
                        + '</div>'
                        + schema[0].text + '：' + value[0] + '<br>'
                        + schema[1].text + '：' + value[1] + '<br>'
                        + schema[2].text + '：' + value[2] + '<br>'
                        + schema[3].text + '：' + value[3] + '<br>';
                }
            },
            xAxis: {
                type: 'value',
                name: '负面敏感度',
                nameGap: 16,
                min: finData[1],
                nameTextStyle: {
                    color: '#fff',
                    fontSize: 14
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#eee'
                    }
                }
            },
            yAxis: {
                type: 'value',
                name: '价值认可度',
                nameLocation: 'end',
                nameGap: 20,
                nameTextStyle: {
                    color: '#fff',
                    fontSize: 14
                },
                axisLine: {
                    lineStyle: {
                        color: '#eee'
                    }
                },
                splitLine: {
                    show: false
                }
            },
            visualMap: [
                {
                    left: 'right',
                    top: '1%',
                    dimension: 3,
                    min: 0,
                    max: 1,
                    itemWidth: 15,
                    itemHeight: 70,
                    calculable: true,
                    precision: 0.01,
                    text: ['圆形大小：品牌关注度'],
                    textGap: 30,
                    textStyle: {
                        color: '#fff'
                    },
                    inRange: {
                        symbolSize: [10, 70]
                    },
                    outOfRange: {
                        symbolSize: [10, 70],
                        color: ['rgba(255,255,255,.2)']
                    },
                    controller: {
                        inRange: {
                            color: ['#c23531']
                        },
                        outOfRange: {
                            color: ['#444']
                        }
                    }
                },
                {
                    left: 'right',
                    bottom: '7%',
                    dimension: 2,
                    min: 0,
                    max: 1,
                    itemWidth: 15,
                    itemHeight: 70,
                    calculable: true,
                    precision: 0.01,
                    text: ['颜色深度：品牌喜好度'],
                    textGap: 30,
                    textStyle: {
                        color: '#fff'
                    },
                    inRange: {
                        colorLightness: [1, 0.4]
                    },
                    outOfRange: {
                        color: ['rgba(255,255,255,.2)']
                    },
                    controller: {
                        inRange: {
                            color: ['#c23531']
                        },
                        outOfRange: {
                            color: ['#444']
                        }
                    }
                }
            ],
            series: [
                {
                    name: type_name + '品牌四维值总览',
                    type: 'scatter',
                    itemStyle: {
                        normal: {
                            opacity: 0.8,
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    data: finData[0]
                }
            ]
        };
        chart_BrandTolData.setOption(option_BrandTolData);
    } else {
        chart_BrandTolData.clear()
    }

    // 绑定事件-无
};

/**
 * 领域品牌排行-数据渲染
 * @param typeId
 * @param RawData
 */
TecWarn.prototype.renderBrandRankData = function (typeId, RawData) {
    // 数据处理
    var finData = this._resolveBrandRankData(RawData);
    // console.log(finData);
    $('#top20').html(finData[0]);
    $('#top50').html(finData[1]);
    // 绑定事件
    this.bindEventForBrandRank()
};

/**
 * 单品牌详情-数据渲染
 * @param typeId
 * @param selItem
 * @param selItemData
 */
TecWarn.prototype.renderBrandSinData = function (typeId, selItem, selItemData) {
    if (selItemData.join('') !== '') {
        var finData = this._resolveBrandSinData(selItem, selItemData);
        // console.log(finData);
        // var chart_BrandSinData = echarts.init(document.getElementById('BrandSinData'));
        chart_BrandSinData.clear();
        chart_BrandSinData1.clear();
        chart_BrandSinData2.clear();
        chart_BrandSinData3.clear();
        chart_BrandSinData4.clear();
        var com_option = {
            backgroundColor: '#fff',
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                top: '4%',
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: finData[0]
            },
            yAxis: {
                type: 'value'
            },
            series: []
        };
        chart_BrandSinData.setOption(com_option);
        chart_BrandSinData1.setOption(com_option);
        chart_BrandSinData2.setOption(com_option);
        chart_BrandSinData3.setOption(com_option);
        chart_BrandSinData4.setOption(com_option);
        chart_BrandSinData.setOption({
            series: finData[1]
        });
        chart_BrandSinData1.setOption({
            series: finData[2]
        });
        chart_BrandSinData2.setOption({
            series: finData[3]
        });
        chart_BrandSinData3.setOption({
            series: finData[4]
        });
        chart_BrandSinData4.setOption({
            series: finData[5]
        });
    } else {
        chart_BrandSinData.clear();
        chart_BrandSinData1.clear();
        chart_BrandSinData2.clear();
        chart_BrandSinData3.clear();
        chart_BrandSinData4.clear();
    }
};

/**********************数据处理************************/

/**
 * 领域品牌总览-数据处理
 * @param RawData
 * @returns {*}
 * @private
 */
TecWarn.prototype._resolveBrandTolData = function (RawData) {
    var data = loadXML(RawData);
    data = jQuery.parseJSON(data);
    // console.log(data);
    var len = data.length;
    if (len !== 0) {
        // 寻找x轴数据最小值
        var x_min = data[0][2] * 1;
        for (var m = 1; m < len; m++) {
            if ((data[m][2] * 1) < x_min) {
                x_min = data[m][2] * 1
            }
        }
        x_min = Math.round((x_min - 0.02) * 100) / 100; // 修正
        var _data = [];
        for (var i = 0; i < len; i++) {
            var j = new Array(5);
            j[0] = data[i][2];
            j[1] = data[i][3];
            j[2] = data[i][0];
            j[3] = data[i][1];
            j[4] = data[i][4];
            _data.push(j);
        }
        return [_data, x_min];
    } else {
        return false
    }
};

/**
 * 领域品牌排行-数据处理
 * @param RawData
 * @returns {[*,*]}
 * @private
 */
TecWarn.prototype._resolveBrandRankData = function (RawData) {
    var r = jQuery.parseJSON(loadXML(RawData));
    // console.log(r);
    var rLen = r.length;
    var html50 = '';
    var html20 = '';
    for (var j = 0; j < rLen; j++) {
        html50 += '<tr><td>' + r[j].rank_id + '</td><td>' + r[j].brand_name + '</td><td><div class="progress_container"><div class="progress_bar tip" title="' + r[j].rand_name_value + '"></div></div></td><td>' + r[j].rand_name_value + '</td><td class="checkbox_style"><input type="checkbox" name="checkboxG' + r[j].rank_id + '" id="checkboxG' + r[j].rank_id + '" ' + ((j === 0) ? ('class="css-checkbox checked" checked') : ('class="css-checkbox"')) + ' value="' + r[j].brand_name + '"><label for="checkboxG' + r[j].rank_id + '" class="css-label clr"></label></td></tr>'
    }
    for (var i = 0; i < ((rLen > 20) ? (20) : (rLen)); i++) {
        html20 += '<tr><td>' + r[i].rank_id + '</td><td>' + r[i].brand_name + '</td><td><div class="progress_container"><div class="progress_bar tip" title="' + r[i].rand_name_value + '"></div></div></td><td>' + r[i].rand_name_value + '</td><td class="checkbox_style"><input type="checkbox" name="checkboxG_' + r[i].rank_id + '" id="checkboxG_' + r[i].rank_id + '" ' + ((i === 0) ? ('class="css-checkbox checked" checked') : ('class="css-checkbox"')) + ' value="' + r[i].brand_name + '"><label for="checkboxG_' + r[i].rank_id + '" class="css-label clr"></label></td></tr>'
    }
    return [html20, html50];
};

/**
 * 单品牌详情-数据处理
 * @param selItem
 * @param selItemData
 * @private
 */
TecWarn.prototype._resolveBrandSinData = function (selItem, selItemData) {
    // console.log(selItem);
    // console.log(selItemData);
    var len = selItemData.length;
    var x_data = selItemData[0][0][1];
    var overall_ser = []; // 综合
    var pleasantness_ser = []; // 品牌喜好度
    var attention_ser = []; // 品牌关注度
    var sensitivity_ser = []; // 品牌敏感度
    var aptitude_ser = []; // 价值认可度
    for (var i = 0, i_1 = {}, i_2 = {}, i_3 = {}, i_4 = {}, i_5 = {}; i < len; i++) {
        i_1 = {
            name: selItemData[i][0][0] + '-综合',
            type: 'line',
            smooth: true,
            data: selItemData[i][0][6].overall
        };
        i_2 = {
            name: selItemData[i][0][0] + '-品牌喜好度',
            type: 'line',
            smooth: true,
            data: selItemData[i][0][2].pleasantness
        };
        i_3 = {
            name: selItemData[i][0][0] + '-品牌关注度',
            type: 'line',
            smooth: true,
            data: selItemData[i][0][3].attention
        };
        i_4 = {
            name: selItemData[i][0][0] + '-品牌敏感度',
            type: 'line',
            smooth: true,
            data: selItemData[i][0][4].sensitivity
        };
        i_5 = {
            name: selItemData[i][0][0] + '-价值认可度',
            type: 'line',
            smooth: true,
            data: selItemData[i][0][5].aptitude
        };
        overall_ser.push(i_1);
        pleasantness_ser.push(i_2);
        attention_ser.push(i_3);
        sensitivity_ser.push(i_4);
        aptitude_ser.push(i_5);
    }
    return [x_data, overall_ser, pleasantness_ser, attention_ser, sensitivity_ser, aptitude_ser]
};

/**********************绑定事件************************/

/**
 * 领域品牌排行-绑定事件
 */
TecWarn.prototype.bindEventForBrandRank = function () {
    // 设置列表隔行颜色差异
    $(".ppjc_db_table").each(function xlh() {
        var tbl = this;
        var rows = tbl.rows.length;
        for (var i = 0; i < rows; i++) {
            if (i % 2 === 0) {
                tbl.rows[i].style.backgroundColor = "#f2fbff";
            }
            else
                tbl.rows[i].style.backgroundColor = "#fdfeff";
        }
    });
    // 柱状百分比显示
    processAnimate();

    $('.ppjc_db .tab_menu li').click(function () {
        Initialize();
        processAnimate();
    });
    function processAnimate() {
        $('.progress_container').each(function () {
            var percent = $(this).children('.progress_bar').attr('title');
            if (!percent) {
                percent = $(this).children('.progress_bar').attr('original-title')
            }
            $(this).children('.progress_bar').animate({width: percent * 100 + '%'}, 1000);
            $(this).children(".tip").tipsy({gravity: 's', fade: true});
        });
    }

    function Initialize() {
        $('.progress_bar').css("width", "0");
    }

    // 获取页面初次加载默认选中项的值(top20中的第一项)
    selItem = [];
    if ($("#top20 input:checked")[0]) {
        selItem.push($("#top20 input:checked")[0].value);
    }
    // console.log(selItem);
    this.fetchBrandSinData(typeId, startTime, endTime, selItem);

    // 复选框选中事件监测
    // $('.clr').off();
    $('.clr').click(function () {
        $(this).siblings('input').toggleClass('checked');
        var new_selItem = [];
        $(this).parents('tbody').find('input.checked').each(function () {
            new_selItem.push(this.value);
        });
        selItem = new_selItem;
        // console.log(selItem);
        // 执行请求
        TecWarn.prototype.fetchBrandSinData(typeId, startTime, endTime, selItem)
    });
};

/**********************其他函数************************/

/**
 * 日期格式验证
 * @param val
 * @returns {boolean}
 */
TecWarn.prototype.chkDate = function (val) {
    return !isNaN(val * 1) || new Date(val) == 'Invalid Date'
};

/**
 * ajax请求失败输出 msg
 * @param msg
 * @private
 */
TecWarn.prototype._fetchDataFailed = function (msg) {
    console.log(msg);
    // console.log(TecWarn.prototype);
};

// 运行
TecWarn.prototype.__init();





















