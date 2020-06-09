<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-page>
    <div class="overflow_hidden line_height_30 border_bottom_primary padding_10">
      <img class="width_80 float_left" src="~assets/logo.png" />
      <span class="float_right font_oblique font_size_14">{{$t('label_dashboard_title')}}</span>
    </div>
  
    <div class="q-pa-md ">
      <div class="q-gutter-y-md column float_left" style="max-width: 300px">
        <q-datetime
                class="padding_bottom_0 position_static border_bottom_primary width_120"
                v-model="itemCatSubCatFilter.startDate"
                format="YYYY-MM-DD"
                type="date"
                placeholder="startDate"
                align="right"
        />
      </div>
  
      <div class="q-gutter-y-md column float_left margin_left_20" style="max-width: 300px">
        <q-datetime
                class="padding_bottom_0 position_static border_bottom_primary width_120"
                v-model="itemCatSubCatFilter.endDate"
                format="YYYY-MM-DD"
                placeholder="endDate"
                :min="itemCatSubCatFilter.startDate"
                type="date"
                align="right"
        />
      </div>
  
  
      <div class="q-gutter-y-md column float_left margin_left_20  " style="max-width: 300px">
        <q-select v-model="itemCatSubCatFilter.whCode" class="width_120 padding_bottom_0 " :options="options" label="options"/>
      </div>
  
  
      <div class="q-gutter-y-md column float_left margin_left_20" style="max-width: 300px">
        <q-btn color="black" class="bg-primary" flat label="Search" @click="searchItemCatSalesData()"/>
      </div>
    </div>
    
  
    <div class="height_70_p bg_yellow  margin_top_20 bg_yellow">
      <div id="bar_chart"  class="left_chart float_left"></div>
      <div id="pie_chart" class="right_pie float_left "></div>
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
  import { date } from 'quasar'
  
  
  export default {
    data () {
      return {
        piaDataLocal:[],
        itemCatSubCatFilter:{
          startDate:'',
          endDate:'',
          whCode:'',
        },
        options:[
        ]
      }
    },
    methods: {
      searchItemCatSalesData(){
        this.itemCatSubCatFilter.startDate = date.formatDate(this.itemCatSubCatFilter.startDate, 'YYYY-MM-DD');
        this.$store.dispatch("dashBord/getItemCatSalesData", this.itemCatSubCatFilter).then(()=>{
          this.drawLine(this.$store, this);
        }).catch(()=>{});
      },
      
      closeDialog(ref){
        this.$refs[ref].hide()
      },
      
      goBack() {
        this.$router.go(-1);
      },
  
      drawLine($state){
        
        // 基于准备好的dom，初始化echarts实例
        let barChart = echarts.init(document.getElementById('bar_chart'))
        // 绘制图表
        barChart.setOption({
          title: {text: 'ItemCat Sales Amount'},
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
            data:this.ItemCatSalesData.legendData
          },
          toolbox: {
            x:'right',
            y:'top',
            show : true,
            feature : {
              dataView : {show: true, readOnly: false},
              magicType : {show: true, type: [ 'bar','line']},
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
            data: this.ItemCatSalesData.xAxisData,
          },
          series: this.ItemCatSalesData.seriesData
        });
        
        barChart.on('click', function (param) {
          let that = this;
          $state.dispatch("dashBord/getItemSubCatSalesData",{'startDate':$state.state.dashBord.itemCatSalesFilter.startDate,'endDate':$state.state.dashBord.itemCatSalesFilter.endDate,'whCode':param.seriesName,'itemCat':param.name}).then(()=>{
            // 基于准备好的dom，初始化echarts实例
            let pieChart = pieChart = echarts.init(document.getElementById('pie_chart'));
            // 绘制图表
            pieChart.setOption({
              title: {
                text:"Item cat ["+ param.name +"] pia",
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
                  data: $state.state.dashBord.itemSubCatSalesData,
                  animationType: 'scale',
                  animationEasing: 'elasticOut',
                  animationDelay: function (idx) {
                    return Math.random() * 200;
                  }
                }
              ]
            })
          }).catch(()=>{});
        });
      },
      
      // drawPie(){
      //
      //
      // }
      
    },
    mounted() {
      //准备好 whCode 范围值
      this.options = [];
      for(let i=0; i<this.shops.length; i++){
        this.options.push({label:this.shops[i],value:this.shops[i]})
      }
      this.options.unshift({label:'',value:''});
      console.log("this.options", this.options)
      
      //首先把startDate, endDate填写好
      let nowDate = Date.now();
      this.itemCatSubCatFilter.endDate = date.formatDate(nowDate, 'YYYY-MM-DD');
      this.itemCatSubCatFilter.startDate = date.formatDate(date.startOfDate(nowDate, 'month'),'YYYY-MM-DD');
      
      this.$store.dispatch("dashBord/getItemCatSalesData", this.itemCatSubCatFilter).then(()=>{
        this.drawLine(this.$store, this);
      }).catch(()=>{});
    },
    watch: {
    },
    computed: {
      ...mapState({
        ItemCatSalesData: state => state.dashBord.ItemCatSalesData,
        piaData:state => state.dashBord.itemSubCatSalesData,
        shops:state => state.dashBord.todaySales.shops,
      }),
    }
  }
</script>

<style  scoped>
</style>
