<template>
  <q-page>
    <div class="overflow_hidden line_height_30 border_bottom_primary padding_10">
      <img class="width_80 float_left" src="~assets/logo.png" />
      <span class="float_right font_oblique font_size_14">{{$t('label_dashboard_title')}}</span>
    </div>
    <div id="bar_chart" class="left_chart float_left"></div>
    <div id="pie_chart" class="right_pie float_left"></div>
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
          title: {text: 'Current Day Sales'},
          tooltip: {},
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
            type: 'value',
            axisLabel:{
              formatter:'{value}(万)'
            },
            position: 'top'
          },
          grid: {
            left: '3%',
            right: '14%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
              type: 'category',
              data: this.todaySales.shops,
              inverse:true
            },
            series: [{
              data: this.todaySales.amts,
              name: 'Sales Amount',
              type: 'bar',
              markLine : {
                data: [
                  {type: 'average', name: 'average'}
                ]
              },
              markPoint : {
                data : [
                  {type : 'max', name: 'max value'},
                  {type : 'min', name: 'min value'}
                ]
              }
            }]
          });

      },

      drawPie(){
        // 基于准备好的dom，初始化echarts实例
        let pieChart = echarts.init(document.getElementById('pie_chart'))
        // 绘制图表
        pieChart.setOption({

          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          series: [
            {
              type: 'pie',
              radius: '60%',
              center: ['50%', '50%'],
              data: this.pieData.sort(function (a, b) { return a.value - b.value; }),
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
      //找寻对应的数据
      this.$store.dispatch("dashBord/getDaySalesDataByShop").then(()=>{
        for(var i=0; i<this.todaySales.shops.length; i++){
          this.pieData.push({
            value: this.todaySales.amts[i],
            name: this.todaySales.shops[i]
          });
        }
        this.drawLine();
        this.drawPie();
      }).catch(()=>{});
      
    },
    watch: {
    },
    computed: {
      ...mapState({
        todaySales: state => state.dashBord.todaySales,
      }),
    }
  }
</script>

<style scoped>
</style>
