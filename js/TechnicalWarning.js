// 声明所需的全局变量`1-物联网`
var typeId = '1';
// 标识左侧Tab选项的选中项，1-技术基本情况分析；2-技术发展趋势分析
var tabIndex = '1';
// 标识左侧Tab选项是否都已被激活过-且请求是否都成功
var AllTabIsUsed = false;
// 标识`技术基本情况分析`下的Tab，1-重点研究机构；2-知名研究专家
var secIndex = '1';
// 标识`技术基本情况分析`中的Tab选项是否都已被激活过-且请求是否都成功
var AllSecIsUsed = false;
// 标识`近一年`-`近五年`
var currentYear = '1';

// 全局实例化echarts
var chart_TecTrend = echarts.init(document.getElementById('TecTrend'));
var chinaMap = echarts.init(document.getElementById('worldMap'));
// var chart_TecIns1Data = echarts.init(document.getElementById('TecIns1Data'));
var chart_TecIns2Data = echarts.init(document.getElementById('TecIns2Data'));
var chart_TecIns3Data = echarts.init(document.getElementById('TecIns3Data'));
var chart_TecIns4Data = echarts.init(document.getElementById('TecIns4Data'));
// var chart_TecExp1Data = echarts.init(document.getElementById('TecExp1Data'));
var chart_TecExp2Data = echarts.init(document.getElementById('TecExp2Data'));
var chart_TecExp3Data = echarts.init(document.getElementById('TecExp3Data'));
var chart_TecExp4Data = echarts.init(document.getElementById('TecExp4Data'));
chart_TecExp4Data.showLoading({text: 'Loading'});
var chart_themeData = echarts.init(document.getElementById('themeData'));
var chart_TecDevData = echarts.init(document.getElementById('TecDevData'));
var chart_TecWordData = echarts.init(document.getElementById('TecWordData'));
var chart_burstWordData = echarts.init(document.getElementById('burstWordData'));
chart_burstWordData.showLoading({text: 'Loading'});

// 技术预警页模块化开发
var TecWarn = function () {
    this.__init()
};

/**
 * 初始化
 * @private
 */
TecWarn.prototype.__init = function () {
    var self = this;
    var typeText = '物联网';

    $('.jsyjcon').Tabs({
        event: 'click',
        timeout: 100
    });
    $('.jsyjtab2').Tabs({
        event: 'click',
        timeout: 100
    });
    // 八大类切换
    $('.tabGraphBtn li a').on('click', function () {
        $(this).parents().addClass('current').siblings().removeClass('current');
        var new_typeId = this.rel;
        typeText = $(this).text().replace(/[^\u4e00-\u9fa5]/gi, "");
        if (new_typeId !== typeId) {
            typeId = new_typeId;
            // AllTabIsUsed = AllSecIsUsed = false; // 八大类切换时初始化这两个值
            if (tabIndex === '1') {
                self.fetchTecTrendData(typeId); // 技术基本情况分析-技术趋势-数据获取
                self.fetchTecAreaData(typeId); // 技术基本情况分析-地域分布-数据获取
                if (secIndex === '1') {
                    self.fetchTecIns1Data(typeId, typeText); // 技术基本情况分析-重点研究机构-1-数据获取
                } else if (secIndex === '2') {
                    self.fetchTecExp1Data(typeId, typeText); // 技术基本情况分析-知名研究专家-1-数据获取
                }
            } else if (tabIndex === '2') {
                self.fetchTimeThemeData(typeId); // 时间演化主题分析
                self.fetchTecDevData(typeId); // 技术发展评估
                self.fetchTecWordData(currentYear, typeId); // 新兴技术捕捉
            }
        }
    });
    // 技术基本情况和发展趋势切换
    $('.tab-key').on('click', function () {
        var new_tabIndex = $(this).attr('value');
        if (new_tabIndex !== tabIndex) {
            tabIndex = new_tabIndex;
            if (tabIndex === '1') {
                self.fetchTecTrendData(typeId); // 技术基本情况分析-技术趋势-数据获取
                self.fetchTecAreaData(typeId); // 技术基本情况分析-地域分布-数据获取
                if (secIndex === '1') {
                    self.fetchTecIns1Data(typeId, typeText); // 技术基本情况分析-重点研究机构-1-数据获取
                } else if (secIndex === '2') {
                    self.fetchTecExp1Data(typeId, typeText); // 技术基本情况分析-知名研究专家-1-数据获取
                }
                // AllTabIsUsed = true;
            } else if (tabIndex === '2') {
                self.fetchTimeThemeData(typeId); // 时间演化主题分析
                self.fetchTecDevData(typeId); // 技术发展评估
                self.fetchTecWordData(currentYear, typeId); // 新兴技术捕捉
                // AllTabIsUsed = true;
            }
        }
    });
    // 研究机构-专家切换
    $('.sec-key').on('click', function () {
        var new_secIndex = $(this).attr('value');
        if (new_secIndex !== secIndex) {
            secIndex = new_secIndex;
            if (secIndex === '1') {
                self.fetchTecIns1Data(typeId, typeText); // 技术基本情况分析-重点研究机构-1-数据获取
                // AllSecIsUsed = true;
            } else if (secIndex === '2') {
                self.fetchTecExp1Data(typeId, typeText); // 技术基本情况分析-知名研究专家-1-数据获取
                // AllSecIsUsed = true;
            }
        }
    });
    // 近一年-近五年切换
    $('.year-cut').on('click', function () {
        $(this).parents().addClass('current').siblings().removeClass('current');
        var new_currentYear = $(this).attr('rel');
        if (new_currentYear === '1') {
            $('#toHot').addClass('active');
            $('#toYear').removeClass('active');
        } else if (new_currentYear === '5') {
            $('#toHot').removeClass('active');
            $('#toYear').addClass('active');
        }
        if (new_currentYear !== currentYear) {
            currentYear = new_currentYear;
            self.fetchTecWordData(currentYear, typeId); // 新兴技术捕捉
        }
    });

    this.fetchTecTrendData(typeId); // 技术基本情况分析-技术趋势-数据获取
    this.fetchTecAreaData(typeId); // 技术基本情况分析-地域分布-数据获取
    this.fetchTecIns1Data(typeId, typeText); // 技术基本情况分析-重点研究机构-1-数据获取
};

