import Axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import auth from '../utils/auth'
import router from '../routes/router'

const http = Axios.create({
    baseURL: '/portalapi',
    timeout: 180000, // 请求超时时间
    withCredentials: true
})

// 请求拦截器
http.interceptors.request.use(request => {
    if(auth.getToken()){
	    request.headers.common['Authorization'] = auth.getToken('adminNo')
    }
    return request
}, error => {
    Promise.reject(error)
})

// 响应拦截器
const duration = 3000 // 提示消息框持续时间
http.interceptors.response.use(
    response => {
        const rs = response.data
        // 未登录
        if (rs.retCode == '000200') {
            auth.removeToken('adminType')
	        auth.removeToken('adminNo')

	        router.push({
		        path: '/'

	        })
            return
        }


        return response.data
    },
    error => {
        Message({
            message: error.message,
            type: 'error',
            duration: duration
        })
        return Promise.reject(error)
    }
)

export default http
