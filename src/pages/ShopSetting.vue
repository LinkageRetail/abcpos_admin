<template>
  <q-page style="padding:10px;overflow:hidden">
    <div class="width_100_p height_100_p padding_left_15 padding_right_15" style="overflow:hidden; ">
      <div class="height_10_p  vertical_center iconfont icon-mzicon-setting font_color_yellow" style="font-size: 40px">
      </div>

      <div class="margin_top_10">
        Shop
          <q-select
            class="position_relative"
            :options="shops"
            v-model="shopId"
            @input="changeShop"
          />
      </div>


      <div class="margin_top_10" >
        <div class="width_100_p  margin_center">
          Terminal
          <q-select
            class="position_relative"
            :options="terms"
            v-model="termId"
          />
        </div>
      </div>

      <div
        class="height_10_p position_absolute width_100_p min_height_60 bottom_0 left_0  primary_color"
        style="border-top: 2px solid #ADDC7C; "
      >
        <div @click="save()" class="relative-position height_100_p margin_left_10 width_20_p float_right  vertical_center" v-ripple>
          <span class="iconfont icon-gou float_right" style="font-size: 2em"></span>
        </div>

        <div @click="goBack()"  class="relative-position height_100_p  width_20_p margin_left_10 float_right  vertical_center" v-ripple>
          <span class="iconfont icon-huitui float_right" style="font-size: 2.5em"></span>
        </div>

      </div>

    </div>
  </q-page>
</template>

<script>
  import { mapState } from "vuex";
  import SysUtil from "../utils/SysUtil";

  export default {
    data() {
      return {
        shopId:'',
        termId:'',
        shops:[],
        terms:[],
      }
    },
    computed: {
      ...mapState({
        setting : state => state.base.setting,
        sysObj : state => state.base.systemObject,
      }),
    },
    methods: {
      getShops() {
        this.$axios.get('/lov/shops').then(res => {
          if (res.status == 200) {
            if (res.data != null && res.data.code == 1) {
              console.log(res.data.data)
              let data = res.data.data;
              this.shops=[];
              if (data != null) {
                data.forEach(e => {
                  let shop = {};
                  shop.value = e.wareHouseCode;
                  shop.label = e.shopDescription;
                  shop.choosed = false;
                  this.shops.push(shop);
                });
              }
            } else if (res.data != null) {
              SysUtil.showError("ERROR", "getShops", res.data.msg);
            } else {
              SysUtil.showError("ERROR", "getShops", "Shop query failed!");
            }
          } else {
            SysUtil.showError("ERROR", "getShops", res.msg);
          }
        }).catch(error => {
          SysUtil.showError("ERROR", "getShops", error.msg);
          console.log(error);
        })
      },

      changeShop() {
        console.log(this.shopId);
        this.$axios.get('/lov/terms', {
          params: {
            shopId: this.shopId,
          }
        }).then(res => {
          if (res.status == 200) {
            if (res.data != null && res.data.code == 1) {
              console.log(res.data.data)
              let data = res.data.data;
              this.terms=[];
              if (data != null) {
                data.forEach(e => {
                  let shop = {};
                  shop.value = e.termId;
                  shop.label = e.termId;
                  shop.choosed = false;
                  this.terms.push(shop);
                });
              }
              if (SysUtil.isNull(res.data.data) || res.data.data.filter(e => e.termId==this.termId).length==0) {
                this.termId = '';
              }
            } else if (res.data != null) {
              SysUtil.showError("ERROR", "changeShop", res.data.msg);
            } else {
              SysUtil.showError("ERROR", "changeShop", "Terminal query failed!");
            }
          } else {
            SysUtil.showError("ERROR", "changeShop", res.msg);
          }
        }).catch(error => {
          SysUtil.showError("ERROR", "changeShop", error.msg);
          console.log(error);
        })
      },
      save() {
        if(SysUtil.isNull(this.shopId)){
          SysUtil.showError("ERROR", "save", "Please choose the shop!");
          return;
        }
        if(SysUtil.isNull(this.termId)){
          SysUtil.showError("ERROR", "save", "Please choose the terminal!");
          return;
        }
        if (this.shopId == this.sysObj.shopId && this.termId == this.sysObj.termId) {
          this.goBack();
          return;
        }
        SysUtil.showDialog("CONFIRM","Switch shop terminal to log in again and clear all the caches of the current shop. Do you want to continue?",
          ()=> {
          console.log("进入ok方法");
            this.saveSetting();
            this.$store.commit('base/updateToken');
            console.log(44444444444444);
            this.$router.replace({
              path: '/login'
            });
          },()=>{});
      },
      saveSetting() {
        let data = {};
        data.shopId = this.shopId;
        data.termId = this.termId;
        this.$store.commit('base/setShopAndTerm',data);
      },
      goBack() {
        this.$router.go(-1);
      },
    },
    mounted() {
      this.getShops();
      this.shopId = this.sysObj.shopId;
      this.termId = this.sysObj.termId;
      this.changeShop();
    },

  }
</script>

<style>

</style>
