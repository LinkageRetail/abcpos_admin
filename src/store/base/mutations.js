import SysUtil from "../../utils/SysUtil";
import { uid, filter ,date } from 'quasar';
// 更新token
export const updateToken = (state, token) => {
  console.log('save token :' + token)

  localStorage.setItem("token",token)

  state.token = token
}

// 更新user信息
export const updateUser = (state, user) => {
  state.user = user
}

export const setSysObject = (state, sysObjectRes) => {
  console.log("sysObjectRes------------");
  console.log(sysObjectRes);
  if (SysUtil.isNotNull(sysObjectRes)) {
    state.systemObject = sysObjectRes;
    state.systemObject.txDate = date.formatDate(new Date(state.systemObject.txDate),"YYYY-MM-DD");
    console.log(state.systemObject);
  }
}

export const setShopAndTerm = (state, data) => {
  let userId = state.systemObject.userId;
  let userShopTerm = state.setting.userShopTerm;
  if (Object.keys(userShopTerm).length==0) {
    let map = new Map();
    map.set(userId,data);
    userShopTerm = SysUtil.strMapToObj(map);
  } else {
    let map = SysUtil.objToStrMap(userShopTerm);
    console.log(map);
    map.set(userId,data);
    userShopTerm = SysUtil.strMapToObj(map);
  }
  state.setting.userShopTerm= userShopTerm;
  console.log(state.setting.userShopTerm);
}

export const setFunctions = (state, data) => {
  state.cache.functions = data;
}