/**********************数据获取************************/

/**
 * 技术基本情况分析-技术趋势-数据获取
 * @param typeId
 */
TecWarn.prototype.fetchTecTrendData = function (typeId) {
    var self = this;
    $.ajax({
        type: 'GET',
        url: 'http://172.16.155.203:8080/TechObservationWeb/GetFieldTrend',
        data: {
            "parameters": typeId
        },
        dataType: 'json',
        success: function (TecTrendData) {
            self.renderTecTrendData(TecTrendData)
        },
        error: function (msg) {
            self._fetchDataFailed(msg)
        }
    })
};

/**
 * 技术基本情况分析-地域分布-数据获取
 * @param typeId
 */
TecWarn.prototype.fetchTecAreaData = function (typeId) {
    var self = this;
    $.ajax({
        type: "GET",
        url: 'http://172.16.155.203:8080/TechObservationWeb/GetTerritoryTrendByFieldName',
        data: {
            "parameters": typeId
        },
        dataType: "json",
        success: function (TecAreaData) {
            self.renderTecAreaData(TecAreaData)
        },
        error: function (msg) {
            self._fetchDataFailed(msg)
        }
    })
};

/**
 * 技术基本情况分析-重点研究机构-1-数据获取
 * @param typeId
 * @param typeText
 */
TecWarn.prototype.fetchTecIns1Data = function (typeId, typeText) {
    var self = this;
    $(function () {
        var url = 'http://172.16.155.203:8080/TechObservationWeb/GetInstituteByField';
        $.ajax({
            type: 'GET',
            url: url,
            data: {
                "parameters": typeId,
                "number": 50
            },
            dataType: 'json',
            success: function (TecIns1Data) {
                self.renderTecIns1Data(TecIns1Data, typeText)
            },
            error: function (msg) {
                self._fetchDataFailed(msg)
            }
        })
    });
};

/**
 * 技术基本情况分析-重点研究机构-2-数据获取
 * @param item
 */
TecWarn.prototype.fetchTecIns2Data = function (item) {
    var self = this;
    $.ajax({
        type: 'GET',
        url: 'http://172.16.155.203:8080/TechObservationWeb/GetFocusFieldByInstitute',
        data: {
            "parameters": item
        },
        dataType: 'json',
        success: function (TecIns2Data) {
            self.renderTecIns2Data(TecIns2Data)
        },
        error: function (msg) {
            self._fetchDataFailed(msg)
        }
    })
};

/**
 * 技术基本情况分析-重点研究机构-3-数据获取
 * @param item
 */
TecWarn.prototype.fetchTecIns3Data = function (item) {
    var self = this;
    $.ajax({
        type: 'GET',
        url: 'http://172.16.155.203:8080/TechObservationWeb/GetContributionByInstitute',
        data: {
            "parameters": item
        },
        dataType: 'json',
        success: function (TecIns3Data) {
            self.renderTecIns3Data(TecIns3Data)
        },
        error: function (msg) {
            self._fetchDataFailed(msg)
        }
    })
};

/**
 * 技术基本情况分析-重点研究机构-4-数据获取
 * @param item
 */
TecWarn.prototype.fetchTecIns4Data = function (item) {
    var self = this;
    $.ajax({
        type: 'GET',
        url: 'http://124.193.169.157:8080/axis2/services/org_impact/getOrgEffect',
        data: {
            "ID": item
        },
        dataType: 'text',
        success: function (TecIns4Data) {
            self.renderTecIns4Data(TecIns4Data)
        },
        error: function (msg) {
            self._fetchDataFailed(msg)
        }
    })
};

/**
 * 技术基本情况分析-知名研究专家-1-数据获取
 * @param typeId
 * @param typeText
 */
TecWarn.prototype.fetchTecExp1Data = function (typeId, typeText) {
    var self = this;
    $.ajax({
        type: 'GET',
        url: 'http://172.16.155.203:8080/TechObservationWeb/GetExpertByField',
        data: {
            "parameters": typeId,
            "number": 50
        },
        dataType: 'json',
        success: function (TecExp1Data) {
            self.renderTecExp1Data(TecExp1Data, typeText)
        },
        error: function (msg) {
            self._fetchDataFailed(msg)
        }
    })
};

/**
 * 技术基本情况分析-知名研究专家-2-数据获取
 * @param item
 */
TecWarn.prototype.fetchTecExp2Data = function (item) {
    var self = this;
    $.ajax({
        type: 'GET',
        url: 'http://172.16.155.203:8080/TechObservationWeb/GetFocusFieldByExpert',
        data: {
            "parameters": item
        },
        dataType: 'json',
        success: function (TecExp2Data) {
            self.renderTecExp2Data(TecExp2Data)
        },
        error: function (msg) {
            self._fetchDataFailed(msg)
        }
    })
};

/**
 * 技术基本情况分析-知名研究专家-3-数据获取
 * @param item
 */
TecWarn.prototype.fetchTecExp3Data = function (item) {
    var self = this;
    $.ajax({
        type: 'GET',
        url: 'http://172.16.155.203:8080/TechObservationWeb/GetContributionByExpert',
        data: {
            "parameters": item
        },
        dataType: 'json',
        success: function (TecExp3Data) {
            self.renderTecExp3Data(TecExp3Data)
        },
        error: function (msg) {
            self._fetchDataFailed(msg)
        }
    })
};

/**
 * 技术基本情况分析-知名研究专家-4-数据获取
 * @param item
 */
