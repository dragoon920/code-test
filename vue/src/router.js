import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Maps from './views/Maps.vue'
import Admin from './views/Admin.vue'
import AdminOnly from './views/AdminOnly.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/map',
      name: 'Map',
      component: Maps,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      meta: { 
        requiresAdmin: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/adminonly',
      name: 'AdminOnly',
      component: AdminOnly
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('user') === 'true') {
      next()
      return
    }
    next('/login') 
  }else if(to.matched.some(record => record.meta.requiresAdmin)) {
    if (localStorage.getItem('admin') === 'true' ) {
      next()
      return
    }else{
      next('/adminonly') 
    }
  } else {
    next() 
  }
})

export default router