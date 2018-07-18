import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import auth from '../utils/auth'

Vue.use(Router)

// 认证拦截
const loginPath = '/login'
const whiteList = [loginPath] // 白名单地址
const authInterceptor = (to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
        next();
        return false;
    }

    if (auth.getToken()) {
        next()
    } else {
        next(loginPath)
    }

}

const router = new Router({
    mode : 'history',
    routes : routes
})

router.beforeEach(authInterceptor)

export default router
