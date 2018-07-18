import http from '../utils/http'
import Qs from 'qs'

/**
 * 订单服务
 */
export default {
	list: (data) => http.post('/order/list', Qs.stringify(data)), // 列表
	detail: (data) => http.post('/order/detail', Qs.stringify(data)),//详情

	addDes: (data) => http.post('/order-description/add', Qs.stringify(data)),//订单描述添加
	editDes: (data) => http.post('/order-description/edit', Qs.stringify(data)),//订单描述修改





	//揽件
	// /portalapi/order/collect-goods
	// orderNo: 必填，只有快递员可以操作此接口，且只能操作未揽件状态的订单

}


