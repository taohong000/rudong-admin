import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
},
{
  path: '/404',
  component: () => import('@/views/404'),
  hidden: true
},

{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  name: 'Dashboard',
  hidden: true,
  children: [{
    path: 'dashboard',
    component: () => import('@/views/dashboard/index')
  }]
},

  // 点餐统计
{
  path: '/order',
  component: Layout,
  children: [{
    path: 'index',
    name: 'order',
    component: () => import('@/views/order/index'),
    meta: {
      title: '点餐统计',
      icon: 'form'
    }
  }]
},

  // 点餐系统
{
  path: '/cookbook',
  component: Layout,
  name: 'cookbook',
  redirect: '/cookbook/index',
  meta: {
    title: '菜谱管理'
  },
  children: [{
    path: 'index',
    name: 'cookbookIndex',
    component: () => import('@/views/cookbook/index'),
    meta: {
      title: '菜谱列表',
      icon: 'table'
    }
  }, {
    path: 'add',
    name: 'cookbookAdd',
    component: () => import('@/views/cookbook/addAndEdit'),
    meta: {
      title: '添加菜谱'
    },
    hidden: true
  },
  {
    path: 'edit/:id',
    name: 'cookbookEdit',
    component: () => import('@/views/cookbook/addAndEdit'),
    meta: {
      title: '修改菜谱'
    },
    hidden: true
  }
  ]
},

  // 人员管理
{
  path: '/user',
  component: Layout,
  name: 'user',
  redirect: '/user/index',
  meta: {
    title: '人员管理'
  },
  children: [{
    path: 'index',
    name: 'userIndex',
    component: () => import('@/views/user/index'),
    meta: {
      title: '人员列表',
      icon: 'user'
    }

  }, {
    path: 'add',
    name: 'userAdd',
    component: () => import('@/views/user/addAndEdit'),
    meta: {
      title: '添加人员'
    },
    hidden: true
  }, {
    path: 'edit/:id',
    name: 'userEdit',
    component: () => import('@/views/user/addAndEdit'),
    meta: {
      title: '修改人员'
    },
    hidden: true
  }]
},

{
  path: '*',
  redirect: '/404',
  hidden: true
}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
