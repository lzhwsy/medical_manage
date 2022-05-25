import {createRouter, createWebHistory} from 'vue-router'


const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('views/login/login')
    },
    {
        name: 'register',
        path: '/register',
        component: () => import('views/login/register')
    },
    {
        name: 'home',
        path: '/home',
        component: () => import('views/Home'),
        redirect: '/main',
        children: [
            {
                name: 'homeMain',
                path: '/main',
                component: () => import('components/content/home/HomeMain')
            },
            {
                name:'DoctorUser',
                path:'/doctor_user',
                component:()=>import('views/user/DoctorUser')
            },
            {
                name:'ConsumerUser',
                path:'/consumer_user',
                component:()=>import('views/user/ConsumerUser')
            },
            ]
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach(((to, from, next) => {
    if (to.path === '/login') return next()
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr || tokenStr == "undefined") return next('/login')
    next()
}))
export default router