TecWarn.prototype.fetchTecExp4Data = function (item) {
    var self = this;
    $.ajax({
        type: 'GET',
        url: 'http://124.193.169.157:8080/axis2/services/author_impact/getAuthorEffect',
        data: {
            "ID": item
        },
        dataType: 'text',
        success: function (TecExp4Data) {
            self.renderTecExp4Data(TecExp4Data)
        },
        error: function (msg) {
            self._fetchDataFailed(msg)
        }
    })
};

/**
 * 时间演化主题分析-数据获取
 * @param typeId
 */
TecWarn.prototype.fetchTimeThemeData = function (typeId) {
    var self = this;
    $.ajax({
        type: 'GET',
        url: 'http://124.193.169.157:8080/axis2/services/Topic/getTopicWordTrend',
        data: {
            "field": typeId
        },
        dataType: 'text',
        success: function (TimeThemeData) {
            TimeThemeData = self._resolveData(TimeThemeData);
            self.renderTimeThemeDataForCheckBox(TimeThemeData);
            // self.renderTimeThemeData(TimeThemeData)
        },
        error: function (msg) {
            self._fetchDataFailed(msg)
        }
    })
};

/**
 * 技术发展评估-数据获取
 * @param typeId
 */
TecWarn.prototype.fetchTecDevData = function (typeId) {
    var self = this;
    $.ajax({
        type: 'GET',
        url: 'http://172.16.155.203:8080/TechObservationWeb/GetExpectationByField',
        data: {
            "parameters": typeId
        },
        dataType: 'json',
        success: function (TecDevData) {
            self.renderTecDevData(TecDevData)
        },
        error: function (msg) {
            self._fetchDataFailed(msg)
        }
    })
};

/**
 * 新兴技术捕捉-数据获取
 * @param currentYear
 * @param typeId
 */
TecWarn.prototype.fetchTecWordData = function (currentYear, typeId) {
    var self = this;
    var url = '';

    if (currentYear === '1') {
        //近一年
        url = 'http://124.193.169.157:8080/axis2/services/HotWord/getCurrent';
    } else if (currentYear === '5') {
        url = 'http://124.193.169.157:8080/axis2/services/HotWord/getFiveYears';
    }
    $.ajax({
        type: 'GET',
        url: url,
        data: {
            "field": typeId
        },
        dataType: 'text',
        success: function (TecWordData) {
            self.renderTecWordData(TecWordData, currentYear, typeId)
        },
        error: function (msg) {
            self._fetchDataFailed(msg)
        }
    })
};

/**
 * 突发词频分析-数据获取
 * @param keyWord
 * @param typeId
 */
TecWarn.prototype.fetchBurstWordData = function (keyWord, typeId) {
    var self = this;
    $.ajax({
        type: 'GET',
        url: 'http://124.193.169.157:8080/axis2/services/HotWord/searchWord',
        data: {
            "word": keyWord,
            "field": typeId
        },
        dataType: 'text',
        success: function (BurstWordData) {
            self.renderBurstWordData(BurstWordData, keyWord)
        },
        error: function (msg) {
            self._fetchDataFailed(msg)
        }
    })
};


/**********************数据渲染************************/

/**
 * 技术基本情况分析-技术趋势-数据渲染 (json数据无需处理直接使用)
 * @param TecTrendData
 */
TecWarn.prototype.renderTecTrendData = function (TecTrendData) {
    // console.log(TecTrendData);
    var len = TecTrendData[1].length;
    if (len !== 0) {
        var ser = [];
        for (var i = 0, j = {}; i < len; i++) {
            j = {
                name: TecTrendData[1][i],
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                // showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                data: TecTrendData[2][i]
            };
            ser.push(j)
        }
        // var chart_TecTrend = echarts.init(document.getElementById('TecTrend'));
        var TecTrend_option = {
            // backgroundColor: '#394056',
            legend: {
                icon: 'rect',
                itemWidth: 14,
                itemHeight: 5,
                itemGap: 13,
                data: TecTrendData[1],
                // right: '4%',
                textStyle: {
                    fontSize: 12
                    // color: '#F1F1F3'
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: '#57617B'
                    }
                }
            },
            grid: {
                top: '25%',
                left: '3%',
                right: 5,
                bottom: '3%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLine: {
                    lineStyle: {
                        color: '#57617B'
                    }
                },
                data: TecTrendData[0]
            }],
            yAxis: [{
                type: 'value',
                name: '篇',
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#57617B'
                    }
                },
                axisLabel: {
                    margin: 10,
                    textStyle: {
                        fontSize: 14
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#57617B'
                    }
                }
            }],
            series: ser
        };
        chart_TecTrend.setOption(TecTrend_option);
    } else {
        console.log('技术趋势数据为空！');
    }
};

/**
 * 技术基本情况分析-地域分布-数据渲染 (json数据无需处理直接使用)
 * @param TecAreaData
 */
TecWarn.prototype.renderTecAreaData = function (TecAreaData) {
    // console.log(TecAreaData);
    var ser = [];
    for (var i = 2, j = {}, len = TecAreaData.length; i < len; i++) {
        j = {
            visualMap: {
                max: (TecAreaData[i].length === 0) ? 200 : TecAreaData[i][0].value
            },
            series: [
                {
                    name: '机构地区分布',
                    data: TecAreaData[i]
                }
            ]
        };
        ser.push(j)
    }
    // console.log(ser);
    // var chinaMap = echarts.init(document.getElementById('worldMap'));
    var chinaMap_option = {
        baseOption: {
            backgroundColor: '#efefef',
            timeline: {
                // y: 0,
                axisType: 'category',
                // realtime: false,
                // loop: false,
                autoPlay: true,
                // currentIndex: 2,
                playInterval: 3000,
                // controlStyle: {
                //     position: 'left'
                // },
                data: TecAreaData[1]//[2013, 2014]
            },
            tooltip: {
                trigger: 'item'
                // formatter: function (params) {
                //     var value = (params.value + '').split('.');
                //     value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,')
                //         + '.' + value[1];
                //     return params.seriesName + '<br/>' + params.name + ' : ' + value;
                // }
            },
            visualMap: {
                // min: 0,
                // max: 10000,
                text: ['High', 'Low'],
                realtime: false,
                calculable: true,
                inRange: {
                    color: ['lightskyblue', 'yellow', 'orangered']
                }
            },
            series: [{
                name: '机构地区分布',
                type: 'map',
                mapType: 'world',
                top: 15,
                right: 15,
                bottom: 50,
                left: 15,
                // roam: true,
                itemStyle: {
                    emphasis: {label: {show: true}}
                }
            }]
        },
        options: ser
    };

    chinaMap.setOption(chinaMap_option)
};

