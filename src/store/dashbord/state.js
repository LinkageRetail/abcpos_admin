export default {
    todaySales:{
        shops: [],
        amts:[]
    },
    curMonthToNowByShop:{
        shops: [],
        amts:[]
    },
    curYearToNowByShop:{
        shops: [],
        amts:[],
    },
    last7DaysData:{
        legendData:[],
        xAxisData:[],
        seriesData:[]
    },
    last6MonthsData:{
        legendData:[],
        xAxisData:[],
        seriesData:[]
    },
    last3YearsOnMonth:{
        legendData:[],
        xAxisData:[],
        seriesData:[]
    },
    last3YearsOnYear:{
        legendData:[],
        xAxisData:[],
        seriesData:[]
    },
    ItemCatSalesData:{
        legendData:[],
        xAxisData:[],
        seriesData:[]
    },
    dashBord:{
        todaySalesAmt:0,
        todaySalesCount:0,
        todayAmtPerOrder:0,
        yearTarget:{
            amt:"0",
            rate:"0",
            amtCurYear:"0",
            amtLastYear:"0"
        },
        curMonthToNow:{
            amt:"0",
            rate:"0",
            amtCurMon:"0",
            amtLastMon:"0"
        },
        curYearToNow:{
            amt:"0",
            rate:"0",
            amtCurYear:"0",
            amtLastYear:"0"
        },
        last3YearsOnMonth:[
            // {
            //     date: '2015/08',
            //     amt: "$121,682.80",
            // }
        ],
        last7Days:[
            // {
            //     date: '08/30',
            //     amt: "$4.365.2",
            //     count:3
            // }
        ],
        last6Month:[
            // {
            //     date: '五月',
            //     count:62,
            //     amt: "$121,682.80",
            // }
        ],
        last3Years:[
            // {
            //     date: '2018',
            //     amt: "$803,921,50",
            // }
        ],
        itemCatAmt:[
            // {
            //     cat: 'LTHR',
            //     amt: "$803,921,50",
            // }
        ],
        itemSubCatSalesData:[

        ]
    },

    itemCatSalesFilter:{
        startDate:'',
        endDate:'',
        whCode:'',
    }
}

