import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    name:'login',
    path: '/login',
    component:() => import('../components/content/login/login')
  },
  {
    name:'register',
    path:'/register',
    component:()=>import('components/content/login/register')
  },
  {
    name:'home',
    path:'/home',
    component:()=>import('views/Home')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(((to, from, next) => {
  if(to.path ==='/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr || tokenStr == "undefined") return next('/login')
  next()
}))
export default router
