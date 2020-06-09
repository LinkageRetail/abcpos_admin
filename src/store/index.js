import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import base from './base'
import dashBord from './dashbord'

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    base,
    dashBord
  },
  mutations: {

    // 重新装载state
    // 参考https://www.mikestreety.co.uk/blog/vue-js-using-localstorage-with-the-vuex-store
    initialiseStore(state) {
      // Check if the ID exists
      // if(localStorage.getItem('store')) {
      //   // Replace the state object with the stored item
      //   this.replaceState(
      //     Object.assign(state, JSON.parse(localStorage.getItem('store')))
      //   );
      // }
    }
  }
})

// 如果我们需要一些HMR魔术，我们会处理
// 下面的热点更新。 注意我们实现这个
// 用“process.env.DEV”代码 - 所以这不会
// 进入我们的生产版本（也不应该）。
if (process.env.DEV && module.hot) {
  module.hot.accept(['./base','./dashbord'], () => {
    const base = require('./base').default;
    const dashBord = require('./dashbord').default;
    store.hotUpdate({ modules: {
        base: base,
        dashBord: dashBord,

      }});
  });
}

export default store