/**
 * 技术基本情况分析-重点研究机构-1-数据渲染 (json数据无需处理直接使用)
 * @param TecIns1Data
 * @param typeText
 */
TecWarn.prototype.renderTecIns1Data = function (TecIns1Data, typeText) {
    // console.log(TecIns1Data);
    var item = TecIns1Data[0][0];
    var max = TecIns1Data[1][0];
    var html = '';
    for (var i = 0, len = TecIns1Data[0].length; i < len; i++) {
        html += '<tr name="' + TecIns1Data[0][i] + '"><th>' + (i + 1) + '</th><th><span class="sto-width">' + TecIns1Data[0][i] + '</span></th><th><div class="progress_container"><div class="progress_bar" original-title="' + TecIns1Data[1][i] + '"></div></div></th><th>' + TecIns1Data[1][i] + '</th></tr>'
    }
    $('#tecIns').html(html);
    $('#tecInsName').html(typeText);

    // 绑定事件
    this.bindEventForTab(item, 'left-tab', '#tecIns', max);
};

/**
 * 技术基本情况分析-重点研究机构-2-数据渲染 (json数据无需处理直接使用)
 * @param TecIns2Data
 */
TecWarn.prototype.renderTecIns2Data = function (TecIns2Data) {
    // console.log(TecIns2Data);
    if (TecIns2Data[0].length !== 0) {
        var option = [];
        var time_data = [];
        for (var i = 1, j = {}; i < TecIns2Data.length; i++) {
            if (TecIns2Data[i].length !== 0) {
                j = {
                    // title: {text: '研究领域占比'},
                    series: [
                        {
                            name: '研究领域',
                            data: TecIns2Data[i]
                        }
                    ]
                };
                option.push(j);
                time_data.push(TecIns2Data[0][i - 1])
            }
        }
        // var chart_TecIns2Data = echarts.init(document.getElementById('TecIns2Data'));
        chart_TecIns2Data.clear();
        var option_TecIns2Data = {
            baseOption: {
                timeline: {
                    left: 10,
                    right: 10,
                    axisType: 'category',
                    // realtime: false,
                    // loop: false,
                    autoPlay: true,
                    // currentIndex: 2,
                    playInterval: 3000,
                    // controlStyle: {
                    //     position: 'left'
                    // },
                    data: time_data
                },
                title: {
                    subtext: '',
                    subtextStyle: {
                        align: 'center'
                    }
                },
                tooltip: {},
                calculable: true,
                series: [
                    {
                        name: '研究领域',
                        type: 'pie',
                        center: ['50%', '40%'],
                        radius: '50%'
                    }
                ]
            },
            options: option
        };
        chart_TecIns2Data.setOption(option_TecIns2Data);
    } else {
        console.log('请求数据为空！')
    }
    // 绑定事件
};

/**
 * 技术基本情况分析-重点研究机构-3-数据渲染 (json数据无需处理直接使用)
 * @param TecIns3Data
 */
TecWarn.prototype.renderTecIns3Data = function (TecIns3Data) {
    // console.log(TecIns3Data);
    $('#mes-box').hide();
    // var chart_TecIns3Data = echarts.init(document.getElementById('TecIns3Data'));
    chart_TecIns3Data.clear();
    var option_TecIns3Data = {
        backgroundColor: "#263559",
        color: ["#cff7cd", "#6cf0da"],
        textStyle: {
            color: "#d7d7d7"
        },
        legend: {
            right: 10,
            width: 500,
            itemWidth: 40,
            textStyle: {
                color: "#d7d7d7"
            },
            data: ['论文数量', '专利数量']
        },
        xAxis: [{
            type: 'category',
            axisTick: {
                show: false
            },

            data: TecIns3Data[0]
        }],
        yAxis: [{
            type: 'value',
            // name:"单位：人",
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            splitLine: {
                lineStyle: {
                    color: "#333333"
                }
            }
        }],
//        tooltip: {
//            trigger: 'axis',
//            axisPointer: { // 坐标轴指示器，坐标轴触发有效
//                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
//            }
//        },
        series: [{
            name: '论文数量',
            type: 'bar',
            itemStyle: {
                normal: {
                    barBorderRadius: 5
                }
            },
            data: TecIns3Data[1][0]//[120, 50, 60, 50, 15,50,30,50,20]
        }, {
            name: '专利数量',
            type: 'bar',
            itemStyle: {
                normal: {
                    barBorderRadius: 5
                }
            },
            data: TecIns3Data[2][0]//[66, 35, 58, 0,0,0,0,47,0]
        }]
    };
    chart_TecIns3Data.setOption(option_TecIns3Data);

    // 绑定事件
    this.bindEventJumpTitle(chart_TecIns3Data, TecIns3Data, '1');
};

/**
 * 技术基本情况分析-重点研究机构-4-数据渲染 (json数据无需处理直接使用)
 * @param TecIns4Data
 */
