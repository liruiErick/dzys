// 声明所需的全局变量
var typeId = '1';
var topic_id = '';
var int_id = null;

// 全局实例化echarts
var topicData = echarts.init(document.getElementById('topicData'));
var hotRelate = echarts.init(document.getElementById('hotRelate'));
var hotWords = echarts.init(document.getElementById('hotWords'));
var chinaMap = echarts.init(document.getElementById('chinaMap'));
var worldMap = echarts.init(document.getElementById('worldMap'));

// 热点分析-模块化开发
var HotAnal = function () {
    this.__init()
};

// 初始化
HotAnal.prototype.__init = function () {
    var self = this;
    $('.tabGraphBtn li a').on('click', function () {
        $(this).parents().addClass('current').siblings().removeClass('current');
        var new_typeId = this.rel;
        if (new_typeId !== typeId) {
            typeId = new_typeId;
            // console.log(typeId);
            self.fetchHotNewsData(typeId);
            self.fetchHotWordsCloudData(typeId);
            self.fetchTopicDisData(typeId);
        }
    });
    $('.hot-btn-box span').on('mouseenter', function () {
        $(this).addClass('current').siblings().removeClass('current');
        var index = $(this).attr('rel') * 1;
        var this_div = $('.map-box div.p-a')[index];
        $(this_div).removeClass('v-h').siblings().addClass('v-h');
    });
    self.fetchHotNewsData(typeId);
    self.fetchHotWordsCloudData(typeId);
    self.fetchTopicDisData(typeId);
};

/**********************数据获取************************/

/**
 * 热点聚焦-数据获取
 * @param typeId
 */
HotAnal.prototype.fetchHotNewsData = function (typeId) {
    var self = this;
    $.ajax({
        type: 'POST',
        url: 'http://172.16.155.201:8080/HotTopicServer/getHotTopicNews',
        data: {
            "class_num": typeId
        },
        dataType: 'json',
        success: function (HotNewsData) {
            self.renderHotNewsData(HotNewsData)
        },
        error: function (msg) {
            self._fetchDataFailed(msg)
        }
    })
};

/**
 * 热点词云-数据获取
 * @param typeId
 */
HotAnal.prototype.fetchHotWordsCloudData = function (typeId) {
    var self = this;
    $.ajax({
        type: 'POST',
        url: 'http://172.16.155.201:8080/HotTopicServer/getKeyWordsDistribution',
        data: {
            "class_num": typeId
        },
        dataType: 'json',
        success: function (HotWordsCloudData) {
            self.renderHotWordsCloudData(HotWordsCloudData)
        },
        error: function (msg) {
            self._fetchDataFailed(msg)
        }
    });
};

/**
 * 话题热度分布-数据获取
 * @param typeId
 */
HotAnal.prototype.fetchTopicDisData = function (typeId) {
    var self = this;
    $.ajax({
        type: 'POST',
        url: 'http://172.16.155.201:8080/HotTopicServer/getHotTopicDistribution',
        data: {
            "class_num": typeId
        },
        dataType: 'json',
        success: function (TopicDisData) {
            self.renderTopicDisData(TopicDisData)
        },
        error: function (msg) {
            self._fetchDataFailed(msg)
        }
    });
};

/**
 * 深度剖析-话题-数据获取
 * @param typeId
 * @param topic_id
 */
HotAnal.prototype.fetchTopicData = function (typeId, topic_id) {
    var self = this;
    $.ajax({
        type: "POST",
        url: 'http://172.16.155.201:8080/HotTopicServer/getDataSourceDistribution',
        data: {
            "class_num": typeId,
            "topic_id": topic_id
        },
        dataType: "json",
        success: function (TopicData) {
            self.renderTopicData(TopicData)
        },
        error: function (msg) {
            self._fetchDataFailed(msg)
        }
    })
};

/**
 * 深度剖析-热点关联词-数据获取
 * @param typeId
 * @param topic_id
 */
