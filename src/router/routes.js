
export default [
  {
    path: '/',
    component: () => import('layouts/empty_header'),
    redirect:'/admin',
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/login'),
        meta:{
          keepAlive: false
        },
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/default'),
    children: [
      {
        path: '/',
        name: 'ServiceOrder',
        component: () => import('pages/ServiceOrder'),
        meta:{
          keepAlive: true
        },
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('components/report/Dashboard'),
        meta:{
          keepAlive: false
        },
      },
      {
        path: 'ServiceOrderPreview',
        name: 'ServiceOrderPreview',
        component: () => import('pages/ServiceOrderPreview'),
        meta:{
          keepAlive: false
        },
      },
      {
        path: 'ShopSetting',
        name: 'ShopSetting',
        component: () => import('pages/ShopSetting'),
        meta:{
          keepAlive: false
        },
      },
    {
      path: 'last_7_days_for_shops',
        name: 'last_7_days_for_shops',
      component: () => import('components/report/last_7_days_for_shops'),
      meta:{
        keepAlive: false
      },
    },
    {
      path: 'last_6_months_for_shops',
      name: 'last_6_months_for_shops',
      component: () => import('components/report/last_6_months_for_shops'),
      meta:{
        keepAlive: false
      },
    },
    {
      path: 'month_on_month',
        name: 'month_on_month',
      component: () => import('components/report/month_on_month'),
      meta:{
        keepAlive: false
      },
    },
      {
        path: 'year_on_year',
        name: 'year_on_year',
        component: () => import('components/report/year_on_year'),
        meta:{
          keepAlive: false
        },
      },
      {
        path: 'shops_cur_year',
        name: 'shops_cur_year',
        component: () => import('components/report/shops_cur_year'),
        meta:{
          keepAlive: false
        },
      },
      {
        path: 'shops_day_sales',
        name: 'shops_day_sales',
        component: () => import('components/report/shops_day_sales'),
        meta:{
          keepAlive: false
        },
      },
      {
        path: 'shops_cur_months',
        name: 'shops_cur_months',
        component: () => import('components/report/shops_cur_months'),
        meta:{
          keepAlive: false
        },
      },
      {
        path: 'shops_item_cat_sub_cat',
        name: 'shops_item_cat_sub_cat',
        component: () => import('components/report/shops_item_cat_sub_cat'),
        meta:{
          keepAlive: false
        },
      },
    ]
  },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }

]
