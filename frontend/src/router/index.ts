import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'



const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: () => import('../views/AboutView.vue')
  // },
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



// routes.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (isAuthenticated()) {
//       next();
//     } else {
//       next("/");
//     }
//   } else {
//     next();
//   }
// });

//! check if the user is looged
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

export function isLoggedIn() {
  const token = JSON.parse(localStorage.getItem('user') || '');
  if (token)
  {
    alert(`${localStorage.getItem('user')}`)
    return true;
  }
  return false;
  //return !!authToken && !isTokenExpired(authToken)
}

// router.beforeEach((to, from, next) => {

// })

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (isLoggedIn()) {
      next();
    } else {
      next('/');
    }
  } else {
    next();
  }
});