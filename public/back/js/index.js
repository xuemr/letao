$(function () {

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('lt_line'));

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '2018年注册人数'
        },
        tooltip: {},
        legend: {
            data: ['人数','销量']
        },
        xAxis: {
            data: ["1月","2月","3月","4月","5月","6月"]
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
            
        },{
            name: '销量',
            type: 'bar',
            data: [15, 22, 36, 15, 20, 27]
            
        }]
      
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
})

$(function () {
    var myChart = echarts.init(document.getElementById('lt_cirl'));
    option = {
        title: {
            text: '某站点用户访问来源',
            subtext: '纯属虚构',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    { value: 335, name: '直接访问' },
                    { value: 310, name: '邮件营销' },
                    { value: 234, name: '联盟广告' },
                    { value: 135, name: '视频广告' },
                    { value: 1548, name: '搜索引擎' }
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    myChart.setOption(option);
})