"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_router_1 = require("vue-router");
const routes = [
    {
        path: '/',
        name: 'Login',
        component: () => Promise.resolve().then(() => require('../views/LoginView.vue'))
    }
];
const router = (0, vue_router_1.createRouter)({
    history: (0, vue_router_1.createWebHistory)(process.env.BASE_URL),
    routes
});
exports.default = router;
//# sourceMappingURL=index.js.map