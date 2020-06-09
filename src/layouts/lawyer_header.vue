<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color=""
        :inverted="$q.theme === 'ios'"
      >

        <q-btn flat dense  :class="showHeaderNaviIamge?'':'hidden'"> <img class="header_img" style="margin-left: 20px"  src="~assets/aa.png" />
          <q-popover
            :anchor="anchor"
            :self="self"
          >
          <q-list link style="min-width: 100px">
            <q-item
              v-for="(item,index) in menuitems"
              :key="`${item}`"
              v-close-overlay
              @click.native="notify(item)"
            >
              <q-item-main :label="item"/>
            </q-item>
          </q-list>
          </q-popover>
        </q-btn>
        <q-btn flat dense to="resources_center" :class="showHeaderSearchImage?'':'hidden'"> <img class="header_img"   src="~assets/aa.png" /></q-btn>
        <q-btn flat dense to="panic" :class="showHeaderPanicImage?'':'hidden'"> <img class="header_img_panic"  src="~assets/aa.png" /></q-btn>
        <img class="header_img_logo" :class="showHeaderLogoImage?'':'hidden'" src="~assets/aa.png">

        <q-btn flat dense to="member_login" :class="showHeaderUserName?'':'hidden'"><div class="user_name">JACK</div></q-btn>
      </q-toolbar>

    </q-layout-header>



    <q-page-container>

      <keep-alive :include=includedComponents :exclude=excludedComponents>
        <router-view/>
      </keep-alive>

    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'LayoutDefault',
  data () {
    return {
      menuitems: ["LAWYER CENTER","MY CASE","MY ACCOUNT",  "MY BOOKING", "LOGIN"],
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    gotoLanding(){
      this.$router.push({
        path: '/landing'
      })
    },
    notify(data){
      switch (data) {
        case "MY CASE":
          this.$router.push({
            path: '/lawyer_my_case'
          });
          break;
        case "MY ACCOUNT":
          this.$router.push({
            path: '/edit_lawyer_account'
          });
          break;
        case "MY BOOKING":
          this.$router.push({
            path: '/lawyer_my_booking'
          });
          break;
        case "LOGIN":
          this.$router.push({
            path: '/member_login'
          });
          break;
        case "LAWYER CENTER":
          this.$router.push({
            path: '/lawyer'
          });
          break;
      }
    }
  },
  computed:{
    showHeaderNaviIamge(){
      return this.$store.state.base.show_header_img_anvi;
    },
    showHeaderSearchImage(){
      return this.$store.state.base.show_header_img_search;
    },
    showHeaderLogoImage(){
      return this.$store.state.base.show_header_img_logo;
    },
    showHeaderPanicImage(){
      return this.$store.state.base.show_header_img_panic;
    },
    showHeaderUserName(){
      return this.$store.state.base.show_header_username;
    },
    header() {
//      return this.$store.state.base.header;
    },
    includedComponents() {
      return this.$store.state.base.includedComponents
    },
    excludedComponents() {
      return this.$store.state.base.excludedComponents
    },
    anchor () {
      return `top middle`;
    },
    self () {
      return `bottom middle`
    }
  },
  mounted () {
//    this.$store.commit('base/showHeaderNaviImage');
//    this.$store.commit('base/showHeaderSearchImage');
//    this.$store.commit('base/showHeaderPanicImage');
//    this.$store.commit('base/showHeaderLogoImage');
//    this.$store.commit('base/hideHeaderUsername');

  },
}
</script>

<style>
  .user_name{
    padding: 2px 20px;
    border-radius: 15px;
    border: 1px solid #92BDC1;
    margin-right: 25px;
    color: #92BDC1;
    font-family: Tahoma;
    font-weight: bold;
    position: fixed;
    right: 0px;
  }

  .header_img_logo{
    height: 60px;
    width: 60px;
    margin-bottom: 5px;
    margin-left: -80px;
    position: absolute;
    left:50%;
    margin-left: -30px;
  }

  .header_img_panic{
    height: 25px;
    width: 25px;
    margin-bottom: 5px;
    margin-left: 5px;
  }

  .header_img{
    height: 20px;
    width: 20px;
    margin: 10px 5px;
  }
header{
  background-color: #E4E4E4;
  /*background-color: lightskyblue;*/
  /*background: -webkit-linear-gradient(to right ,#1f2f8a, #4d5488); !* Safari 5.1 - 6.0 *!*/
    /*background: -o-linear-gradient(to right ,#1f2f8a, #4d5488); !* Opera 11.1 - 12.0 *!*/
    /*background: -moz-linear-gradient(to right ,#1f2f8a, #4d5488); !* Firefox 3.6 - 15 *!*/
    /*background: linear-gradient(to right ,#1f2f8a, #4d5488); !* 标准的语法 *!*/
}
.q-layout-page{
  height: calc(100vh - 63px);
}
</style>
