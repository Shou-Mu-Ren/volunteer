import VueRouter from 'vue-router'
var title = '理想志愿'
const router = new VueRouter({
    linkExactActiveClass: 'current',
    routes: [
        {
            name: 'index',
            path: '/index',
            meta: {
                title: '首页',
            },
            component: () => import('@/pages/home/index.vue'),
        },
        {
            name: 'findschool',
            path: '/findschool',
            meta: {
                title: '找大学',
            },
            component: () => import('@/pages/school/index.vue'),
        },
        {
            name: 'findmajor',
            path: '/findmajor',
            meta: {
                title: '找专业',
            },
            component: () => import('@/pages/major/index.vue'),
        },
        {
            name: 'login',
            path: '/login',
            meta: {
                title: '登录',
            },
            component: () => import('@/pages/login/index.vue'),
        },
        {
            name: 'forget',
            path: '/forget',
            meta: {
                title: '忘记密码',
            },
            component: () => import('@/pages/forget/index.vue'),
        },
        {
            name: 'info',
            path: '/info',
            meta: {
                title: '个人信息',
            },
            component: () => import('@/pages/info/index.vue'),
        },
        {
            name: 'fill',
            path: '/fill',
            meta: {
                title: '志愿填写',
            },
            component: () => import('@/pages/fill/index.vue'),
        },
        {
            name: 'vip',
            path: '/vip',
            meta: {
                title: '我的VIP',
            },
            component: () => import('@/pages/vip/index.vue'),
        },
        {
            name: 'consultLogin',
            path: '/consultLogin',
            meta: {
                title: '咨询师登录',
            },
            component: () => import('@/pages/consultLogin/index.vue'),
        },
        {
            name: 'chat',
            path: '/chat',
            meta: {
                title: '咨询',
            },
            component: () => import('@/pages/chat/index.vue'),
        },
        { path: '*', redirect: { name: 'login' } }
    ]
})
router.beforeEach((to,from,next) => {
    window.scroll(0, 0);
    next();
})
//全局后置-----------路由守卫
router.afterEach((to, from) => {
	if (to.meta.title) {
		document.title = title + '-' +to.meta.title
	}
})
export default router