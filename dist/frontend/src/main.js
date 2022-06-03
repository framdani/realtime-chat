"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const App_vue_1 = require("./App.vue");
const router_1 = require("./router");
const store_1 = require("./store");
(0, vue_1.createApp)(App_vue_1.default).use(store_1.default).use(router_1.default).mount('#app');
//# sourceMappingURL=main.js.map