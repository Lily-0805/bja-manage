// const getViewComponent = process.env.NODE_ENV === 'production' ? (path) => (resolve) => require(['@/views' + path + '.vue'], resolve) : (path) => require('@/views' + path + '.vue')

const getViewComponent = (path) => (resolve) => require(['@/views' + path + '.vue'], resolve)

export default [
	{path: '/', component: getViewComponent('/common/login'),meta: {title: '登录-吉丰物流后台管理'}},
	{path: '/index', component: getViewComponent('/common/index'),
        children:[
	        {path: '/admin/list', component: getViewComponent('/admin/list'),meta: {title: '员工管理-吉丰物流后台管理'}},//
	        {path: '/order/list', component: getViewComponent('/order/list'),meta: {title: '订单管理-吉丰物流后台管理'}},//
	        {path: '/order/detail', component: getViewComponent('/order/detail'),meta: {title: '订单详情-吉丰物流后台管理'}},//
	        {path: '/system/password', component: getViewComponent('/system/password'),meta: {title: '修改-吉丰物流后台管理'}},//
        ],
        meta: {title: '吉丰物流后台管理'}
    },
	{path: '/order/checkOrder', component: getViewComponent('/order/checkOrder'),meta: {title: '员工揽件'}},//

]
