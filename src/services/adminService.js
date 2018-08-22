import http from '../utils/http'
import Qs from 'qs'

/**
 * 用户服务
 */
export default {
	list: (data) => http.post('/admin/list', Qs.stringify(data)), // 列表
	add: (data) => http.post('/admin/add', Qs.stringify(data)), // 新增
	edit: (data) => http.post('/admin/edit', Qs.stringify(data)), // 修改
	adminAreaList: (data) => http.post('/admin-area/list', Qs.stringify(data)), // 分区管理员--地区


}