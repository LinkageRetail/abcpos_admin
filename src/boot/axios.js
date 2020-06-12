import axios from 'axios'
import { Loading } from 'quasar'

export default ({router, store, Vue}) => {

  let AUTH_TOKEN=(function(){

    // 先从localstore装载数据
    store.commit('initialiseStore');

    // 从localstorage得到用户信息和token
    let tt = localStorage.getItem("token")
    if(tt) {
      console.log('read auth-token from localstorage')
      store.commit('base/updateToken', tt)
      let user = localStorage.getItem("user")
      store.commit('base/updateUser',user)
    }
  })();

  // 使用axios请求拦截器在发送请求前判断是否有token有则添加到请求头中无则跳转至登录页面
  axios.interceptors.request.use(
  config => {
    if (store.state.base.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.token = store.state.base.token;
    }else{
    }

    Loading.show({
      delay: 1000 // 毫秒
    })

    return config;
  },
  err => {
    return Promise.reject(err);
  });

  // 使用axios响应拦截器获取响应前判断token是否失效
  axios.interceptors.response.use(
  response => {
    Loading.hide()

    if(response.headers["token"] && response.headers["token"] !== store.state.token){
      // 更新token
      console.log("update token")
      store.commit('base/updateToken', response.headers["token"])
    }

    return response;
  },
  error => {
    Loading.hide()

    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Vue.prototype.$q.notify({
          //   message: 'session 失效，請重新登錄',
          //   position: 'center'
          // });
          // 返回 401 清除token信息并跳转到登录页面
        console.log("401 直接去login");
          router.replace({
            path: '/login',
            //query: {redirect: router.currentRoute.fullPath}
          })
          break
        case 500:
      // Vue.prototype.$q.notify({
      //   message: '系统错误，请重试',
      //   position: 'center'
      // });
      }
    }else{
      // Vue.prototype.$q.notify({
      //   message: '無法訪問服務器，請重試',
      //   position: 'center'
      // });
    }
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  });

  try{
    // cordova must use http/https
    if (Vue.prototype.$q.platform.is.cordova) {
      axios.defaults.baseURL = process.env.API;
    }else{
      //axios.defaults.baseURL = '/api';
      axios.defaults.baseURL = process.env.API;
    }
  }catch (e) {
    //axios.defaults.baseURL = '/api';
    axios.defaults.baseURL = process.env.API;
  }
  console.log('baseURL = ' + axios.defaults.baseURL)

  // 添加自定義頭，表示是API訪問
  //axios.defaults.headers.common['X-Requested-With']='XMLHttpRequest';
  //axios.defaults.credentials = true
  // 超時等待時間
  axios.defaults.timeout = 30000
  Vue.prototype.$axios = axios;
}

