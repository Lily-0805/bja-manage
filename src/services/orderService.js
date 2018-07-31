import http from '../utils/http'
import Qs from 'qs'

/**
 * 订单服务
 */
export default {
	list: (data) => http.post('/order/list', Qs.stringify(data)), // 列表
	detail: (data) => http.post('/order/detail', Qs.stringify(data)),//详情
	edit: (data) => http.post('/order/edit' , Qs.stringify(data)),//修改

	addDes: (data) => http.post('/order-description/add', Qs.stringify(data)),//订单描述添加
	editDes: (data) => http.post('/order-description/edit', Qs.stringify(data)),//订单描述修改

	collect: (data) => http.post('/order/collect-goods', Qs.stringify(data)),//快递员揽件

	goodsList: (data) => http.post('/goods/list', Qs.stringify(data)),//快递员揽件

	batchUpdate: (data) => http.post('/order/batch-update-status', Qs.stringify(data)),//列表页批量修改状态

}


