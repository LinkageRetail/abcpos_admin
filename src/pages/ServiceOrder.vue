<template>
    <q-page style="padding:10px;overflow:hidden">
        <div class="title">
          <span>Service No: {{serviceOrder.serviceOrderId}}</span>
          <q-search
            no-icon
            v-model="search"
            placeholder="Service No,Customer Name,Customer Tel"
            :after="[{
              icon:'search',
              handler:getServiceOrders
            }]"
          />
          <q-btn-group>
            <q-btn icon="add" color="orange-3" text-color="black" @click="clearServiceOrder()"/>
            <q-btn color="orange-4" text-color="black" @click="deleteServiceOrder()" label="Delete"/>
            <q-btn color="orange-5" text-color="black" @click="cancelServiceOrder()" label="Cancel"/>
            <q-btn color="orange-6" text-color="black" @click="createServiceOrder()" label="Save"/>
            <q-btn color="orange-7" text-color="black" @click="completeServiceOrder()" label="Complete"/>
            <q-btn color="orange-8" text-color="black" @click="serviceOrderView()" label="Pre view"/>
            <q-btn color="orange-9" text-color="black" @click="serviceOrderPrint()" label="Print Out"/>
          </q-btn-group>
        </div>
        <q-tabs  v-model="selectedTab">
            <!-- 选项卡 - 注意slot="title" -->
            <q-tab color="black" default slot="title" name="tab-1" label="Customer Information" />
            <q-tab color="black" slot="title" name="tab-2" label="Product Information" />
            <q-tab color="black" slot="title" name="tab-3" label="Service Requests" />
            <q-tab color="black" slot="title" name="tab-4" label="Product Conditions" />
            <q-tab color="black" slot="title" name="tab-5" label="Recommendation" />

            <!-- 目标 -->
              <q-tab-pane name="tab-1">
                <q-search
                  class="inp"
                  no-icon
                  v-model="vipSearch"
                  placeholder="vip code,vip name,vip tel"
                  :after="[{
                icon:'search',
                handler:getVips
                }]"
                />
                <q-input class="inp" readonly v-model="serviceOrder.custCode" float-label="Customer Code*"/>
                <q-input class="inp" readonly v-model="serviceOrder.custName" float-label="Customer Name*"/>
                <q-input class="inp" readonly v-model="serviceOrder.custTel" float-label="Tel No*"/>
                <q-input class="inp" readonly v-model="serviceOrder.custAddress" float-label="Address"/>
            </q-tab-pane>
            <q-tab-pane name="tab-2">
                <!-- <q-input class="inp" v-model="product.rerferenceNo" clearable float-label="Our Rerference No"/> -->
                <q-input class="inp" v-model="serviceOrder.prodModel" clearable float-label="Model"/>
                <q-input class="inp" v-model="serviceOrder.prodSerial" clearable float-label="Serial No*"/>
                <q-input class="inp" v-model="serviceOrder.custContact" clearable float-label="Customer Service Contact"/>
            </q-tab-pane>
            <q-tab-pane name="tab-3">
                <div class="inps">
                  <div class="inp" v-for="(service,index) in services" :key="index" >
                    <div @click="serviceSelect(service,index)" class="inp-icon">
                      <q-icon style="position:absolute" v-show="service.flag" color="primary" name="done" />
                    </div>
                    <q-input class="service-inp" v-model="service.description" @input="serviceValue(index)" clearable :float-label="service.name"/>
                  </div>
                </div>
            </q-tab-pane>
            <q-tab-pane name="tab-4">
                <div class="inps" style="height:70vh;overflow:auto">
                  <div class="inp" v-for="(condition,index) in conditions" :key="index" >
                    <div @click="conditionSelect(condition,index)" class="inp-icon">
                      <q-icon style="position:absolute" v-show="condition.flag" color="primary" name="done" />
                    </div>
                    <q-input class="service-inp" v-model="condition.description" @input="conditionValue(index)" clearable :float-label="condition.name"/>
                  </div>
                </div>
            </q-tab-pane>
            <q-tab-pane name="tab-5"  style="height:75vh;overflow:auto">
                <h4>Recommendation</h4>
                <q-input v-for="(recommendation,index) in recommendations" :key="index" v-model="recommendation.description" :prefix="index+1+'.' " :float-label="recommendation.name" clearable/>