TecWarn.prototype.renderTecIns4Data = function (TecIns4Data) {
    TecIns4Data = this._resolveData(TecIns4Data);
    // console.log(TecIns4Data);
    var data = TecIns4Data[1].numFix();
    // console.log(data);
    if (TecIns4Data) {
        // var chart_TecIns4Data = echarts.init(document.getElementById('TecIns4Data'));
        chart_TecIns4Data.clear();
        var option_TecIns4Data = {
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['当前统计'],
                left: 'right'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: TecIns4Data[0]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '当前统计',
                    type: 'line',
//                smooth: true,
                    data: data
                }
            ]
        };
        chart_TecIns4Data.setOption(option_TecIns4Data);
    } else {
        console.log('没有获取到数据！');
    }

    // 绑定事件
};

/**
 * 技术基本情况分析-知名研究专家-1-数据渲染 (json数据无需处理直接使用)
 * @param TecExp1Data
 * @param typeText
 */
TecWarn.prototype.renderTecExp1Data = function (TecExp1Data, typeText) {
    // console.log(TecExp1Data);
    var item = TecExp1Data[0][0];
    var max = TecExp1Data[1][0];
    var html = '';
    for (var i = 0, len = TecExp1Data[0].length; i < len; i++) {
        html += '<tr name="' + TecExp1Data[0][i] + '"><th>' + (i + 1) + '</th><th><span class="sto-width">' + TecExp1Data[0][i] + '</span></th><th><div class="progress_container"><div class="progress_bar" original-title="' + TecExp1Data[1][i] + '"></div></div></th><th>' + TecExp1Data[1][i] + '</th></tr>'
    }
    $('#tecExp').html(html);
    $('#tecExpName').html(typeText);

    // 绑定事件
    this.bindEventForTab(item, 'right-tab', '#tecExp', max);
};

/**
 * 技术基本情况分析-知名研究专家-2-数据渲染 (json数据无需处理直接使用)
 * @param TecExp2Data
 */
TecWarn.prototype.renderTecExp2Data = function (TecExp2Data) {
    // console.log(TecExp2Data);
    // var chart_TecExp2Data = echarts.init(document.getElementById('TecExp2Data'));
    if (TecExp2Data[0].length !== 0) {
        var option = [];
        var time_data = [];
        for (var i = 1, j = {}; i < TecExp2Data.length; i++) {
            if (TecExp2Data[i].length !== 0) {
                j = {
                    // title: {text: '研究领域占比'},
                    series: [
                        {
                            name: '研究领域',
                            data: TecExp2Data[i]
                        }
                    ]
                };
                option.push(j);
                time_data.push(TecExp2Data[0][i - 1]);
            }
        }
        chart_TecExp2Data.clear();
        var option_TecExp2Data = {
            baseOption: {
                timeline: {
                    left: 10,
                    right: 10,
                    axisType: 'category',
                    // realtime: false,
                    // loop: false,
                    autoPlay: true,
                    // currentIndex: 0,
                    playInterval: 3000,
                    // controlStyle: {
                    //     position: 'left'
                    // },
                    data: time_data
                },
                title: {
                    subtext: '',
                    subtextStyle: {
                        align: 'center'
                    }
                },
                tooltip: {},
                calculable: true,
                series: [
                    {
                        name: '研究领域',
                        type: 'pie',
                        center: ['50%', '40%'],
                        radius: '50%'
                    }
                ]
            },
            options: option
        };
        chart_TecExp2Data.setOption(option_TecExp2Data);
    } else {
        console.log('请求数据为空！')
    }
    // 绑定事件

};

/**
 * 技术基本情况分析-知名研究专家-3-数据渲染 (json数据无需处理直接使用)
 * @param TecExp3Data
 */
TecWarn.prototype.renderTecExp3Data = function (TecExp3Data) {
    // console.log(TecExp3Data);
    $('#mes-box2').hide();
    // var chart_TecExp3Data = echarts.init(document.getElementById('TecExp3Data'));
    chart_TecExp3Data.clear();
    var option_TecExp3Data = {
        backgroundColor: "#263559",
        color: ["#cff7cd", "#6cf0da"],
        textStyle: {
            color: "#d7d7d7"
        },
        legend: {
            right: 10,
            width: 500,
            itemWidth: 40,
            textStyle: {
                color: "#d7d7d7"
            },
            data: ['论文数量', '专利数量']
        },
        xAxis: [{
            type: 'category',
            axisTick: {
                show: false
            },

            data: TecExp3Data[0]
        }],
        yAxis: [{
            type: 'value',
            // name:"单位：人",
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            splitLine: {
                lineStyle: {
                    color: "#333333"
                }
            }
        }],
//        tooltip: {
//            trigger: 'axis',
//            axisPointer: { // 坐标轴指示器，坐标轴触发有效
//                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
//            }
//        },
        series: [{
            name: '论文数量',
            type: 'bar',
            itemStyle: {
                normal: {
                    barBorderRadius: 5
                }
            },
            data: TecExp3Data[1][0]//[120, 50, 60, 50, 15,50,30,50,20]
        }, {
            name: '专利数量',
            type: 'bar',
            itemStyle: {
                normal: {
                    barBorderRadius: 5
                }
            },
            data: TecExp3Data[2][0]//[66, 35, 58, 0,0,0,0,47,0]
        }]
    };
    chart_TecExp3Data.setOption(option_TecExp3Data);

    // 绑定事件
    this.bindEventJumpTitle(chart_TecExp3Data, TecExp3Data, '2')
};

/**
 * 技术基本情况分析-知名研究专家-4-数据渲染
 * @param TecExp4Data
 */
TecWarn.prototype.renderTecExp4Data = function (TecExp4Data) {
    TecExp4Data = this._resolveData(TecExp4Data);
    // console.log(TecExp4Data);
    var data = TecExp4Data[1].numFix();
    if (TecExp4Data) {
        // var chart_TecExp4Data = echarts.init(document.getElementById('TecExp4Data'));
        chart_TecExp4Data.hideLoading();
        chart_TecExp4Data.clear();
        var option_TecExp4Data = {
            title: {
                text: '研究专家影响力'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['当前统计'],
                left: 'right'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: TecExp4Data[0]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '当前统计',
                    type: 'line',
//                smooth: true,
                    data: data
                }
            ]
        };
        chart_TecExp4Data.setOption(option_TecExp4Data);
    } else {
        console.log('没有获取到数据！');
    }

    // 绑定事件
};