HotAnal.prototype.fetchHotRelatedWordsData = function (typeId, topic_id) {
    var self = this;
    $.ajax({
        type: "GET",
        url: 'http://172.16.155.201:8080/HotTopicServer/getWordTrend',
        data: {
            "class_num": typeId,
            "topic_id": topic_id
        },
        dataType: "json",
        success: function (HotRelatedWordsData) {
            self.renderHotRelatedWordsData(HotRelatedWordsData, '#hot_range')
        },
        error: function (msg) {
            self._fetchDataFailed(msg)
        }
    })
};

/**
 * 深度剖析-热点词趋势-数据获取
 * @param typeId
 * @param topic_id
 */
HotAnal.prototype.fetchHotWordsTrendData = function (typeId, topic_id) {
    var self = this;
    $.ajax({
        type: "GET",
        url: 'http://172.16.155.201:8080/HotTopicServer/getWordHotTrend',
        data: {
            "class_num": typeId,
            "topic_id": topic_id
        },
        dataType: "json",
        success: function (HotWordsTrendData) {
            self.renderHotWordsTrendData(HotWordsTrendData)
        },
        error: function (msg) {
            self._fetchDataFailed(msg)
        }
    })
};

/**
 * 深度剖析-热点话题分布-China-数据获取
 * @param typeId
 * @param topic_id
 */
HotAnal.prototype.fetchHotTopicDisData = function (typeId, topic_id) {
    var self = this;
    $.ajax({
        type: "POST",
        url: 'http://172.16.155.201:8080/HotTopicServer/getTopicLocaleDistribution',
        data: {
            "class_num": typeId,
            "place_scale": "china",
            "topic_id": topic_id
        },
        dataType: "json",
        success: function (HotTopicDisData) {
            self.renderHotTopicDisData(HotTopicDisData)
        },
        error: function (msg) {
            self._fetchDataFailed(msg)
        }
    })
};

/**
 * 深度剖析-热点话题分布-World-数据获取
 * @param typeId
 * @param topic_id
 */
HotAnal.prototype.fetchHotTopicDisWorldData = function (typeId, topic_id) {
    var self = this;
    $.ajax({
        type: "POST",
        url: "http://172.16.155.201:8080/HotTopicServer/getTopicLocaleDistribution",
        data: {
            "class_num": typeId,
            "place_scale": "world",
            "topic_id": topic_id
        },
        dataType: "json",
        success: function (HotTopicDisWorldData) {
            self.renderHotTopicDisWorldData(HotTopicDisWorldData)
        },
        error: function (msg) {
            self._fetchDataFailed(msg)
        }
    })
};


/**********************数据渲染************************/

/**
 * 热点聚焦-数据渲染
 * @param HotNewsData
 */
HotAnal.prototype.renderHotNewsData = function (HotNewsData) {
    // 数据处理
    var finData = this._resolveHotNewsData(HotNewsData);
    // console.log(finData);
    $('#HotNews_box').html(finData[0]);
    // 绑定事件
    this.bindEventForHotNews(finData[1])
};

/**
 * 热点词云-数据渲染
 * @param HotWordsCloudData
 */
HotAnal.prototype.renderHotWordsCloudData = function (HotWordsCloudData) {
    // 数据处理
    var finData = this._resolveHotWordsCloudData(HotWordsCloudData);
    $('#w3dcloud').html(finData);
    var new_int_id = Load3DCloudWords('w3dcloud'); // 3DCloudWords.js
    if (int_id === null) {
        int_id = new_int_id;
    } else if (new_int_id !== int_id) {
        clearInterval(int_id);
        int_id = new_int_id;
    }
};

/**
 * 话题热度分布-数据渲染
 * @param TopicDisData
 */
