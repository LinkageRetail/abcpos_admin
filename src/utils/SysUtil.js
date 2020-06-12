import Vue from "vue";
import { date } from "quasar";
import $axios from "axios";
import { Dialog } from "quasar";

var SysUtil = {
  checkEmail(val) {
    let myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
    if (myReg.test(val)) {
      return true;
    } else {
      return false;
    }
  },

  dataToBlob(data, type) {
    let blob = new Blob([data])
    let downloadUrl = window.URL.createObjectURL(blob)
    let anchor = document.createElement("a")
    anchor.href = downloadUrl
    let fileName = new Date().getTime() + ' report generated.'
    if(type === 'pdf') {
      fileName += 'pdf'
    } else {
      fileName += 'xlsx'
    }
    anchor.download = fileName
    document.body.appendChild(anchor)
    anchor.click()
    window.URL.revokeObjectURL(blob)
  },

  parseDateToString(srcDate, pattern) {
    return date.formatDate(srcDate, pattern);
  },

  parseStringToDate(dateStr, parttern) {
    if (this.isNotNull(dateStr)) {
      dateStr = dateStr
        .substr(0, 19)
        .replace(/-/g, "/")
        .replace("T", " ");
      let oldTime = new Date(dateStr);
      let curTime = this.parseDateToString(oldTime, parttern);
      //console.log("parseStringToDate: ", dateStr, oldTime, curTime);
      return curTime;
    } else {
      return null;
    }
  },

  showAlert(title, message, callback) {
    let option = {}
    if(title === 'ERROR') {
      option = {
        title: '',
        html: true,
        message: '<div style="display: flex;align-items: center;padding-top: 40px;"><svg t="1578909089954" style="flex-shrink: 0;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8404" width="40" height="40"><path d="M512 0A512 512 0 1 1 0 512 512 512 0 0 1 512 0z m219.648 665.1392L578.56 512l153.088-153.1392a47.7184 47.7184 0 0 0 0-66.56 47.2576 47.2576 0 0 0-66.56 0L512 445.44 358.912 292.3008a47.2576 47.2576 0 0 0-66.56 0 47.7184 47.7184 0 0 0 0 66.56L445.44 512l-153.088 153.1392a47.7184 47.7184 0 0 0 0 66.56 47.2576 47.2576 0 0 0 66.56 0L512 578.56l153.088 153.1392a47.104 47.104 0 0 0 66.56-66.56z" p-id="8405" fill="#ff0000"></path></svg><span style="margin-left:16px;font-weight:bold;color:#000">'
        + message + '</span></div>',
        persistent: true
      }
    } else {
      option = {
        title: '',
        html: true,
        message: '<div style="display: flex;align-items: center;padding-top: 40px;"><svg t="1578909209339" style="flex-shrink: 0;" viewBox="0 0 1037 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10529" width="40" height="40"><path d="M512.869781 9.558668C234.941567 9.558668 9.624543 234.161109 9.624543 511.240755c0 277.079646 225.317024 501.682087 503.245238 501.682087 277.950545 0 503.245238-224.602441 503.245237-501.682087C1016.115018 234.161109 790.820325 9.558668 512.869781 9.558668z m288.646962 371.560948l-325.470329 324.465446a45.666334 45.666334 0 0 1-64.424144 0l-187.399452-186.818852a45.331373 45.331373 0 0 1 0-64.223168 45.666334 45.666334 0 0 1 64.424144 0l155.176214 154.7296 293.291754-292.376194a45.644004 45.644004 0 0 1 64.401813 0 45.309043 45.309043 0 0 1 0 64.223168z" fill="#bada55" p-id="10530"></path></svg><span style="margin-left:16px;font-weight:bold;color:#000">'
        + message + '</span></div>',
        persistent: true
      }
    }
    Dialog.create(option)
      .onOk(() => {
        callback && callback()
        // console.log('OK')
      })
      .onCancel(() => {
        // console.log('Cancel')
      })
      .onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      });
  },

  showConfirm(title, message, okHandler, cancelHandler) {
    Dialog.create({
      title: '',
      html: true,
      message: '<div style="display: flex;align-items: center;padding-top: 40px;"><svg t="1578909297794" style="flex-shrink: 0;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11620" width="40" height="40"><path d="M512.333086 81.305771c-231.917 0-420.00068 188.082656-420.00068 420.00068 0 231.918024 188.083679 420.001703 420.00068 420.001703 231.918024 0 420.001703-188.083679 420.001703-420.001703C932.334789 269.38945 744.25111 81.305771 512.333086 81.305771L512.333086 81.305771 512.333086 81.305771M509.631558 795.2092c-34.180474 0-61.990866-27.225061-61.990866-60.7322 0-33.502022 27.712155-60.731176 61.990866-60.731176 34.175357 0 61.98575 27.228131 61.98575 60.731176C571.618331 767.983115 543.906176 795.2092 509.631558 795.2092L509.631558 795.2092 509.631558 795.2092M676.084591 451.584002c-12.163017 19.117406-37.947264 45.088918-77.530794 78.012771-20.470217 16.991999-33.212426 30.701233-38.139645 41.130769-4.92108 10.328229-7.240915 28.870538-6.759961 55.616692l-88.24481 0c-0.192382-12.649088-0.384763-20.377096-0.384763-23.176862 0-28.576849 4.728698-52.037167 14.190187-70.480214 9.461489-18.442024 28.385491-39.199791 56.678884-62.179155 28.290323-23.076578 45.281299-38.137599 50.78771-45.281299 8.495488-11.295254 12.836353-23.750937 12.836353-37.271882 0-18.826787-7.621585-34.947953-22.686698-48.463782-15.061021-13.422707-35.532261-20.182668-61.116963-20.182668-24.716938 0-45.381583 7.048533-61.987796 21.050432-16.607236 13.996782-30.896684 44.895513-34.277688 64.012919-3.186576 18.056238-90.178859 25.683962-89.116667-10.909467 1.060145-36.594453 20.084431-76.276221 52.716642-105.046474 32.638351-28.7723 75.506694-43.161009 128.510886-43.161009 55.81112 0 100.126418 14.58109 133.145439 43.736107 33.021068 29.158087 49.437969 63.049988 49.437969 101.765755C694.234973 412.18876 688.154487 432.465572 676.084591 451.584002L676.084591 451.584002 676.084591 451.584002M676.084591 451.584002 676.084591 451.584002z" p-id="11621" fill="#1296db"></path></svg><span style="margin-left:16px;font-weight:bold;color:#000">'
      + message + '</span></div>',
      ok: 'YES',
      cancel: 'NO',
      persistent: true
    })
    .onOk(() => {
      if (okHandler) {
        okHandler();
      }
    })
    .onCancel(() => {
      if (cancelHandler) {
        cancelHandler();
      }
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
  },

  isNull(value) {
    if (value == null || value == undefined || value === "") {
      return true;
    }
    return false;
  },

  isNotNull(value) {
    return !this.isNull(value);
  },

  parseFloat(value, decimal, isRoundUp) {
    if (isRoundUp) {
      return Number(value).toFixed(decimal);
    } else {
      var temp = 1;
      for (var i = 0; i < decimal; i++) {
        temp = temp * 10;
      }
      return (parseInt(value * temp) / temp).toFixed(decimal);
    }
  },

  moneyFormat(value) {
    if (this.isNull(value)) {
      return "";
    }
    value = value.toString().replace(",", "");
    var numReg = /^(\-|\+)?\d+(\.\d+)?$/;
    if (!numReg.test(value)) {
      this.showError("ERROR", "moneyFormat", "Wrong amount format");
      return;
    } else {
      value = Number(value).toFixed(2);
      var valueArray = value.split(".");
      var intPart = valueArray[0].replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
      var floatPart = valueArray[1];
      return intPart + "." + floatPart;
    }
  },

  isNumber(value) {
    if (this.isNull(value)) {
      return false;
    }
    value = value.toString().replace(/,/g, "");
    var numReg = /^(\-|\+)?\d+(\.\d+)?$/;
    if (!numReg.test(value)) {
      this.showError("ERROR", "isNumber", "Wrong amount format");
      return false;
    }
    return true;
  },

  objToStrMap(obj) {
    var strMap = new Map();
    for (var k of Object.keys(obj)) {
      strMap.set(k, obj[k]);
    }
    return strMap;
  },

  strMapToObj(strMap) {
    var obj = Object.create(null);
    for (var [k, v] of strMap) {
      obj[k] = v;
    }
    return obj;
  },

  guid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  },

  // 保存buffer字节流到文件
  saveToFile(buffer, path, filename, ext) {
    let platform = Vue.cordova.device.platform;
    console.log("patform: " + platform);

    // 如果是浏览器，直接保存就可以下載和打開
    if (platform === "browser") {
      //saveAs(buffer, filename + ext)
      //browserSave()
      return;
    }

    //NEXT SAVE IT TO THE DEVICE'S LOCAL FILE SYSTEM
    //Requires  cordova plugin add org.apache.cordova.file
    let dir;
    if (platform === "Android") {
      dir = window.cordova.file.externalCacheDirectory;
    } else {
      dir = window.cordova.file.documentsDirectory;
    }

    console.log("current file directory is... " + dir);

    function logerror(err) {
      console.error(err);
      return "";
    }

    window.resolveLocalFileSystemURL(
      dir,
      function(fileSystem) {
        console.log(fileSystem);

        fileSystem.getDirectory(
          path,
          {
            create: true,
            exclusive: false
          },
          function() {
            fileSystem.getFile(
              path + "/" + filename + ext,
              {
                create: true
              },
              function(entry) {
                let fileEntry = entry;

                entry.createWriter(function(writer) {
                  writer.onwrite = function() {
                    console.log(
                      "write success, file url: " + fileEntry.nativeURL
                    );

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
                  };

                  console.log("writing to file");
                  writer.write(buffer);
                }, logerror);
              },
              logerror
            );
          },
          logerror
        );
      },
      function(event) {
        console.error(event.target.error.code);
      }
    );
  },

  getConfigValue(configType, configParameter) {
    return new Promise((resolve, reject) => {
      $axios
        .get("/config/getConfigValue", {
          params: { configType: configType, configParameter: configParameter }
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
        })
        .catch(e => {
          reject(e.msg);
        });
    });
  }
};

export default SysUtil;