/**
 * 时间演化主题分析-复选框数据渲染
 * @param TimeThemeData
 */
TecWarn.prototype.renderTimeThemeDataForCheckBox = function (TimeThemeData) {
    var topic_arr = TimeThemeData[0];
    var html = '';
    for (var m = 0, len = topic_arr.length; m < len; m++) {
        html += '<li><input type="checkbox" name="checkbox' + m + '" id="checkbox' + m + '" class="css-checkbox" checked><label for="checkbox' + m + '" class="css-label radGroup1 clr chk-act" rel="' + m + '">' + topic_arr[m] + '</label></li>'
    }
    $('#theme').html(html);
    var selItem = [0, 1, 2, 3, 4]; // 第一次加载默认全选中
    this.renderTimeThemeData(TimeThemeData, selItem);
    // 绑定事件
    this.bindEventForCheckBox(TimeThemeData)
};

/**
 * 时间演化主题分析-图表数据渲染
 * @param TimeThemeData
 * @param selItem
 */
TecWarn.prototype.renderTimeThemeData = function (TimeThemeData, selItem) {
    // console.log(TimeThemeData);
    // 数据处理
    var finData = this._resolveTimeThemeData(TimeThemeData, selItem);
    // console.log(finData);

    // var chart_themeData = echarts.init(document.getElementById('themeData'));
    chart_themeData.clear(); // 清空当前实例
    var option_themeData = {
        backgroundColor: '#fff',
        title: {
            text: '',
            left: 'center',
            top: 16
        },
        tooltip: finData[1],
        legend: {
            // left: 'right',
            // top: 'middle',
            // orient: 'vertical',
            // align: 'left',
            data: finData[0]
        },
        grid: {
            top: 40,
            right: 10,
            bottom: 30,
            left: 30
        },
        xAxis: {
            type: 'category',
            data: finData[2]
        },
        yAxis: {
            type: 'value',
            splitLine: {
                show: false,
                lineStyle: {
                    type: 'dashed'
                }
            }
        },
        series: finData[3]
    };
    chart_themeData.setOption(option_themeData);
    // option_themeData = null;
};

/**
 * 技术发展评估-数据渲染
 * @param TecDevData
 */
TecWarn.prototype.renderTecDevData = function (TecDevData) {
    // console.log(TecDevData);
    var len = TecDevData[1].length;
    var _len = TecDevData[2][0].length;
    if (len !== 0) {
        var line_data = [];
        for (var i = 0; i < len; i++) {
            var tmp = [];
            for (var j = 0, n = {}; j < _len; j++) {
                n = {
                    name: [TecDevData[3][i][j]],
                    value: TecDevData[2][i][j]
                };
                tmp.push(n)
            }
            line_data.push(tmp);
            tmp = null
        }
        var ser = [];
        for (var m = 0, k = {}; m < line_data.length; m++) {
            k = {
                name: TecDevData[1][m],
                type: 'line',
                smooth: true,
                data: line_data[m]
            };
            ser.push(k)
        }
        // var chart_TecDevData = echarts.init(document.getElementById('TecDevData'));
        var option_TecDevData = {
            legend: {
                data: TecDevData[1]
            },
            grid: {
                left: '0',
                right: '3%',
                bottom: '3%',
                top: '10%',
                containLabel: true
            },
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    formatter: function (params) {
                        return params.data.name[0]
                    },
                    textStyle: {
                        color: '#000',
                        fontWeight: 'bold'
                    }
                }
            },
            xAxis: {
                type: 'category',
                data: TecDevData[0]
            },
            yAxis: {
                splitLine: { //网格线
                    show: true,
                    lineStyle: {
                        color: ['#b1b1b1'],
                        type: 'dashed'
                    }
                }
            },
            series: ser
        };
        chart_TecDevData.setOption(option_TecDevData)
    } else {
        console.log('技术发展评估数据为空！');
    }
};

/**
 * 新兴技术捕捉-数据渲染
 * @param TecWordData
 * @param currentYear
 * @param typeId
 */
TecWarn.prototype.renderTecWordData = function (TecWordData, currentYear, typeId) {
    if (typeof (TecWordData) !== 'object') {
        TecWordData = this._resolveData(TecWordData);
        if (currentYear === '5') {
            // 为同一年的数据设置相同颜色
            var arr_color = ['#C23531', '#6B3267', '#3D7517', '#1C7E96', '#157CF0'];
            for (var j = 0, _len = TecWordData[0].length; j < _len; j += 3) {
                for (var m = j; m < (j + 3); m++) {
                    TecWordData[0][m].color = arr_color[j / 3]
                }
            }
        }
    }
    // console.log(TecWordData);
    var keyWord = TecWordData[0][0].name;
    var html = '';
    // var chart_TecWordData = echarts.init(document.getElementById('TecWordData'));
    var option_TecWordData = {
        title: {
            // text: "词云图"
        },
        tooltip: {},
        method: {},
        series: [{
            type: 'wordCloud',
            gridSize: 20,
            sizeRange: [12, 50],
            rotationRange: [0, 0],
            shape: 'circle',
            textStyle: {
                normal: {
                    color: function (obj) {
                        // console.log(obj);
                        return obj.data.color;
                        // return 'rgb(' + [
                        //         Math.round(Math.random() * 160),
                        //         Math.round(Math.random() * 160),
                        //         Math.round(Math.random() * 160)
                        //     ].join(',') + ')';
                    }
                },
                emphasis: {
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            data: TecWordData[0]
        }]
    };
    chart_TecWordData.setOption(option_TecWordData);
    for (var i = 0, len = TecWordData[0].length; i < len; i++) {
        html += '<tr><td>' + (i + 1) + '</td><td class="hotwords" value="' + TecWordData[0][i].name + '">' + TecWordData[0][i].name + '</td><td>' + TecWordData[0][i].value + '</td><td>' + TecWordData[1][i] + '</td></tr>'
    }
    $('#wordData').html(html);

    chart_burstWordData.showLoading({text: 'Loading'});
    this.fetchBurstWordData(keyWord, typeId); // 突发词频分析

    // 绑定事件
    this.bindEventForWordData(chart_TecWordData, keyWord, currentYear, TecWordData, typeId)
};

/**
 * 突发词频分析-数据渲染
 * @param BurstWordData
 * @param keyWord
 */
TecWarn.prototype.renderBurstWordData = function (BurstWordData, keyWord) {
    BurstWordData = this._resolveData(BurstWordData);
    chart_burstWordData.hideLoading();
    // console.log(BurstWordData);
    // var chart_burstWordData = echarts.init(document.getElementById('burstWordData'));
    var option_burstWordData = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: [keyWord]
        },
        grid: {
            top: 30,
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
//        toolbox: {
//            feature: {
//                saveAsImage: {}
//            }
//        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: BurstWordData.year
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: keyWord,
                type: 'line',
                data: BurstWordData.frequency
            }
        ]
    };
    chart_burstWordData.setOption(option_burstWordData);
};