HotAnal.prototype.renderTopicDisData = function (TopicDisData) {
    // 数据处理
    var finData = this._resolveTopicDisData(TopicDisData);
    $('#hotRankBox').html(finData[0]);
    // 绑定事件
    this.bindEventForTopicDis();
    // 拿到 `topic_id` 后开始请求`深度剖析`中的数据
    // 请求话题数据
    this.fetchTopicData(typeId, finData[1]);
    // 请求热点关联词数据
    this.fetchHotRelatedWordsData(typeId, finData[1]);
    // 请求热点词趋势数据
    this.fetchHotWordsTrendData(typeId, finData[1]);
    // 请求热点话题分布China数据
    this.fetchHotTopicDisData(typeId, finData[1]);
    // 请求热点话题分布World数据
    this.fetchHotTopicDisWorldData(typeId, finData[1]);
};

/**
 * 深度剖析-数据来源分布-数据渲染 (json数据无需处理直接使用)
 * @param TopicData
 */
HotAnal.prototype.renderTopicData = function (TopicData) {
    // console.log(TopicData);
    // var topicData = echarts.init(document.getElementById('topicData'));
    var topicData_option = {
        // title: {
        //     text: '数据来源分布'
        // },
        tooltip: {},
        // legend: {
        //     data: ['数据来源']
        // },
        grid: {
            top: 10,
            left: 50,
            right: 30,
            bottom: 60
        },
        xAxis: {
            type: 'category',
            axisLabel: {
                interval: 0,
                rotate: -15
            },
            data: TopicData[0].slice(0, 9)
        },
        yAxis: {},
        series: [{
            // name: '数据来源',
            type: 'bar',
            data: TopicData[1].slice(0, 9)
        }]
    };
    topicData.setOption(topicData_option);
    // if (TopicData[2] !== '') {
    //     $('.topic-data-page').html(TopicData[2])
    // } else {
    //     $('.topic-data-page').html('数据缺失！')
    // }
};

/**
 * 深度剖析-热点关联词-数据渲染 (json数据无需处理直接使用)
 * @param HotRelatedWordsData
 * @param rangeId
 */
