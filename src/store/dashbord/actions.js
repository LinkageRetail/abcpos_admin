import SysUtil from "../../utils/SysUtil";
import $axios from "axios";


export const getDashBordData = (store) =>{
    const {commit, state, dispatch, rootState} = store;
    return new Promise((resolve, reject)=>{
        $axios.get('/dashBord/getDashBordData',{considerShop:false}
        ).then(res => {
            if (res.status == 200 && res.data != null && res.data.code == 1) {
                console.log("getDashBordData resp", res)
                if(res.data.code == "1" && res.data.data){
                    console.log("commmmm", res)
                    commit("setDashbordData", res.data.data);
                    resolve();
                }else{
                    console.log("check reject");
                    reject();
                }
            }else{
                SysUtil.showError("ERROR", "getDashBordData", "getDashBordData失败");
                reject();
            }
        }).catch(error => {
            console.log("getDashBordData", error);
            SysUtil.showError("ERROR", "getDashBordData", "getDashBordData异常");
            reject();
        })

    })
}

export const getDaySalesDataByShop = (store) => {
    const {commit, state, dispatch, rootState} = store;
    return new Promise((resolve, reject)=>{
        $axios.get('/dashBord/getDaySalesDataByShop',
        ).then(res => {
            if (res.status == 200 && res.data != null && res.data.code == 1) {
                console.log("getDaySalesDataByShop resp", res)
                if(res.data.code == "1" && res.data.data){
                    console.log("commmmm", res)
                    commit("setTodaySales", res.data.data);
                    resolve();
                }else{
                    console.log("check reject");
                    reject();
                }
            }else{
                SysUtil.showError("ERROR", "getDaySalesDataByShop", "getDaySalesDataByShop失败");
                reject();
            }
        }).catch(error => {
            console.log("getDaySalesDataByShop", error);
            SysUtil.showError("ERROR", "getDaySalesDataByShop", "getDaySalesDataByShop异常");
            reject();
        })

    })
}

export const getMonthToNowByShop = (store) => {
    const {commit, state, dispatch, rootState} = store;
    return new Promise((resolve, reject)=>{
        $axios.get('/dashBord/getMonthToNowByShop',
        ).then(res => {
            if (res.status == 200 && res.data != null && res.data.code == 1) {
                console.log("getMonthToNowByShop resp", res)
                if(res.data.code == "1" && res.data.data){
                    console.log("commmmm", res)
                    commit("setMonthToNowByShop", res.data.data);
                    resolve();
                }else{
                    console.log("check reject");
                    reject();
                }
            }else{
                SysUtil.showError("ERROR", "getMonthToNowByShop", "getMonthToNowByShop失败");
                reject();
            }
        }).catch(error => {
            console.log("getMonthToNowByShop", error);
            SysUtil.showError("ERROR", "getMonthToNowByShop", "getMonthToNowByShop异常");
            reject();
        })

    })
}

export const getItemSubCatSalesData = (store, param) => {
    console.log("getItemSubCatSalesData 来了", param)
    const {commit, state, dispatch, rootState} = store;
    return new Promise((resolve, reject)=>{
        $axios.get('/dashBord/getItemSubCatSalesData',{params:{
                whCode:param.whCode,
                startDate:state.itemCatSalesFilter.startDate,
                endDate:state.itemCatSalesFilter.endDate,
                itemCat:param.itemCat
            }
        }).then(res => {
            if (res.status == 200 && res.data != null && res.data.code == 1) {
                console.log("getItemSubCatSalesData resp", res)
                if(res.data.code == "1" && res.data.data){
                    console.log("commmmm", res)
                    commit("setItemSubCatSalesData", res.data.data);
                    resolve();
                }else{
                    console.log("check reject");
                    reject();
                }
            }else{
                SysUtil.showError("ERROR", "getItemSubCatSalesData", "getItemSubCatSalesData失败");
                reject();
            }
        }).catch(error => {
            console.log("getItemSubCatSalesData", error);
            SysUtil.showError("ERROR", "getItemSubCatSalesData", "getItemSubCatSalesData异常");
            reject();
        })

    })
}


export const getYearToNowByShop = (store) => {
    const {commit, state, dispatch, rootState} = store;
    return new Promise((resolve, reject)=>{
        $axios.get('/dashBord/getYearToNowByShop',
        ).then(res => {
            if (res.status == 200 && res.data != null && res.data.code == 1) {
                console.log("getYearToNowByShop resp", res)
                if(res.data.code == "1" && res.data.data){
                    console.log("commmmm", res)
                    commit("setYearToNowByShop", res.data.data);
                    resolve();
                }else{
                    console.log("check reject");
                    reject();
                }
            }else{
                SysUtil.showError("ERROR", "getYearToNowByShop", "getYearToNowByShop失败");
                reject();
            }
        }).catch(error => {
            console.log("getYearToNowByShop", error);
            SysUtil.showError("ERROR", "getYearToNowByShop", "getYearToNowByShop异常");
            reject();
        })

    })
}


