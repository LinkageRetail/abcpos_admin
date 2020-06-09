import SysUtil from "../../utils/SysUtil";
import { uid, filter ,date } from 'quasar';

export const setDashbordData = (state,dashbordData) => {
    console.log("jinlaile", dashbordData)
    state.dashBord = dashbordData;
}

export const setTodaySales = (state, todaySales) => {
    state.todaySales = todaySales;
}


export const setMonthToNowByShop = (state, monthToNowDate) => {
    state.curMonthToNowByShop = monthToNowDate;
}


export const setYearToNowByShop = (state, yearToNowDate) => {
    state.curYearToNowByShop = yearToNowDate;
}

export const setItemCatSalesFilter = (state, param) => {
    state.itemCatSalesFilter.startDate = param.startDate;
    state.itemCatSalesFilter.endDate = param.endDate;
    state.itemCatSalesFilter.whCode = param.whCode;
}

export const setItemSubCatSalesData = (state, data) => {
    state.itemSubCatSalesData = data;
    console.log("state.itemSubCatSalesData",state.itemSubCatSalesData)
}

export const setLast7DaysSalesData = (state, last7DaysSalesData) => {
    state.last7DaysData = last7DaysSalesData;
}

export const setItemCatSalesData = (state, itemCatSalesData) => {
    state.ItemCatSalesData = itemCatSalesData;
}

export const setLast6MonthsSalesData = (state, last6MonthsSalesData) => {
    state.last6MonthsData = last6MonthsSalesData;
}


export const setLast3YearOnMonthData = (state, last3YearOnMonthData) => {
    state.last3YearsOnMonth = last3YearOnMonthData;
    console.log(state.last3YearsOnMonth);
}

export const setLast3YearOnYearData = (state, last3YearOnYearData) => {
    state.last3YearsOnYear = last3YearOnYearData;
    console.log(state.last3YearsOnYear);
}