<!--                <q-input v-model="recommendations.recommendation2" prefix="2. " clearable/>-->
<!--                <q-input v-model="recommendations.recommendation3" prefix="3. " clearable/>-->
<!--                <q-input v-model="recommendations.recommendation4" prefix="4. " clearable/>-->
<!--                <q-input v-model="recommendations.recommendation5" prefix="5. " clearable/>-->
                <h4 style="margin-top:20px">Agreement</h4>
                <q-input type="textarea"  rows="5" v-model="serviceOrder.agreement" clearable/>
              <h4 style="margin-top:20px">Amount</h4>
              <q-input type="number" v-model="serviceOrder.amount" clearable/>
              <h4 style="margin-top:20px">Supplier Order No</h4>
              <q-input v-model="serviceOrder.supplierOrderId" clearable/>
            </q-tab-pane>
        </q-tabs>
        <q-dialog minimized v-model="showServiceOrderList">
          <div class="padding_10 min_height_300 text_align_center">
            <div class="iconfont icon-huiyuan text_align_center padding_top_10 padding_bottom_10 font_size_30"></div>

            <div class="bg-primary white_color margin_bottom_10" style="display: flex;">
              <p class="width_25_p padding_10">Service No</p>
              <p class="width_25_p padding_10">Custmer Name</p>
              <p class="width_25_p padding_10">Custmer Tel</p>
              <p class="width_25_p padding_10">Status</p>
            </div>
            <div class="vertical_between" v-for="(serviceOrder,index) in serviceOrderList" :key="index" @click="selectServiceOrder(serviceOrder)">
              <p class="width_25_p padding_10">{{serviceOrder.serviceOrderId}}</p>
              <p class="width_25_p padding_10">{{serviceOrder.custName}}</p>
              <p class="width_25_p padding_10">{{serviceOrder.custTel}}</p>
              <p class="width_25_p padding_10">{{serviceOrder.status}}</p>
            </div>
          </div>
        </q-dialog>
        <q-dialog minimized v-model="showVipList">
          <div class="padding_10 min_height_300 text_align_center">
            <div class="iconfont icon-huiyuan text_align_center padding_top_10 padding_bottom_10 font_size_30"></div>

            <div class="bg-primary white_color margin_bottom_10" style="display: flex;">
              <p class="width_33_p padding_10">Vip Code</p>
              <p class="width_33_p padding_10">Vip Name</p>
              <p class="width_33_p padding_10">Vip Tel</p>
            </div>
            <div style="height:65vh;overflow: auto">
            <div class="vertical_between" v-for="(vip,index) in vipList" :key="index" @click="selectVip(vip)">
              <p class="width_33_p padding_10">{{vip.vipCode}}</p>
              <p class="width_33_p padding_10">{{vip.vipName}}</p>
              <p class="width_33_p padding_10">{{vip.vipTelephone}}</p>
            </div>
            </div>
          </div>
        </q-dialog>
    </q-page>
</template>

<script>
  import SysUtil from "../utils/SysUtil";
