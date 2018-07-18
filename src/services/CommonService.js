import http from '../utils/http'
import Qs from 'qs'

/**
 * 通用服务
 */
export default {
	login: (data) => http.post('/login/login', Qs.stringify(data)), // 登录
	password: (data) => http.post('/admin/pwd-reset', Qs.stringify(data)), // 修改密码
	logout: () => http.post('/login/logout'), // 退出登录


}