HotAnal.prototype.renderHotRelatedWordsData = function (HotRelatedWordsData, rangeId) {
    // console.log(HotRelatedWordsData);
    // var hotRelate = echarts.init(document.getElementById('hotRelate'));
    if (HotRelatedWordsData.length !== 0) {
        $(rangeId).css('visibility', 'visible');
        var range = $(rangeId).find('.range-box');
        var slider = $(rangeId).find('.range-slider');
        var msg = $(rangeId).find('.range-mea');
        var tip = $(rangeId).find('.range-tip');
        tip.html(HotRelatedWordsData[0][0][0]);
        var html = '';
        var num = HotRelatedWordsData[0][0].length; // 选择项数量
        var item_width = 30; // 每项的宽度
        var width = num * item_width + num * 4; // 计算总长(+ margin)
        var slider_width = 12; // 滑块宽度
        var tip_width = 50; // 提示框宽度
        var item = 0; // 开始项
        var begin = item * width / num + width / num / 2 - slider_width / 2;
        var tip_b = item * width / num + width / num / 2 - tip_width / 2;
        for (var i = 0; i < num; i++) {
            html += '<span class="' + ((i === 0) ? 'range-active' : '') + '" rel="' + i + '" time="' + HotRelatedWordsData[0][0][i] + '" style="width:' + item_width + 'px;"></span>'
        }
        msg.html(html);
        range.css('width', width + 'px');
        slider.animate({left: begin + 'px'}, 200);
        tip.animate({left: tip_b + 'px'}, 200);
        renderChartsData(item);
        $(rangeId).find('.range-mea span').on('click', function () {
            $(this).addClass('range-active').siblings().removeClass('range-active');
            var txt = $(this).attr('time');
            tip.html(txt);
            var new_item = $(this).attr('rel') * 1;
            if (new_item !== item) {
                item = new_item;
                begin = item * width / num + width / num / 2 - slider_width / 2;
                tip_b = item * width / num + width / num / 2 - tip_width / 2;
                slider.animate({left: begin + 'px'}, 200);
                tip.animate({left: tip_b + 'px'}, 200);
                renderChartsData(item)
            }
        });

        function renderChartsData(item) {
            var datalist = HotRelatedWordsData[item + 1][1];

            var bg = {
                name: '相关背景',
                type: 'pie',
                avoidLabelOverlap: false,
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [{
                    value: 1
                }],
                animation: false
            };

            var dot = {
                name: '强相关',
                type: 'scatter',
                xAxisIndex: 0,
                yAxisIndex: 0,
                symbol: 'circle',
                symbolSize: 40,
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            color: '#555'
                        },
                        position: 'bottom',
                        formatter: function (param) {
                            return param.data[2];
                        }
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontWeight: 'bold',
                            fontSize: 16,
                            color: '#CF000F'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#9bca63'
                    }
                },
                data: []
            };

            var dataMap = datalist.map(function (item) {
                return Object.assign({}, dot, {
                    name: '弱相关',
                    symbolSize: item[3],
                    itemStyle: {
                        normal: {
                            color: item[4] === 1 ? '#FA7C62' : '#20B78E'
                        }
                    },
                    data: [
                        item
                    ]
                })
            });

            function _toConsumableArray(arr) {
                if (Array.isArray(arr)) {
                    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                        arr2[i] = arr[i];
                    }
                    return arr2;
                } else {
                    return Array.from(arr);
                }
            }

            var hotRelata_option = {
                backgroundColor: '#f5f5f5',
                title: {
                    text: '',
                    x: '35%',
                    y: 0
                },
                xAxis: [{
                    gridIndex: 0,
                    type: 'value',
                    show: false,
                    min: 0,
                    max: 100,
                    nameLocation: 'middle',
                    nameGap: 30


                }],
                yAxis: [{
                    gridIndex: 0,
                    min: 0,
                    show: false,
                    max: 100,
                    nameLocation: 'middle',
                    nameGap: 30
                }],
                series: [].concat(_toConsumableArray(dataMap), [{
                    name: '弱相关',
                    type: 'scatter',
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    symbol: 'circle',
                    symbolSize: 70,
                    label: {
                        normal: {
                            show: true,
                            textStyle: {
                                fontWeight: 'bold',
                                fontSize: 10,
                                color: '#000'
                            },
                            formatter: function (param) {
                                return param.data[2];
                            }
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontWeight: 'bold',
                                fontSize: 16,
                                color: '#CF000F'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#8570b0'
                        }
                    },
                    data: [HotRelatedWordsData[item + 1][0]]
                },
                    Object.assign({}, bg, {
                        radius: ['0%', '50%'],
                        itemStyle: {
                            normal: {
                                color: '#DAE1F4'
                            },
                            emphasis: {
                                color: '#DAE1F4'
                            }
                        }
                    }),
                    Object.assign({}, bg, {
                        radius: ['50%', '100%'],
                        itemStyle: {
                            normal: {
                                color: '#E2E8F6'
                            },
                            emphasis: {
                                color: '#E2E8F6'
                            }
                        }
                    }),
                    Object.assign({}, bg, {
                        radius: ['100%', '200%'],
                        itemStyle: {
                            normal: {
                                color: '#F0F3FC'
                            },
                            emphasis: {
                                color: '#F0F3FC'
                            }
                        }
                    })])
            };
            // console.log(hotRelata_option);
            hotRelate.setOption(hotRelata_option)
        }
    }
};

/**
 * 深度剖析-热点词趋势-数据渲染 (json数据无需处理直接使用)
 * @param HotWordsTrendData
 */
