<template>
  <q-layout view="hHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Administration
          <!-- {{header}} -->
          <!--<div slot="subtitle">Dashboard</div>-->
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header><h5 class="text_align_center"><img src="~assets/titleLogo.png" width="65%"/></h5></q-list-header>
        <div v-if="functions.filter((i) => i =='MENU_ROLE_SPECIAL_CONTROL.FN_ALLOW_DASH_BOARD').length>0">
        <q-item exact to="/admin/dashboard">
          <q-item-side  icon="chat" />
          <q-item-main label="Dashboard" sublabel="" />
        </q-item>
        </div>
        <q-item-separator />
        <q-item exact to="/admin">
          <q-item-side  icon="chat" />
          <q-item-main label="Service Order" sublabel="" />
        </q-item>
        <q-item-separator />
        <div v-if="functions.filter((i) => i.indexOf('MENU_CHANGE_SHOP.')==0).length>0">
        <q-item exact to="/admin/ShopSetting">
          <q-item-side  icon="chat" />
          <q-item-main label="Shop Setting" sublabel="" />
        </q-item>
        </div>
        <q-item @click.native="logout()">
            <q-item-side icon="logout"/>
            <q-item-main label="Logout" sublabel=""/>
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
      <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import '../assets/iconfont/iconfont.css'
import { mapState } from "vuex";
export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
    }
  },
  computed: {
    ...mapState({
      functions: state => state.base.cache.functions,
    }),
  },
  mounted() {
  },
  methods: {
    goHome: function () {
      this.$router.push({
        path:'/'
      })
    },
    logout() {
      // 只有在退出时清空token
      this.$axios.post('/logout').then(res => {
        this.$store.commit('base/updateToken', '');
        this.$router.replace({
          path: '/login'
        });
      });

    },
  }
}
</script>

<style >
.q-toolbar {
  padding: 0 20px;
}
</style>