/**********************数据处理************************/

/**
 * xml解析
 * @param data
 * @returns {*}
 * @private
 */
TecWarn.prototype._resolveData = function (data) {
    data = loadXML(data);
    if (data) {
        data = jQuery.parseJSON(data);
        return data
    } else {
        return false
    }
};

/**
 * 时间演化主题分析-数据处理
 * @param TimeThemeData
 * @param selItem
 * @private
 */
TecWarn.prototype._resolveTimeThemeData = function (TimeThemeData, selItem) {
    var topic_arr = TimeThemeData[0];
    var x_data = TimeThemeData[1];
    var line_data = TimeThemeData[2];
    var cir_data = TimeThemeData[3];
    var auto_line_data = TimeThemeData[4];

    var tooltip = {
        show: false
    };

    var series = []; // series 数组
    var legendData = [];
    var len = selItem.length;

    if (len === 0) {

    } else if (len === 1) {
        var _topic_line = {
            name: topic_arr[selItem[0]],
            type: 'line',
            z: 10,
            smooth: true,
            symbolSize: 8,
            data: line_data[selItem[0]]
        };
        series.push(_topic_line);

        var fin_cir_data = cir_data[selItem[0]].map(function (item) {
            return [item[0], item[2], item[3], item[1]]
        });

        var one_topic_cir = { // 绘制一个主题下的词阵列
            name: '',
            type: 'scatter',
            label: {
                normal: {
                    show: true,
                    textStyle: {
                        color: '#000'
                    },
                    position: 'top',
                    formatter: function (params) {
                        return params.value[3];
                    }
                }
            },
            hoverAnimation: false,
            symbolSize: function (val) {
                return val[2] * 2 * 0.3;
            },
            data: fin_cir_data
        };

        series.push(one_topic_cir);

        for (var i = 0, one_topic_auto_line = {}, _len = auto_line_data[selItem[0]].length; i < _len; i++) {
            one_topic_auto_line = {
                name: '',
                type: 'line',
                data: auto_line_data[selItem[0]][i],
                lineStyle: {
                    normal: {
                        type: 'dotted',
                        color: 'gray'
                    }
                },
                itemStyle: {
                    normal: {
                        opacity: 0
                    }
                }
            };
            series.push(one_topic_auto_line)
        }
    } else {
        for (var j = 0, topic_line = {}; j < len; j++) {
            legendData.push(topic_arr[selItem[j]]);
            topic_line = {
                name: topic_arr[selItem[j]],
                type: 'line',
                z: 10,
                smooth: true,
                symbolSize: 8,
                data: line_data[selItem[j]]
            };
            series.push(topic_line)
        }

        tooltip = {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        }
    }

    return [legendData, tooltip, x_data, series]
};


/**********************绑定事件************************/

/**
 * Tab-图1点击事件
 * @param item
 * @param index
 * @param boxId
 * @param max
 */
