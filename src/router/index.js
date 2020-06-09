import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

const Router = new VueRouter({
  /*
   * NOTE! Change Vue Router mode from quasar.conf.js -> build -> vueRouterMode
   *
   * When going with "history" mode, please also make sure "build.publicPath"
   * is set to something other than an empty string.
   * base: '/' instead of ''
   */

  // Leave as is and change from quasar.conf.js instead!
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
  //scrollBehavior: () => ({ y: 0 }),
  routes,
  // scrollBehavior (to, from, savedPosition) {
  //   if (savedPosition) {
  //     console.log("asdfasdfasdfasdfasd   " +JSON.stringify(savedPosition))
  //     return savedPosition
  //   } else {
  //     const position = {}
  //     // new navigation.
  //     // scroll to anchor by returning the selector
  //     if (to.hash) {
  //       position.selector = to.hash
  //     }
  //     // check if any matched route config has meta that requires scrolling to top
  //     if (to.matched.some(m => m.meta.scrollToTop)) {
  //       // cords will be used if no selector is provided,
  //       // or if the selector didn't match any element.
  //       position.x = 0
  //       position.y = 0
  //     }
  //     // if the returned position is falsy or an empty object,
  //     // will retain current scroll position.
  //     return position
  //   }
  // }
})

Router.beforeEach((to, from, next) => {

  // meta.login=false的，如果需要token，就跳转到login
  if (!to.matched.some(record => {
    return record.meta.login
  })) {
    let token = localStorage.getItem("token")

    if (!token) {
      next();
      // Router.push({ path: '/landing',query: { redirect: to.fullPath }})
    } else {
      next()
    }
  } else {
    next()
  }
});

export default Router