HotAnal.prototype.renderHotWordsTrendData = function (HotWordsTrendData) {
    // console.log(HotWordsTrendData);
    // var hotWords = echarts.init(document.getElementById('hotWords'));
    var hotWords_option = {
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: HotWordsTrendData[0]
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: HotWordsTrendData[1]
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: HotWordsTrendData[0][0],
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                // stack: '总量',
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(137, 189, 27, 0.3)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(137, 189, 27, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'rgb(137,189,27)',
                        borderColor: 'rgba(137,189,2,0.27)',
                        borderWidth: 12

                    }
                },
                data: HotWordsTrendData[2][0]
            },
            {
                name: HotWordsTrendData[0][1],
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                // stack: '总量',
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(0, 136, 212, 0.3)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(0, 136, 212, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'rgb(0,136,212)',
                        borderColor: 'rgba(0,136,212,0.2)',
                        borderWidth: 12

                    }
                },
                data: HotWordsTrendData[2][1]
            },
            {
                name: HotWordsTrendData[0][2],
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                // stack: '总量',
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(204,120,50, 0.3)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(204,120,50, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {

                        color: 'rgb(204,120,50)',
                        borderColor: 'rgba(204,120,50,0.2)',
                        borderWidth: 12
                    }
                },
                data: HotWordsTrendData[2][2]
            },
            {
                name: HotWordsTrendData[0][3],
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                // stack: '总量',
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(150,135,190, 0.3)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(150,135,190, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {

                        color: 'rgb(150,135,190)',
                        borderColor: 'rgba(150,135,190,0.2)',
                        borderWidth: 12
                    }
                },
                data: HotWordsTrendData[2][3]
            },
            {
                name: HotWordsTrendData[0][4],
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                // stack: '总量',
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(219, 50, 51, 0.3)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(219, 50, 51, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {

                        color: 'rgb(219,50,51)',
                        borderColor: 'rgba(219,50,51,0.2)',
                        borderWidth: 12
                    }
                },
                data: HotWordsTrendData[2][3]
            }
        ]
    };
    hotWords.setOption(hotWords_option)
};

/**
 * 深度剖析-热点话题分布-China-数据渲染 (json数据无需处理直接使用)
 * @param HotTopicDisData
 */
HotAnal.prototype.renderHotTopicDisData = function (HotTopicDisData) {
    // console.log(HotTopicDisData);
    var max = (HotTopicDisData[0][1].length === 0) ? 200 : HotTopicDisData[0][1][0].value;
    // console.log(max);
    // var chinaMap = echarts.init(document.getElementById('chinaMap'));
    var chinaMap_option = {
        title: {
            show: false,
            text: '热点话题分布',
            subtext: '',
            sublink: '',
            left: 'center',
            top: 'top'
        },
        grid: {
            right: '3%'
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
        toolbox: {
            show: false,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                dataView: {readOnly: false},
                restore: {},
                saveAsImage: {}
            }
        },
        visualMap: {
            min: 0,
            max: max,
            text: ['High', 'Low'],
            realtime: false,
            calculable: true,
            inRange: {
                color: ['lightskyblue', 'yellow', 'orangered']
            }
        },
        series: [
            {
                name: '话题热度',
                type: 'map',
                mapType: 'china',
                zoom: 1.15,
                label: {
                    emphasis: {
                        show: false
                    }
                },
                // roam: true,
                // silent: true,
                itemStyle: {
                    emphasis: {label: {show: true}}
                },
                data: HotTopicDisData[0][1]
            }
        ]
    };
    chinaMap.setOption(chinaMap_option);
    var pro_html = '';
    var city_html = '';
    var p_b = $('#pro_box');
    var c_b = $('#city_box');
    if (HotTopicDisData[0][1].length !== 0) {
        var pro_max = HotTopicDisData[0][1][0].value * 1;
        var city_max = HotTopicDisData[1][1][0].value * 1;
        var len = (HotTopicDisData[0][1].length >= 10) ? 10 : HotTopicDisData[0][1].length;
        var _len = (HotTopicDisData[1][1].length >= 10) ? 10 : HotTopicDisData[1][1].length;
        for (var i = 0; i < len; i++) {
            pro_html += '<tr><td>' + (i + 1) + '</td><td>' + HotTopicDisData[0][1][i].name + '</td><td><div class="progress_bar_blue" title="' + HotTopicDisData[0][1][i].value + '"></div></td></tr>'
        }
        for (var j = 0; j < _len; j++) {
            city_html += '<tr><td>' + (j + 1) + '</td><td>' + HotTopicDisData[1][1][j].name + '</td><td><div class="progress_bar_blue" title="' + HotTopicDisData[1][1][j].value + '"></div></td></tr>'
        }
    }
    p_b.html(pro_html);
    c_b.html(city_html);

    // 事件
    $('.click-tab li').click(function () {
        $(this).addClass('current').siblings().removeClass('current');
        var index = $(this).attr('rel') * 1;
        var this_table = $('.region_table')[index];
        $(this_table).removeClass('v-h').siblings().addClass('v-h')
    });
    p_b.ready(function (e) {
        p_b.find(".progress_bar_blue").each(function (index, element) {
            var percent = $(this).attr("title");
            $(this).css("width", (percent * 1 / pro_max * 100).toFixed(0) + '%');
        });
    });
    c_b.ready(function (e) {
        c_b.find(".progress_bar_blue").each(function (index, element) {
            var percent = $(this).attr("title");
            $(this).css("width", (percent * 1 / city_max * 100).toFixed(0) + '%');
        });
    });
};

