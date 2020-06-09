// import something here
import AMap from 'vue-amap';
// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  // something to do

  Vue.use(AMap);

  AMap.initAMapApiLoader({
    // 申请的高德key
    key: '235e60f52fca4ff7fe166a99b55e90fd',
    // 插件集合
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
    uiVersion: '1.0.11'

  });
}
