<template>
  <q-page>
    <div class="overflow_hidden height_10_p line_height_30 border_bottom_primary padding_10">
      <img class="width_80 float_left" src="~assets/logo.png" />
      <span class="float_right font_oblique font_size_14">{{$t('label_dashboard_title')}}</span>
    </div>
    <div
      class="dashboard width_100_p  text_align_center ">
    
      <q-card class="card" @click.native="gotoShopsDaysales()">
        <q-card-title>Sales Today</q-card-title>
        <q-card-separator />
        <q-card-main>{{dashBord.todaySalesAmt}}</q-card-main>
      </q-card>

      <q-card class="card">
        <q-card-title>Sales Count Today：{{dashBord.todaySalesCount}}</q-card-title>
        <q-card-separator />
        <q-card-main>Average：{{dashBord.todayAmtPerOrder}}</q-card-main>
      </q-card>

      <q-card class="card">
        <q-card-title>Year Sales Target</q-card-title>
        <q-card-separator />
        <q-card-main>
          {{dashBord.yearTarget.amtCurYear}}
          <br />
          <div style="line-height: 30px;">
            ({{dashBord.yearTarget.rate}}%)
            <br />
            <span class="font_color_pos_mobile_grey">{{dashBord.yearTarget.amtCurYear}} / {{dashBord.yearTarget.amtLastYear}}</span>
          </div>
        </q-card-main>
      </q-card>

      <q-card class="card" @click.native="gotoCurMonths()">
        <q-card-title>Current Month To Now</q-card-title>
        <q-card-separator />
        <q-card-main>
          {{dashBord.curMonthToNow.amtCurMon}}
          <br />
          <div style="line-height: 30px;">
            (+{{dashBord.curMonthToNow.rate}}%)
            <br />
            <span class="font_color_pos_mobile_grey">{{dashBord.curMonthToNow.amtCurMon}} / {{dashBord.curMonthToNow.amtLastMon}}</span>
          </div>
        </q-card-main>
      </q-card>

      <q-card class="card" @click.native="gotoCurYear()">
        <q-card-title>Current Year To Now</q-card-title>
        <q-card-separator />
        <q-card-main>
          {{dashBord.curYearToNow.amtCurYear}}
          <br />
          <div style="line-height: 30px;">
            (+{{dashBord.curYearToNow.rate}}%)
            <br />
            <span class="font_color_pos_mobile_grey">{{dashBord.curYearToNow.amtCurYear}} / {{dashBord.curYearToNow.amtLastYear}}</span>
          </div>
        </q-card-main>
      </q-card>

      <q-card @click.native="gotoMonthOnMonth" class="card">
        <q-table
          :data="dashBord.last3YearsOnMonth"
          :columns="columns"
          :visible-columns="visibleColumns"
          :separator="separator"
          row-key="date"
          title="Mon On Mon (Last 3 Years)"
          color="secondary"
          style="box-shadow: none"
          hide-header
          hide-bottom
        ></q-table>
      </q-card>

      <q-card @click.native="gotoLast7DaysByShops()" class="card">
        <q-table
          dense
          :data="dashBord.last7Days"
          :pagination.sync="serverPagination"
          :columns="columns"
          :visible-columns="visibleColumns7days"
          :separator="separator"
          row-key="date"
          title="Sales Of Last 7 Days"
          color="secondary"
          style="box-shadow: none"
          hide-header
          hide-bottom
        ></q-table>
      </q-card>

      <q-card class="card" @click.native="gotoLast6MonthsByShops()">
        <q-table
          dense
          :data="dashBord.last6Month"
          :pagination.sync="serverPagination"
          :columns="columns"
          :visible-columns="visibleColumns7days"
          :separator="separator"
          row-key="date"
          title="Last 6 Mon"
          color="secondary"
          style="box-shadow: none"
          hide-header
          hide-bottom
        ></q-table>
      </q-card>

      <q-card class="card" @click.native="gotoLast3YearsOnYear()">
        <q-table
          :data="dashBord.last3Years"
          :pagination.sync="serverPagination"
          :columns="columns"
          :visible-columns="visibleColumns"
          :separator="separator"
          row-key="date"
          title="Year On Year (Last 3 Years)"
          color="secondary"
          hide-header
          hide-bottom
          style="box-shadow: none"
        ></q-table>
      </q-card>
  
      <q-card class="card" @click.native="gotoItemCatAmtByShop()">
        <q-table
                :data="dashBord.itemCatAmt"
                :pagination.sync="serverPagination"
                :columns="columns"
                :visible-columns="visibleNameAmt"
                :separator="separator"
                row-key="date"
                title="Item Cat Sales Amount (Current Year)"
                color="secondary"
                hide-header
                hide-bottom
                style="box-shadow: none"
        ></q-table>
      </q-card>
      
    </div>
    
   
    
    
    <!-- <div
        class="height_10_p position_absolute width_100_p min_height_60 bottom_0 left_0 vertical_evenly primary_color bg_white"
        style="border-top: 2px solid #ADDC7C"
    >
        <div @click="goToVip" style="font-size:30px" class="iconfont icon-baozhuang"></div>
        <div @click="goBack" style="font-size:30px" class="iconfont icon-huitui"></div>
    </div> -->
  </q-page>
