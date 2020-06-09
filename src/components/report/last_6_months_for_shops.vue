<template>
  <q-page>
    <div class="overflow_hidden line_height_30 border_bottom_primary padding_10">
      <img class="width_80 float_left" src="~assets/logo.png" />
      <span class="float_right font_oblique font_size_14">{{$t('label_dashboard_title')}}</span>
    </div>
    <div id="bar_chart" class="left_chart float_left"></div>
    <div id="pie_chart"  class="right_pie float_left ">
      <div id="pie_chart0" class="height_400 width_100_p float_left "></div>
      <div id="pie_chart1" class="height_400 width_100_p float_left "></div>
      <div id="pie_chart2" class="height_400 width_100_p float_left "></div>
      <div id="pie_chart3" class="height_400 width_100_p float_left "></div>
      <div id="pie_chart4" class="height_400 width_100_p float_left "></div>
      <div id="pie_chart5" class="height_400 width_100_p float_left "></div>
    </div>
    <div
      class="height_10_p position_absolute width_100_p min_height_60 bottom_0 left_0 vertical_evenly primary_color bg_white"
      style="border-top: 2px solid #ADDC7C"
    >
      <div style="font-size:30px" class="iconfont icon-guolv"></div>
      <div @click="goBack" style="font-size:30px" class="iconfont icon-huitui"></div>
    </div>
  </q-page>
</template>

<script>
import echarts from 'echarts'
import { mapState} from "vuex";


  export default {
    data () {
      return {
        pieData:[]
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      drawLine(){

        // 基于准备好的dom，初始化echarts实例
        let barChart = echarts.init(document.getElementById('bar_chart'))
        // 绘制图表
        barChart.setOption({
          title: {text: 'MoM in the past 6 Months'},
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '3%',
            right: '14%',
            bottom: '3%',
            top:'20%',
            containLabel: true
          },
          legend: {
            top:30,
            x:'center',
            y:'top',
            data:this.last6MonthsData.legendData
          },
          toolbox: {
            x:'right',
            y:'top',
            show : true,
            feature : {
              dataView : {show: true, readOnly: false},
              magicType : {show: true, type: ['line', 'bar']},
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          yAxis: {
             axisLabel:{
              formatter:'{value}(万)'
            },
            position: 'top'
          },
          xAxis: {
            data: this.last6MonthsData.xAxisData,
            // inverse:true
          },
          series: this.last6MonthsData.seriesData
        });

      },

      drawPie(subPieData, index){
        // 基于准备好的dom，初始化echarts实例
        let pieChart = pieChart = echarts.init(document.getElementById('pie_chart' + index));

        // 绘制图表
        pieChart.setOption({
          title: {
            text:subPieData.title,
            left: 'center',
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          series: [
            {
              type: 'pie',
              radius: '60%',
              center: ['50%', '50%'],
              data: subPieData.data.sort(function (a, b) { return a.value - b.value; }),
              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function (idx) {
                return Math.random() * 200;
              }
            }
          ]
        })

      }

    },
    mounted() {
      this.$store.dispatch("dashBord/getLast6MonthsSalesData").then(()=>{
        for(var i=0; i<this.last6MonthsData.xAxisData.length; i++){
          var subPieData = [];
          for(var j=0; j<this.last6MonthsData.seriesData.length; j++){
            subPieData.push({
              value: this.last6MonthsData.seriesData[j].data[i],
              name: this.last6MonthsData.seriesData[j].name
            });
          }
          this.pieData.push(
            {
              title:this.last6MonthsData.xAxisData[i],
              data:subPieData
            }
          );
        }
        this.drawLine();
        for(var i=0; i<this.pieData.length; i++){
          this.drawPie(this.pieData[i],i);
        }
      }).catch(()=>{});
    },
    watch: {
    },
    computed: {
      ...mapState({
        last6MonthsData: state => state.dashBord.last6MonthsData,
      }),
    }
  }
</script>

<style scoped>
</style>