TecWarn.prototype.bindEventForTab = function (item, index, boxId, max) {
    // 设置列表隔行颜色差异
    $(boxId).each(function () {
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
    $(boxId + ' .progress_container').each(function () {
        var percent = $(this).children('.progress_bar').attr('title');
        if (!percent) {
            percent = $(this).children('.progress_bar').attr('original-title')
        }
        percent /= max;
        $(this).children('.progress_bar').animate({width: percent * 100 + '%'}, 1000);
    });

    var self = this;
    var _item = item;
    if (index === 'left-tab') {
        self.fetchTecIns2Data(_item); // 技术基本情况分析-重点研究机构-2-数据获取
        self.fetchTecIns3Data(_item); // 技术基本情况分析-重点研究机构-3-数据获取
        self.fetchTecIns4Data(_item); // 技术基本情况分析-重点研究机构-4-数据获取
    } else if (index === 'right-tab') {
        self.fetchTecExp2Data(_item); // 技术基本情况分析-知名研究专家-2-数据获取
        self.fetchTecExp3Data(_item); // 技术基本情况分析-知名研究专家-3-数据获取
        chart_TecExp4Data.showLoading({text: 'Loading'});
        self.fetchTecExp4Data(_item); // 技术基本情况分析-知名研究专家-4-数据获取
    }
    $(boxId + ' tr').off().on('click', function () {
        var new_item = $(this).attr('name');
        if (_item !== new_item) {
            _item = new_item;
            // console.log(_item);
            if (index === 'left-tab') {
                self.fetchTecIns2Data(_item); // 技术基本情况分析-重点研究机构-2-数据获取
                self.fetchTecIns3Data(_item); // 技术基本情况分析-重点研究机构-3-数据获取
                self.fetchTecIns4Data(_item); // 技术基本情况分析-重点研究机构-4-数据获取
            } else if (index === 'right-tab') {
                self.fetchTecExp2Data(_item); // 技术基本情况分析-知名研究专家-2-数据获取
                self.fetchTecExp3Data(_item); // 技术基本情况分析-知名研究专家-3-数据获取
                chart_TecExp4Data.showLoading({text: 'Loading'});
                self.fetchTecExp4Data(_item); // 技术基本情况分析-知名研究专家-4-数据获取
            }
        }
    })
};

/**
 * 弹出5篇论文事件
 * @param chart
 * @param data
 * @param index
 */
TecWarn.prototype.bindEventJumpTitle = function (chart, data, index) {
    // console.log(chart);
    chart.off();
    chart.on('click', function (params) {
        // console.log(params);
        var seriesIndex = params.seriesIndex;
        var dataIndex = params.dataIndex;
        var msg_box = $('#mes-box' + index);

        var mesData = data[seriesIndex + 1][dataIndex + 1];
        var html = '';

        // console.log(mesData);

        if (mesData.length !== 0) {
            for (var i = 0; i < mesData.length; i++) {
                html += '<p>' + mesData[i] + '</p>'
            }
            msg_box.html(html);
        } else {
            // console.log(index);
            html = '<p>没有查询到数据！</p>';
            msg_box.html(html);
        }

        var chartBox = document.getElementById(((index === '1') ? 'TecIns3Data' : 'TecExp3Data'));
        chartBox.onclick = function (e) {
            var x = e.offsetX;
            var y = e.offsetY;

            msg_box.css({'left': x - 10, 'top': y - 10});
        };

        msg_box.show('fast');

        msg_box[0].onmouseleave = function () {
            msg_box.hide('fast')
        }
    })
};

/**
 * 新兴技术捕捉-事件
 * @param chart
 * @param oldKeyWord
 * @param currentYear
 * @param TecWordData
 * @param typeId
 */
TecWarn.prototype.bindEventForWordData = function (chart, oldKeyWord, currentYear, TecWordData, typeId) {
    // console.log(TecWordData);
    var tH = $('#toHot');
    var tY = $('#toYear');
    var tbl = document.getElementById("table_hotwords");
    var rows = tbl.rows.length;
    for (var i = 0; i < rows; i++) {
        if (i % 2 === 0) {
            tbl.rows[i].style.backgroundColor = "#fff";
        }
        else
            tbl.rows[i].style.backgroundColor = "#f7fcff";
    }
    chart.off();
    chart.on('click', function (params) {
        // console.log(params);
        var keyWord = params.data.name;
        if (keyWord !== oldKeyWord) {
            chart_burstWordData.showLoading({text: 'Loading'});
            TecWarn.prototype.fetchBurstWordData(keyWord, typeId);
            oldKeyWord = keyWord;
        }
    });
    $('.hotwords').off().on('click', function () {
        var _keyWord = $(this).attr('value');
        if (_keyWord !== oldKeyWord) {
            chart_burstWordData.showLoading({text: 'Loading'});
            TecWarn.prototype.fetchBurstWordData(_keyWord, typeId);
            oldKeyWord = _keyWord;
        }
    });
    tH.off().on('click', function () {
        var acIndex = tH.attr('class').indexOf('active');
        if (currentYear === '5' && acIndex === -1) {
            var sortData = TecWarn.prototype._sort(TecWordData);
            // console.log(sortData);
            TecWarn.prototype.renderTecWordData(sortData, '5', typeId);
            tH.addClass('active');
            tY.removeClass('active');
        }
    });
    tY.off().on('click', function () {
        var acIndex = tY.attr('class').indexOf('active');
        if (currentYear === '5' && acIndex === -1) {
            TecWarn.prototype.fetchTecWordData('5', typeId);
            tY.addClass('active');
            tH.removeClass('active');
        }
    })
};

/**
 * 时间演化主题分析checkBox点击事件
 * @param TimeThemeData
 */
TecWarn.prototype.bindEventForCheckBox = function (TimeThemeData) {
    $('.css-label').off().on('click', function () {
        var selItem = [];
        $(this).toggleClass('chk-act');
        $('#theme .chk-act').each(function () {
            selItem.push($(this).attr('rel') * 1)
        });
        // console.log(selItem);
        TecWarn.prototype.renderTimeThemeData(TimeThemeData, selItem);
    });
};


/**********************其它函数************************/

/**
 * ajax请求失败输出 msg
 * @param msg
 * @private
 */
TecWarn.prototype._fetchDataFailed = function (msg) {
    console.log(msg);
};

/**
 * 新兴技术捕捉-排序算法
 * @param TecWordData
 * @private
 */
TecWarn.prototype._sort = function (TecWordData) {
    var data = TecWordData;
    var i = data[0].length - 1;  //初始时,最后位置保持不变
    while (i > 0) {
        var pos = 0; //每趟开始时,无记录交换
        for (var j = 0; j < i; j++)
            if (data[0][j].value < data[0][j + 1].value) {
                pos = j; //记录交换的位置
                var tmp = data[0][j];
                var _tmp = data[1][j];
                data[0][j] = data[0][j + 1];
                data[1][j] = data[1][j + 1];
                data[0][j + 1] = tmp;
                data[1][j + 1] = _tmp;
            }
        i = pos; //为下一趟排序作准备
    }
    return data;
};

/**
 * numFix
 * @returns {TecWarn}
 */
Array.prototype.numFix = function () {
    var arr = this;
    var len = this.length;
    if (len !== 0) {
        for (var i = 0; i < len; i++) {
            arr[i] = arr[i].toFixed(3) * 1
        }
    }
    return arr
};

TecWarn.prototype.__init();




















