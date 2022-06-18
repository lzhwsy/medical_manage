import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {path: '/', redirect: '/login',},
    {name: 'login', path: '/login', component: () => import('views/login/login')},
    {name: 'register', path: '/register', component: () => import('views/login/register')},
    {name: 'home', path: '/home', component: () => import('views/Home'), redirect: '/main',
        children: [
            {name: 'homeMain', path: '/main', component: () => import('components/content/home/HomeMain')},
            {name: 'DoctorUser', path: '/doctor_user', component: () => import('views/user/DoctorUser')},
            {name: 'ConsumerUser', path: '/consumer_user', component: () => import('views/user/ConsumerUser')},
            {name:'rights',path:'/rights',component:()=>import('views/power/Rights')},
            {name:'roles',path:'/roles',component:()=>import('views/power/Roles')},
            {name:'TCMedical',path:'/TCM',component:()=>import('views/medical/MedicalList')},
            {name:'MedicalType',path:'/medical_type',component:()=>import('views/medical/MedicalType')},
            {name:'MedicalParams',path:'/MedicalParams',component:()=>import('views/medical/MedicalParams')},
            {name:'AddMedical',path:'/AddMedical',component:()=>import('views/medical/AddMedical')},
            {name:'EditMedical',path:'/EditMedical',component:()=>import('views/medical/EditMedical')},
            {name:'OrderProcessing',path:'/order',component:()=>import('views/order/OrderProcessing')},
        ]
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach(((to, from, next) => {
    if (to.path === '/login' || to.path === '/register') return next()
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr || tokenStr == "undefined") return next('/login')
    next()
}))
export default router
