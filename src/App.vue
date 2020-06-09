<template>
  <div id="q-app" >
    <div class="height_100_p width_100_p" v-if="isRouterAlive" :class="pxScal">
      <keep-alive>
        <router-view v-if="this.$route.meta.keepAlive"/>
      </keep-alive>
      <router-view v-if="!this.$route.meta.keepAlive"/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  // provide(){
  //   return{
  //     reload:this.reload
  //   }
  // },

  data(){
    return  {
      pxScal:"size1", /*320 * 462*/
      isRouterAlive:true
      // fontScale:""
    }
  },

  beforeCreate() {
    // app启动时装载vuex数据
    this.$store.commit('initialiseStore');
  },

  created : function() {
    if(document.body.clientWidth == 320 && document.body.clientHeight==462){
      // fontScale="font-size: 62.5%;";
      // this.$store.data().put
    }

    console.log('app starting...')

    this.$store.dispatch('base/loadData')
  },
  computed: {
      includedComponents() {
        return this.$store.state.base.includedComponents
      },
      excludedComponents() {
        return this.$store.state.base.excludedComponents
      }
  },
  methods:{
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      })
    }
  }
}

</script>

<style>

.size1{
  /*font-size: 62.5%;*/
}

html, body, #q-app{
  height: 100%;
  background-color: white;
  overflow: hidden;
  font-family: Arial, Helvetica, sans-serif;
}
body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, /* structural elements 结构元素 */
dl, dt, dd, ul, ol, li, /* list elements 列表元素 */
pre, /* text formatting elements 文本格式元素 */
fieldset, lengend, button, input, textarea, /* form elements 表单元素 */
th, td, figure { /* table elements 表格元素 */
  margin: 0;
  padding: 0;
}
ul, ol { list-style: none; }
a { text-decoration: none; }
a:hover { text-decoration: none; }
.q-carousel-quick-nav{
  background: rgba(0,0,0,0);
}
.q-carousel-quick-nav .q-icon{
  font-size: 14px !important;
  -webkit-transform: scale(0.5);     /* for Chrome || Safari */
  -moz-transform: scale(0.5);        /* for Firefox */
  -ms-transform: scale(0.5);         /* for IE */
  color: #1f2f8a;
}
.q-carousel-quick-nav .q-btn.inactive .q-icon{
  font-size: 12px !important;
  -webkit-transform: scale(0.5);     /* for Chrome || Safari */
  -moz-transform: scale(0.5);        /* for Firefox */
  -ms-transform: scale(0.5);         /* for IE */
  color: #000;
}
.on-left{
    margin-right: 5px;
}


/*.q-tabs-panes{*/
  /*overflow: auto;*/
  /*position: relative;*/
  /*width: 100%;*/
  /*height: 100%;*/
/*}*/

.user .q-input-target{
  color: #fff;
}
</style>