/**
 * 深度剖析-热点话题分布-World-数据渲染 (json数据无需处理直接使用)
 * @param HotTopicDisWorldData
 */
HotAnal.prototype.renderHotTopicDisWorldData = function (HotTopicDisWorldData) {
    // console.log(HotTopicDisWorldData);
    var data = this.sort(HotTopicDisWorldData[1]);
    // console.log(data);
    var max = (data.length === 0) ? 200 : data[0].value;
    // var worldMap = echarts.init(document.getElementById('worldMap'));
    var worldMap_option = {
        title: {
            show: false,
            text: '热点话题分布',
            subtext: '',
            sublink: '',
            left: 'center',
            top: 'top'
        },
        grid: {
            right: '3%'
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
        toolbox: {
            show: false,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                dataView: {readOnly: false},
                restore: {},
                saveAsImage: {}
            }
        },
        visualMap: {
            min: 0,
            max: max,
            text: ['High', 'Low'],
            realtime: false,
            calculable: true,
            inRange: {
                color: ['lightskyblue', 'yellow', 'orangered']
            }
        },
        series: [
            {
                name: '话题热度',
                type: 'map',
                mapType: 'world',
                zoom: 1.15,
                label: {
                    emphasis: {
                        show: false
                    }
                },
                // roam: true,
                // silent: true,
                itemStyle: {
                    emphasis: {label: {show: true}}
                },
                data: data
            }
        ]
    };
    worldMap.setOption(worldMap_option);
    var world_pro_html = '';
    var w_p_b = $('#world_pro_box');
    if (data.length !== 0) {
        var world_pro_max = data[0].value * 1;
        var len = (data.length >= 10) ? 10 : data.length;
        for (var i = 0; i < len; i++) {
            world_pro_html += '<tr><td>' + (i + 1) + '</td><td>' + data[i].name + '</td><td><div class="progress_bar_blue" title="' + data[i].value + '"></div></td></tr>'
        }
    }
    w_p_b.html(world_pro_html);
    // 事件
    w_p_b.ready(function (e) {
        w_p_b.find(".progress_bar_blue").each(function (index, element) {
            var percent = $(this).attr("title");
            $(this).css("width", (percent * 1 / world_pro_max * 100).toFixed(0) + '%');
        });
    });
};


/**********************数据处理************************/

/**
 * 热点聚焦-数据处理
 * @param HotNewsData
 * @returns {[*,*]}
 * @private
 */
HotAnal.prototype._resolveHotNewsData = function (HotNewsData) {
    // console.log(HotNewsData);
    var len = HotNewsData[0].length;
    var html = '';
    for (var i = 0; i < len; i++) {
        html += '<li><a href="' + HotNewsData[2][i] + '" class="linktit" target="_blank"><span class="number">' + HotNewsData[0][i] + '</span><span class="hot-news-title">' + HotNewsData[1][i] + '</span><span class="time fr">' + HotNewsData[3][i] + '</span></a></li>'
    }
    return [html, len]
};

