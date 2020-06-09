import Vue from 'vue'
import { date } from 'quasar'
import storage from "../model/storage";
import $axios from "axios";

var SysUtil={

  checkEmail(val){
    let myReg=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
    if(myReg.test(val)){
      return true;
    }else{
      return false;
    }
  },

  parseDateToString(srcDate, pattern){
    return date.formatDate(srcDate, pattern);
  },

  parseStringToDate(dateStr, parttern){
    let oldTime = new Date(dateStr);
    let curTime = this.parseDateToString(oldTime,parttern);
    return curTime;
  },

  changeLang(i18n, lang){
    storage.set("lang", lang);
    i18n.locale = lang;
    i18n.silentTranslationWarn = true;
    console.log("Lang:" + i18n.locale);
  },

  showDialog(title, message, okHandler, cancelHandler){
    // 检查cancel键是否需要
    var c = false
    if(cancelHandler){
      c = true
    }

    Vue.prototype.$q.dialog({
      title: title,
      message: message,
      ok: true,
      cancel: c,
      preventClose: true
    }).then(() => {
      if(okHandler){
        okHandler();
      }
    }).catch(() => {
      if(cancelHandler){
        cancelHandler();
      }
    })
  },

  showError(title, tag, message){
    console.log("error--------------" + tag + "-------------");
    Vue.prototype.$q.dialog({
      title: title,
      message: message,
      ok: true,
      cancel: false,
      preventClose: true
    })
  },


  isNull(value){
    if(value==null || value==undefined || value===""){
      return true;
    }
    return false;
  },

  isNotNull(value){
    return !this.isNull(value);
  },

  parseFloat(value, decimal, isRoundUp){
    if(isRoundUp){
      return Number(value).toFixed(decimal);
    }else{
      var temp = 1;
      for(var i=0; i<decimal; i++){
        temp = temp*10;
      }
      return (parseInt(value*temp)/temp).toFixed(decimal);
    }
  },

  moneyFormat(value) {
    if (this.isNull(value)) {
      return '';
    }
    value=value.toString().replace(",","");
    var numReg = /^(\-|\+)?\d+(\.\d+)?$/;
    if (!numReg.test(value)) {
      this.showError("ERROR", "moneyFormat", "Wrong amount format!");
      return;
    } else {
      value = Number(value).toFixed(2);
      var valueArray = value.split(".");
      var intPart = valueArray[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
      var floatPart = valueArray[1];
      return intPart + "."+ floatPart;
    }
  },

  isNumber(value) {
    if (this.isNull(value)) {
      return false;
    }
    value=value.toString().replace(/,/g,"");
    var numReg = /^(\-|\+)?\d+(\.\d+)?$/;
    if (!numReg.test(value)) {
      this.showError("ERROR", "isNumber", "Wrong amount format!");
      return false;
    }
    return true;
  },

  objToStrMap(obj){
    var strMap = new Map();
    for (var k of Object.keys(obj)) {
      strMap.set(k,obj[k]);
    }
    return strMap;
  },

  strMapToObj(strMap) {
    var obj = Object.create(null);
    for (var [k,v] of strMap) {
      obj[k] = v;
    }
    return obj;
  },

  guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },

  // 保存buffer字节流到文件
  saveToFile(buffer, path, filename, ext) {

    let platform = Vue.cordova.device.platform;
    console.log("patform: " + platform);

    // 如果是浏览器，直接保存就可以下載和打開
    if (platform === 'browser') {
      //saveAs(buffer, filename + ext)
      //browserSave()
      return
    }

    //NEXT SAVE IT TO THE DEVICE'S LOCAL FILE SYSTEM
    //Requires  cordova plugin add org.apache.cordova.file
    let dir;
    if (platform === 'Android') {
      dir = window.cordova.file.externalCacheDirectory
    } else {
      dir = window.cordova.file.documentsDirectory
    }

    console.log("current file directory is... " + dir);

    function logerror(err) {
      console.error(err);
      return '';
    }

    window.resolveLocalFileSystemURL(dir, function (fileSystem) {

      console.log(fileSystem);

      fileSystem.getDirectory(path, {
        create: true,
        exclusive: false
      }, function () {

        fileSystem.getFile(path + "/" + filename + ext, {
          create: true
        }, function (entry) {
          let fileEntry = entry;

          entry.createWriter(function (writer) {
            writer.onwrite = function () {

              console.log('write success, file url: ' + fileEntry.nativeURL)

              // 打开文件
              // Vue.cordova.fileOpener2.open(
              //   fileEntry.nativeURL,
              //   applicationType,
              //   {
              //     error:function(e){
              //       console.log('Error status: ' + e.status + ' - Error message: ' + e.message);
              //     },
              //     success:function(){
              //       console.log('fileOpener2 successfully');
              //     }
              //   }
              // )
            }

            console.log("writing to file")
            writer.write(buffer)
          }, logerror)

        }, logerror);

      }, logerror);

    }, function (event) {
      console.error(event.target.error.code);
    });
  },

  getConfigValue(configType, configParameter) {
    return new Promise((resolve, reject) => {
      $axios.get("/config/getConfigValue", {
        params: {configType: configType, configParameter: configParameter}
      })
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            if (res.data != null && res.data.code == 1) {
              resolve(res.data.data);
              // reject(res.data.data);
            } else if (res.data != null) {
              reject(res.data.msg);
              //SysUtil.showError("ERROR", "getConfigValue", res.data.msg);
            } else {
              reject(res.msg);
              //SysUtil.showError("ERROR", "getConfigValue", res.msg);
            }
          }
        }).catch(e => {
          reject(e.msg);
      });
    });
  }
}

export default SysUtil;
