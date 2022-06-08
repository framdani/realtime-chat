import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'



const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: false,
    },
  },
  
   {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/SignupView.vue'),
    meta: {
      requiresAuth: false,
    },
    },
    {
      path :'/login',
      name : 'Login',
      component:() => import('../views/LoginView.vue'),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/users',
      name: 'Users',
      component: () => import('../views/TestView.vue'),
      meta: {
        requiresAuth: true,
      },
      
      },
    //add path to chatroom
]



//! check if the user is looged
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

export function isLoggedIn() {
  const val = localStorage.getItem('user');
  if (val === null)
    return false;
  // const token = JSON.parse(val);
  
  // alert(`Token  : ${token}`)
  return true;
}

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (isLoggedIn()) {
      next();
    } else {
    next('/login');
    }
  } else {
   next();
  }
});