/**
 * 热点词云-数据处理
 * @param HotWordsCloudData
 * @private
 */
HotAnal.prototype._resolveHotWordsCloudData = function (HotWordsCloudData) {
    // console.log(HotWordsCloudData);
    var self = this;
    var max_font = 50;
    var min_font = 28;
    var max = HotWordsCloudData[1][0].value;
    var min = HotWordsCloudData[1][HotWordsCloudData.length - 1].value;
    var html = '';
    var len = HotWordsCloudData[1].length;
    var col_arr = self.gradientColor('#e51b24', '#2b99ff', len);
    for (var i = 0; i < len; i++) {
        html += '<a style="font-size:' + self.fz(max_font, min_font, max, min, HotWordsCloudData[1][i].value) + 'px;color:' + col_arr[i] + ';">' + HotWordsCloudData[1][i].name + '</a>'
    }
    return html
};

/**
 * 话题热度分布-数据处理
 * @param TopicDisData
 * @private
 */
HotAnal.prototype._resolveTopicDisData = function (TopicDisData) {
    // console.log(TopicDisData);
    topic_id = TopicDisData[2][0]; // 页面加载时第一次赋值
    var len = TopicDisData[0].length;
    var max_width = 330; // 柱状进度条总长度(表示其热度的数据在0~1之间)
    var html = '';
    for (var i = 0; i < len; i++) {
        html += '<li class="' + ((i === 0) ? 'active' : '') + '"><a href="javascript: void(0);" class="linktit" rel="' + TopicDisData[2][i] + '"><span class="number">' + (i + 1) + '</span><span>' + TopicDisData[0][i] + '</span><span class="time fr"><svg width="330" height="16"><rect width="' + (max_width * TopicDisData[1][i]) + '" height="16" fill="url(#graCol)"></rect></svg></span></a></li>'
    }
    return [html, topic_id]
};


/**********************绑定事件************************/

/**
 * 热点聚焦-绑定事件
 * @param len (新闻条数小于6条时不自动滚动，上下按钮隐藏)
 */
HotAnal.prototype.bindEventForHotNews = function (len) {
    // 滚动
    var h_b = $('#HotNews_box');
    if (len > 6) {
        // 新闻滚动效果
        var top = 0;
        var viewNum = 6;
        var step = len;
        var one_dis = 68;
        var _btnUp = $('#but_up');
        var _btnDown = $('#but_down');
        h_b.animate({top: '0'}, 300);
        _btnUp.css('cursor', 'pointer').click(function () {
            if (top < (step - viewNum) * one_dis) {
                top += one_dis;
                h_b.stop().animate({top: '-' + top + 'px'}, 200)
            } else {
                top = (step - viewNum) * one_dis
            }
            // console.log(top);
        });
        _btnDown.css('cursor', 'pointer').click(function () {
            if (top > 0) {
                top -= one_dis;
                h_b.stop().animate({top: '-' + top + 'px'}, 200)
            } else {
                top = 0
            }
            // console.log(top);
        });
    } else {
        $('.scroltit').hide()
    }
};

/**
 * 话题热度分布-绑定事件
 */
HotAnal.prototype.bindEventForTopicDis = function () {
    var self = this;
    $('.linktit').off().on('click', function () {
        $(this).parents('li').addClass('active').siblings().removeClass('active');
        var new_topic_id = this.rel;
        if (new_topic_id !== topic_id) {
            topic_id = new_topic_id;
            // console.log(topic_id);
            // `topic_id` 值变化时执行深度剖析内数据刷新
            self.fetchTopicData(typeId, topic_id);
            self.fetchHotRelatedWordsData(typeId, topic_id);
            self.fetchHotWordsTrendData(typeId, topic_id);
            self.fetchHotTopicDisData(typeId, topic_id);
        }
    })
};