export const getLast7DaysSalesData = (store) => {
    const {commit, state, dispatch, rootState} = store;
    return new Promise((resolve, reject)=>{
        $axios.get('/dashBord/getLast7DaysSalesData',
        ).then(res => {
            if (res.status == 200 && res.data != null && res.data.code == 1) {
                console.log("getLast7DaysSalesData resp", res)
                if(res.data.code == "1" && res.data.data){
                    console.log("commmmm", res)
                    commit("setLast7DaysSalesData", res.data.data);
                    resolve();
                }else{
                    console.log("check reject");
                    reject();
                }
            }else{
                SysUtil.showError("ERROR", "getLast7DaysSalesData", "getLast7DaysSalesData失败");
                reject();
            }
        }).catch(error => {
            console.log("getLast7DaysSalesData", error);
            SysUtil.showError("ERROR", "getLast7DaysSalesData", "getLast7DaysSalesData异常");
            reject();
        })

    })

}



export const getItemCatSalesData = (store, param) => {
    const {commit, state, dispatch, rootState} = store;
    console.log("getItemCatSalesData filter", param)
    commit('setItemCatSalesFilter', param);
    return new Promise((resolve, reject)=>{
        $axios.get('/dashBord/getItemCatSalesData', {
            params: {
                chooseWhCode: state.itemCatSalesFilter.whCode,
                startDate: state.itemCatSalesFilter.startDate,
                endDate: state.itemCatSalesFilter.endDate
            }
        }).then(res => {
            if (res.status == 200 && res.data != null && res.data.code == 1) {
                console.log("getItemCatSalesData resp", res)
                if(res.data.code == "1" && res.data.data){
                    console.log("commmmm", res)
                    commit("setItemCatSalesData", res.data.data);
                    resolve();
                }else{
                    console.log("check reject");
                    reject();
                }
            }else{
                SysUtil.showError("ERROR", "getItemCatSalesData", "getItemCatSalesData");
                reject();
            }
        }).catch(error => {
            console.log("getLast7DaysSalesData", error);
            SysUtil.showError("ERROR", "getItemCatSalesData", "getItemCatSalesData");
            reject();
        })

    })

}



export const getLast6MonthsSalesData = (store) => {
    const {commit, state, dispatch, rootState} = store;
    return new Promise((resolve, reject)=>{
        $axios.get('/dashBord/getLast6MonthsSalesData',
        ).then(res => {
            if (res.status == 200 && res.data != null && res.data.code == 1) {
                console.log("getLast6MonthsSalesData resp", res)
                if(res.data.code == "1" && res.data.data){
                    console.log("commmmm", res)
                    commit("setLast6MonthsSalesData", res.data.data);
                    resolve();
                }else{
                    console.log("check reject");
                    reject();
                }
            }else{
                SysUtil.showError("ERROR", "getLast6MonthsSalesData", "getLast6MonthsSalesData失败");
                reject();
            }
        }).catch(error => {
            console.log("getLast7DaysSalesData", error);
            SysUtil.showError("ERROR", "getLast6MonthsSalesData", "getLast6MonthsSalesData异常");
            reject();
        })

    })

}


export const getLast3YearOnMonthData = (store) => {
    const {commit, state, dispatch, rootState} = store;
    return new Promise((resolve, reject)=>{
        $axios.get('/dashBord/getLast3YearOnMonthData',
        ).then(res => {
            if (res.status == 200 && res.data != null && res.data.code == 1) {
                console.log("getLast3YearOnMonthData resp", res)
                if(res.data.code == "1" && res.data.data){
                    console.log("commmmm", res)
                    commit("setLast3YearOnMonthData", res.data.data);
                    resolve();
                }else{
                    console.log("check reject");
                    reject();
                }
            }else{
                SysUtil.showError("ERROR", "getLast3YearOnMonthData", "getLast3YearOnMonthData失败");
                reject();
            }
        }).catch(error => {
            console.log("getLast3YearOnMonthData", error);
            SysUtil.showError("ERROR", "getLast3YearOnMonthData", "getLast3YearOnMonthData异常");
            reject();
        })
    })
}


export const getLast3YearOnYearData = (store) => {
    const {commit, state, dispatch, rootState} = store;
    return new Promise((resolve, reject)=>{
        $axios.get('/dashBord/getLast3YearOnYearData',
        ).then(res => {
            if (res.status == 200 && res.data != null && res.data.code == 1) {
                console.log("getLast3YearOnYearData resp", res)
                if(res.data.code == "1" && res.data.data){
                    console.log("commmmm", res)
                    commit("setLast3YearOnYearData", res.data.data);
                    resolve();
                }else{
                    console.log("check reject");
                    reject();
                }
            }else{
                SysUtil.showError("ERROR", "getLast3YearOnYearData", "getLast3YearOnYearData失败");
                reject();
            }
        }).catch(error => {
            console.log("getLast3YearOnYearData", error);
            SysUtil.showError("ERROR", "getLast3YearOnYearData", "getLast3YearOnYearData异常");
            reject();
        })
    })
}