</template>

<script>
import { mapState} from "vuex";

export default {
  data() {
    return {
      serverPagination: {
        page: 1,
        rowsNumber: 10 // specifying this determines pagination is server-side
      },
      columns: [
        {name: "name",required: true,label: "name",align: "left",field: "name",sortable: true},
        {name: "date",required: true,label: "date",align: "left",field: "date",sortable: true},
        { name: "amt", label: "amt", field: "amt", sortable: true },
        { name: "count", label: "count", field: "count", sortable: true },
        { name: "fat", label: "Fat (g)", field: "fat", sortable: true },
        { name: "carbs", label: "Carbs (g)", field: "carbs" },
        { name: "protein", label: "Protein (g)", field: "protein" },
        { name: "sodium", label: "Sodium (mg)", field: "sodium" },
        {
          name: "calcium",
          label: "Calcium (%)",
          field: "calcium",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: "iron",
          label: "Iron (%)",
          field: "iron",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        }
      ],
      visibleColumns: ["date", "amt"],
      visibleColumns7days: ["date", "amt", "count"],
      visibleNameAmt: ["name", "amt"],
      separator: "cell"
    };
  },
  methods: {
    gotoLast7DaysByShops() {
      this.$router.push({
        path: "/admin/last_7_days_for_shops"
      });
    },
  
    gotoLast6MonthsByShops() {
      this.$router.push({
        path: "/admin/last_6_months_for_shops"
      });
    },

    gotoMonthOnMonth() {
      this.$router.push({
        path: "/admin/month_on_month"
      });
    },
  
    gotoLast3YearsOnYear(){
      this.$router.push({
        path: "/admin/year_on_year"
      });
    },
    
    gotoCurYear() {
      this.$router.push({
        path: "/admin/shops_cur_year"
      });
    },

    gotoShopsDaysales() {
      this.$router.push({
        path: "/admin/shops_day_sales"
      });
    },
    gotoCurMonths() {
      this.$router.push({
        path: "/admin/shops_cur_months"
      });
    },
    gotoItemCatAmtByShop(){
      this.$router.push({
        path: "/admin/shops_item_cat_sub_cat"
      });
    },
    goToVip() {
      this.$router.push({
        path: "/admin/jpos_vip"
      });
    },
    goBack() {
      this.$router.back();
    }
  },
  computed:{
    ...mapState({
      dashBord: state => state.dashBord.dashBord,
    }),
  },
  activated:function() {
  
  },
  mounted() {
    //找寻对应的数据
    this.$store.dispatch("dashBord/getDashBordData").then(()=>{}).catch(()=>{});
    console.log("dashBord.currentCatAmt",this.dashBord.itemCatAmt)
  }
};
</script>

<style scoped>
.card {
  margin: 10px;
  width: 300px;
}
.dashboard {
  display: flex;
  align-items: flex-start;
  height: 85vh;
  flex-wrap: wrap;
  overflow: auto;
  justify-content: flex-start;
}
</style>