/**********************其它函数************************/

/**
 * 生成颜色区间(热点词云颜色权重函数)
 * @param startColor
 * @param endColor
 * @param step
 * @returns {Array}
 */
HotAnal.prototype.gradientColor = function (startColor, endColor, step) {
    var startRGB = this.colorRgb(startColor);//转换为rgb数组模式
    var startR = startRGB[0];
    var startG = startRGB[1];
    var startB = startRGB[2];

    var endRGB = this.colorRgb(endColor);
    var endR = endRGB[0];
    var endG = endRGB[1];
    var endB = endRGB[2];

    var sR = (endR - startR) / step;//总差值
    var sG = (endG - startG) / step;
    var sB = (endB - startB) / step;

    var colorArr = [];
    for (var i = 0; i < step; i++) {
        //计算每一步的hex值
        var hex = this.colorHex('rgb(' + parseInt((sR * i + startR)) + ',' + parseInt((sG * i + startG)) + ',' + parseInt((sB * i + startB)) + ')');
        colorArr.push(hex);
    }
    return colorArr;
};

/**
 * 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
 * @param sColor
 * @returns {*}
 */
HotAnal.prototype.colorRgb = function (sColor) {
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    sColor = sColor.toLowerCase();
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = "#";
            for (var i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];
        for (var j = 1; j < 7; j += 2) {
            sColorChange.push(parseInt("0x" + sColor.slice(j, j + 2)));
        }
        return sColorChange;
    } else {
        return sColor;
    }
};

/**
 * 将rgb表示方式转换为hex表示方式
 * @param rgb
 * @returns {*}
 */
HotAnal.prototype.colorHex = function (rgb) {
    var _this = rgb;
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (/^(rgb|RGB)/.test(_this)) {
        var aColor = _this.replace(/(?:(|)|rgb|RGB)*/g, "").split(",");
        var strHex = "#";
        for (var i = 0; i < aColor.length; i++) {
            var hex = Number(aColor[i]).toString(16);
            hex = hex < 10 ? 0 + '' + hex : hex;// 保证每个rgb的值为2位
            if (hex === "0") {
                hex += hex;
            }
            strHex += hex;
        }
        if (strHex.length !== 7) {
            strHex = _this;
        }
        return strHex;
    } else if (reg.test(_this)) {
        var aNum = _this.replace(/#/, "").split("");
        if (aNum.length === 6) {
            return _this;
        } else if (aNum.length === 3) {
            var numHex = "#";
            for (var j = 0; j < aNum.length; j += 1) {
                numHex += (aNum[j] + aNum[j])
            }
            return numHex;
        }
    } else {
        return _this;
    }
};

/**
 * 计算字体相对大小(热点词云控制字体大小函数)
 * @param max_font - 自定义最大的字体大小
 * @param min_font - 自定义最小的字体大小
 * @param max - 数据最大权值
 * @param min - 数据最小权值
 * @param num - 词的数量
 * @returns {string} - 返回换算后的字体大小
 */
HotAnal.prototype.fz = function (max_font, min_font, max, min, num) {
    return ((max_font * (num - min) + min_font * (max - num)) / (max - min)).toFixed(0)
};

/**
 * 排序算法
 * @param data
 * @returns {*}
 */
HotAnal.prototype.sort = function (data) {
    var arr = data;
    var i = arr.length - 1;  //初始时,最后位置保持不变
    while (i > 0) {
        var pos = 0; //每趟开始时,无记录交换
        for (var j = 0; j < i; j++)
            if ((arr[j].value * 1) < (arr[j + 1].value * 1)) {
                pos = j; //记录交换的位置
                var tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        i = pos; //为下一趟排序作准备
    }
    return arr;
};

/**
 * ajax请求失败输出 msg
 * @param msg
 * @private
 */
HotAnal.prototype._fetchDataFailed = function (msg) {
    console.log(msg);
};

// 运行
HotAnal.prototype.__init();