export default {
    data () {
        return {
          selectedTab:'',
          search:'',
          vipSearch:"",
          services: [],
          conditions: [],
          recommendations: [],
          showServiceOrderList:false,
          showVipList:false,
          serviceOrderList:[],
          vipList:[],
          preView:{},
          serviceOrder: {
            serviceOrderId:'',
            custName:'',
            custTel:'',
            custAddress:'',
            prodModel:'',
            prodSerial:'',
            custContact:'',
            agreement:'',
            status:'',
            amount:'',
            ccyCode:'HKD',
            supplierOrderId:'',
            services: [],
            conditions: [],
            recommendations: [],
          },
        }
    },
    activated() {
      this.serviceOrderConfigCols();
    },
    methods: {
      serviceValue(index) {
        if (!this.services[index].description) {
          this.services[index].flag = false;
        } else {
          this.services[index].flag = true;
        }
        this.$set(this.services, index, this.services[index])
      },
      serviceSelect(service, index) {
        if (service.flag) {
          service.flag = false
          service.description = ''
        } else {
          service.flag = true
        }
        this.$set(this.services, index, service)
      },
      conditionValue(index) {
        if (!this.conditions[index].description) {
          this.conditions[index].flag = false;
        } else {
          this.conditions[index].flag = true;
        }
        this.$set(this.conditions, index, this.conditions[index])
      },
      conditionSelect(condition, index) {
        if (condition.flag) {
          condition.flag = false
          condition.description = ''
        } else {
          condition.flag = true
        }
        this.$set(this.conditions, index, condition)
      },
      clearServiceOrder() {
        this.serviceOrder.serviceOrderId = ''
        this.serviceOrder.custCode = '';
        this.serviceOrder.custName = '';
        this.serviceOrder.custTel = '';
        this.serviceOrder.custAddress = '';
        this.serviceOrder.prodModel = '';
        this.serviceOrder.prodSerial = '';
        this.serviceOrder.custContact = '';
        this.serviceOrder.agreement = '';
        this.serviceOrder.statue = '';
        this.serviceOrder.amount = '';
        this.serviceOrder.supplierOrderId = '';
        this.serviceOrder.status = '';
        this.services.forEach(e => {
          e.flag = false;
          e.description = ''
        });
        this.conditions.forEach(e => {
          e.flag = false;
          e.description = ''
        });
        this.recommendations.forEach(e => {
          e.flag = false;
          e.description = ''
        });
        this.selectedTab = "tab-1";
      },
      serviceOrderConfigCols() {
        this.$axios.get('/service/serviceOrderConfigCols').then(res => {
          if (res.status == 200) {
            if (res.data != null && res.data.code == 1) {
              this.services = res.data.data.services;
              this.services.forEach(item => {
                item.description = ''
                item['flag'] = false
              })
              this.conditions = res.data.data.conditions;
              this.conditions.forEach(item => {
                item.description = ''
                item['flag'] = false
              })
              this.recommendations = res.data.data.recommendations;
              console.log(res.data.data)
            } else if (res.data != null) {
              SysUtil.showError("ERROR", "getServices", res.data.msg);
            } else {
              SysUtil.showError("ERROR", "getServices", "Service order config columns query failed!");
            }
          } else {
            SysUtil.showError("ERROR", "getServices", "Service order config columns query failed!");
          }
        }).catch(error => {
          SysUtil.showError("ERROR", "getServices", error.msg);
          console.log(error);
        })
      },

      getServiceOrder() {
        this.$axios.get('/service/serviceOrder', {
          params: {serviceOrderNo: this.search}
        }).then(res => {
          if (res.status == 200) {
            if (res.data != null && res.data.code == 1) {
              this.serviceOrder = res.data.data;
              // this.serviceOrder.custName = res.data.data.custName;
              // this.serviceOrder.custTel = res.data.data.custTel;
              // this.serviceOrder.custAddress = res.data.data.custAddress;
              // this.serviceOrder.prodModel = res.data.data.prodModel;
              // this.serviceOrder.prodSerial = res.data.data.prodSerial;
              // this.serviceOrder.custContact = res.data.data.custContact;
              // this.serviceOrder.serviceOrderId = res.data.data.serviceOrderId;
              // this.serviceOrder.agreement = res.data.data.agreement;
              // this.serviceOrder.statue = res.data.data.statue;
              // this.serviceOrder.amount = res.data.data.amount;
              // this.serviceOrder.supplierOrderId = res.data.data.supplierOrderId;
              // this.injectionData(this.serviceOrder.services, res.data.data.services);
              // this.injectionData(this.serviceOrder.conditions, res.data.data.conditions);
              // this.injectionData(this.serviceOrder.recommendations, res.data.data.recommendations);
              console.log(res.data.data)
            } else if (res.data != null) {
              SysUtil.showError("ERROR", "getServices", res.data.msg);
            } else {
              SysUtil.showError("ERROR", "getServices", "Service order query failed!");
            }
          } else {
            SysUtil.showError("ERROR", "getServices", "Service order query failed!");
          }
        }).catch(error => {
          SysUtil.showError("ERROR", "getServices", error.msg);
          console.log(error);
        })
      },

      getServiceOrders() {
        if (SysUtil.isNull(this.search)) {
          SysUtil.showError("ERROR", "getServices", "Please enter the search content!");
          return;
        }
        this.$axios.get('/service/serviceOrders', {
          params: {search: this.search}
        }).then(res => {
          if (res.status == 200) {
            if (res.data != null && res.data.code == 1) {
              this.serviceOrderList = res.data.data;
              this.showServiceOrderList = true;
              console.log(res.data.data)
            } else if (res.data != null) {
              SysUtil.showError("ERROR", "getServices", res.data.msg);
            } else {
              SysUtil.showError("ERROR", "getServices", "Service order query failed!");
            }
          } else {
            SysUtil.showError("ERROR", "getServices", "Service order query failed!");
          }
        }).catch(error => {
          SysUtil.showError("ERROR", "getServices", error.msg);
          console.log(error);
        })
      },

      selectServiceOrder(serviceOrder) {
        this.serviceOrder = serviceOrder;
        this.injectionData(this.services, this.serviceOrder.services);
        this.injectionData(this.conditions, this.serviceOrder.conditions);
        this.injectionData(this.recommendations, this.serviceOrder.recommendations);
        this.serviceOrder.status = this.serviceOrder.status;
        this.showServiceOrderList = false;
      },

      createServiceOrder() {
        if(SysUtil.isNull(this.serviceOrder.status) || "CREATE" == this.serviceOrder.status){
          let serviceOrder = {};
          if (SysUtil.isNotNull(this.serviceOrder.serviceOrderId)) {
            serviceOrder.serviceOrderId = this.serviceOrder.serviceOrderId;
          }
          serviceOrder.custCode = this.serviceOrder.custCode;
          serviceOrder.custName = this.serviceOrder.custName;
          serviceOrder.custTel = this.serviceOrder.custTel;
          serviceOrder.custAddress = this.serviceOrder.custAddress;
          serviceOrder.prodModel = this.serviceOrder.prodModel;
          serviceOrder.prodSerial = this.serviceOrder.prodSerial;
          serviceOrder.custContact = this.serviceOrder.custContact;
          serviceOrder.agreement = this.serviceOrder.agreement;
          serviceOrder.amount = this.serviceOrder.amount;
          if (SysUtil.isNull(this.serviceOrder.ccyCode)) {
            serviceOrder.ccyCode = 'HKD';
          } else {
            serviceOrder.ccyCode = this.serviceOrder.ccyCode;
          }
          serviceOrder.supplierOrderId = this.serviceOrder.supplierOrderId;
          serviceOrder.services = this.services.filter(e => e.flag);
          serviceOrder.conditions = this.conditions.filter(e => e.flag);
          serviceOrder.recommendations = this.recommendations.filter(e => SysUtil.isNotNull(e.description));
          this.$axios.post('/service/serviceOrder', serviceOrder).then(res => {
            if (res.status == 200) {
              if (res.data != null && res.data.code == 1) {
                console.log(res.data.data);
                this.serviceOrder.serviceOrderId = res.data.data.serviceOrderId;
                SysUtil.showDialog('SUCCESS', 'Save success!', () => {
                  this.selectedTab = "tab-1";
                }, null);
              } else if (res.data != null) {
                SysUtil.showError("ERROR", "createServiceOrder", res.data.msg);
              } else {
                SysUtil.showError("ERROR", "createServiceOrder", "Save failed!");
              }
            } else {
              SysUtil.showError("ERROR", "createServiceOrder", res.msg);
            }
          }).catch(error => {
            SysUtil.showError("ERROR", "createServiceOrder", error.msg);
            console.log(error);
          })
        }else{
          SysUtil.showError("ERROR", "createOrUpdateServiceOrder", "service cannot save with current status : " + this.serviceOrder.status);
        }
        
        
      },
      
      cancelServiceOrder(){
          if (SysUtil.isNull(this.serviceOrder.serviceOrderId)) {
              SysUtil.showError("ERROR", "cancelServiceOrder", "Service No cannot be empty!");
              return;
          }
          //complete状态的订单不能cancel
          if(this.serviceOrder.status == 'CREATE'){
            SysUtil.showDialog('WARNING', 'Confirm to cancel the service order?', () => {
              this.updateServiceOrderStatus('CANCEL');
            }, null);
            
          }else{
            SysUtil.showError("ERROR", "cancelServiceOrder", "Only create order can be canceled");
            return;
          }
      
      },

      completeServiceOrder() {
        if (SysUtil.isNull(this.serviceOrder.serviceOrderId)) {
          SysUtil.showError("ERROR", "completeServiceOrder", "Service No cannot be empty!");
          return;
        }
        //cancel状态的订单不能COMPLETE
        if(this.serviceOrder.status == 'CREATE'){
          let map = {};
          map.serviceOrderId = this.serviceOrder.serviceOrderId;
          this.$axios.put('/service/completeServiceOrder', map).then(res => {
            if (res.status == 200) {
              if (res.data != null && res.data.code == 1) {
                console.log(res.data.data);
                SysUtil.showDialog('SUCCESS', 'Complete service order success!', null, null);
              } else if (res.data != null) {
                SysUtil.showError("ERROR", "completeServiceOrder", res.data.msg);
              } else {
                SysUtil.showError("ERROR", "completeServiceOrder", "Complete service order failed!");
              }
            } else {
              SysUtil.showError("ERROR", "completeServiceOrder", res.msg);
            }
          }).catch(error => {
            SysUtil.showError("ERROR", "completeServiceOrder", error.msg);
            console.log(error);
          })
        }else{
          SysUtil.showError("ERROR", "completeServiceOrder", "Only create status order can be complete !");
          return;
        }
      },

      deleteServiceOrder() {
        if (SysUtil.isNull(this.serviceOrder.serviceOrderId)) {
          SysUtil.showError("ERROR", "completeServiceOrder", "Service No cannot be empty!");
          return;
        }
        //create状态的service order才可以delete
        if(this.serviceOrder.status == 'CREATE'){
          SysUtil.showDialog('WARNING', 'Confirm to delete the service order?', () => {
            this.updateServiceOrderStatus('DELETE');
          }, null);
        }else{
          SysUtil.showError("ERROR", "completeServiceOrder", "Only create status order can be deleted !");
          return;
        }
        
        
      },

      updateServiceOrderStatus(status) {
        this.$axios.post('/service/updateServiceOrderStatus', {
          params: {serviceOrderId: this.serviceOrder.serviceOrderId, status: status}
        }).then(res => {
          if (res.status == 200) {
            if (res.data != null && res.data.code == 1) {
              console.log(res.data.data);
              this.serviceOrder.status = status;
              SysUtil.showDialog('SUCCESS', status +  ' service order success!', null, null);
            } else if (res.data != null) {
              SysUtil.showError("ERROR", "updateServiceOrderStatus", res.data.msg);
            } else {
              SysUtil.showError("ERROR", "updateServiceOrderStatus", "Delete service order failed!");
            }
          } else {
            SysUtil.showError("ERROR", "updateServiceOrderStatus", res.msg);
          }
        }).catch(error => {
          SysUtil.showError("ERROR", "updateServiceOrderStatus", error.msg);
          console.log(error);
        })
      },
  
      serviceOrderView() {
        if (SysUtil.isNull(this.serviceOrder.serviceOrderId)) {
          SysUtil.showError("ERROR", "serviceOrderView", "Service No cannot be empty!");
          return;
        }
        this.$axios.get("/payment/getServiceOrderReceipt", {
          params: {
            serviceOrderId: this.serviceOrder.serviceOrderId,
          }
        })
          .then(res => {
            if (res.status == 200 && res.data != null) {
              if (res.data.code == 1) {
                this.preView = res.data.data;
                this.$router.push({
                  name: "ServiceOrderPreview",
                  params: {preView: this.preView,serviceOrderId:this.serviceOrder.serviceOrderId}
                });
              } else {
                SysUtil.showError("ERROR", "getServiceOrderReceipt", res.data.msg);
              }
            }
          }).catch(error => {
          SysUtil.showError("ERROR", "getServiceOrderReceipt", error.msg);
        });
      },

      serviceOrderPrint() {
        if (SysUtil.isNull(this.serviceOrder.serviceOrderId)) {
          SysUtil.showError("ERROR", "serviceOrderPrint", "Service No cannot be empty!");
          return;
        }
        this.$axios.get("/payment/printServiceOrderReceipt", {
          params: {
            serviceOrderId: this.serviceOrder.serviceOrderId,
          }
        })
          .then(res => {
            if (res.status == 200 && res.data != null) {
              if (res.data.code == 1) {
                console.log("print successed");
                SysUtil.showDialog("SUCCESS","Print successed and the print data has been sent!",()=>{},()=>{});
              } else {
                SysUtil.showError("ERROR", "printServiceOrderReceipt", res.data.msg);
              }
            }
          }).catch(error => {
          SysUtil.showError("ERROR", "printServiceOrderReceipt", error.msg);
        });
      },

      injectionData(mould, newData) {
        mould.forEach(e => {
          e.flag = false;
          e.description = '';
        });
        mould.forEach(item => {
          for (const i in newData) {
            if (newData[i].code == item.code) {
              item['flag'] = true;
              item.description = newData[i].description
              break;
              // if(item.description == '') {
              //   item['flag'] = false;
              // } else {
              //   item['flag'] = true;
              // }
            }
          }
        })
      },
      getVips() {
        if (SysUtil.isNull(this.vipSearch)) {
          SysUtil.showError("ERROR", "getServices", "Please enter the search content!");
          return;
        }
        this.$axios.get('/vipAdmin/searchVip', {
          params: {search: this.vipSearch}
        }).then(res => {
          if (res.status == 200) {
            if (res.data != null && res.data.code == 1) {
              this.vipList = res.data.data;
              if (this.vipList.length == 0) {
                SysUtil.showError("ERROR", "getVips", "Pls do registration first!");
              } else {
                this.showVipList = true;
              }
              console.log(res.data.data)
            } else if (res.data != null) {
              SysUtil.showError("ERROR", "getVips", res.data.msg);
            } else {
              SysUtil.showError("ERROR", "getVips", "VIP query failed!");
            }
          } else {
            SysUtil.showError("ERROR", "getVips", "VIP query failed!");
          }
        }).catch(error => {
          SysUtil.showError("ERROR", "getVips", error.msg);
          console.log(error);
        })
      },

      selectVip(vip) {
        this.serviceOrder.custCode = vip.vipCode;
        this.serviceOrder.custName = vip.vipName;
        this.serviceOrder.custTel = vip.vipTelephone;
        this.serviceOrder.custAddress = vip.vipAddress;
        this.showVipList = false;
      },
    }
}
</script>

<style scoped>
.title {
  padding:10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
.inp {
    position: relative;
    width: 30%;
}
.inps {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
}
.inp-icon {
    position: absolute;
    top: 50%;
    font-size: 25px;
    width: 27px;
    height: 27px;
    border: 1px solid #9e9e9e;
}
.service-inp {
  margin-left: 35px;
}
h4 {
    font-size: 20px;
    background: #ddd;
    border-radius: 3px;
    padding: 0 10px;
}
</style>
