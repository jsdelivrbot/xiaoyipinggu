<template>
  <div class="subject">
    <!-- 左侧选项分析 -->
    <div class="subject_left">
        <div class="subject_left_title">
          <input type="checkbox" id="id1">
          <label for="id1">
            第一题：您对此次气象服务工作的总体评价
          </label>
        </div>
        <ul class="subject_left_answer">
            <li>A 满意：5/15 &nbsp;&nbsp;33.33%</li>
            <li>B 比较满意：4/15 &nbsp;&nbsp;26.67%</li>
            <li>C 一般：3/15 &nbsp;&nbsp;33.20%</li>
            <li>D 不满意：2/15 &nbsp;&nbsp;13.33%</li>
            <li>E 说不清：1/15 &nbsp;&nbsp;6.67%</li>
        </ul>
    </div>
    <div class="subject_right">
      <ul class="subject_right_ul">
          <li v-for="(item,index) in echarts" :class='{active:index==active}' @click="cutEcharts(index)">
            {{item.name}}
          </li>
      </ul>
      <div id="echarts1" style="height: 255px;width: 600px;"></div>
    </div>
  </div>
</template>
<style>
.subject{
    background: #fff;
    padding: 10px 20px;
    border: 1px solid #BBBBBB;
    margin-bottom: 8px;
}
.subject_left{
    width: 45%;
}
.subject_left_title{
    padding: 10px 0;
    color: #1975b6;
}
.subject_left_title label {
    cursor: pointer;
}
.subject_left_answer{
    margin-left: 20px;
}
.subject_left_answer li{
    line-height: 50px;
}
.subject_left,.subject_right{
    display: inline-block;
    vertical-align: top;
}
.subject_right_ul{
    display: block;
    width: 300px;
    margin: 0 auto;
}
.subject_right_ul:after{
    content: '';
    display: block;
    clear: both;
}
.subject_right_ul li{
    float: left;
    border: 1px solid #63B4EC;
    border-radius: 3px;
    padding: 3px 10px;
    cursor: pointer;
}
.subject_right_ul li.active {
  border: none;
  background: #63B4EC;
  color: #fff;
}
.echarts{
    border: 1px solid #ddd;
    margin-top: 30px;
}
</style>
<script>
export default {
  data(){
    return {
      echarts: [
        {name: '饼状图'},
        {name: '圆环图'},
        {name: '柱状图'},
        {name: '条形图'}
      ],
      active: 0
    }
  },
  mounted(){
     this.dropEchartsBing('echarts1');
  },
  methods: {
    dropEchartsBing(dom){
      var myChart = this.$echarts.init(document.getElementById(dom));
      myChart.clear();
      myChart.setOption({
        color:['#4A6CB6','#1480FE','#FF524E','#4CD2EF','#4DB8EC'],
        series : [{
            type: 'pie',
            data:[
                {value:33.33,name: '满意(33.33%)'},
                {value:26.67,name: '比较满意(26.67%)'},
                {value:20,name: '一般(20%)'},
                {value:13.33,name: '不满意(13.33%)'},
                {value:6.67,name: '说不清(6.67%)'}
            ]
        }]
      })
    },
    dropEchartsYuan(dom){
       var myChart = this.$echarts.init(document.getElementById(dom));
       myChart.clear();
       myChart.setOption({
          color:['#4A6CB6','#1480FE','#FF524E','#4CD2EF','#4DB8EC'],
          series : [{
              type: 'pie',
              radius: ['50%', '70%'],
              data:[
                  {value:33.33,name: '满意(33.33%)'},
                  {value:26.67,name: '比较满意(26.67%)'},
                  {value:20,name: '一般(20%)'},
                  {value:13.33,name: '不满意(13.33%)'},
                  {value:6.67,name: '说不清(6.67%)'}
              ]
          }]
       })
    },
    dropEchartsZhu(dom){
      var myChart = this.$echarts.init(document.getElementById(dom));
      myChart.clear();
      myChart.setOption({
        xAxis : [{
              type : 'category',
              data : ['满意', '比较满意', '一般', '不满意', '数不清'],
          }],
          yAxis : [{
                  type : 'value'
          }],
          series : [{
              type: 'bar',
              data:[33.33,26.67,20,13.33,6.67],
              barWidth : 30,
              itemStyle: {
                  normal:{
                      color: function (params){
                          var colorList = ['#4A6CB6','#1480FE','#FF524E','#4CD2EF','#4DB8EC'];
                          return colorList[params.dataIndex];
                      }
                  }
              },
          }]
      })
    },
    dropEchartsTiao(dom){
      var myChart = this.$echarts.init(document.getElementById(dom));
      myChart.clear();
      myChart.setOption({
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data : ['满意', '比较满意', '一般', '不满意', '数不清'],
        },
        series: [{
            type: 'bar',
            data:[33.33,26.67,20,13.33,6.67],
            itemStyle: {
                normal:{
                    color: function (params){
                        var colorList = ['#4A6CB6','#1480FE','#FF524E','#4CD2EF','#4DB8EC'];
                        return colorList[params.dataIndex];
                    }
                }
            },
        }]
      })
    },
    cutEcharts(index) {
       if(index == 0){
         this.dropEchartsBing('echarts1');
       }
       if(index == 1){
         this.dropEchartsYuan('echarts1');
       }
       if(index == 2){
         this.dropEchartsZhu('echarts1');
       }
       if(index == 3){
         this.dropEchartsTiao('echarts1');
       }
       this.active = index
    }
  }
}
</script>


