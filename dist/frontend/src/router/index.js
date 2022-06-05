"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = void 0;
const vue_router_1 = require("vue-router");
const HomeView_vue_1 = require("../views/HomeView.vue");
const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView_vue_1.default
    },
    {
        path: '/signup',
        name: 'Signup',
        component: () => Promise.resolve().then(() => require('../views/SignupView.vue')),
        meta: {
            requiresAuth: false,
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: () => Promise.resolve().then(() => require('../views/LoginView.vue')),
        meta: {
            requiresAuth: false,
        },
    },
    {
        path: '/users',
        name: 'Users',
        component: () => Promise.resolve().then(() => require('../views/TestView.vue')),
        meta: {
            requiresAuth: true,
        },
    },
];
const router = (0, vue_router_1.createRouter)({
    history: (0, vue_router_1.createWebHistory)(process.env.BASE_URL),
    routes
});
exports.default = router;
function isLoggedIn() {
    const token = JSON.parse(localStorage.getItem('user') || '');
    if (token) {
        alert(`${localStorage.getItem('user')}`);
        return true;
    }
    return false;
}
exports.isLoggedIn = isLoggedIn;
router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (isLoggedIn()) {
            next();
        }
        else {
            next('/');
        }
    }
    else {
        next();
    }
});
//# sourceMappingURL=index.js.map