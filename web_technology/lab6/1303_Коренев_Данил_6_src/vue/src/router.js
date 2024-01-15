import {createRouter, createWebHistory} from "vue-router";
import Login from "./components/Login.vue"
import Account from "./components/Account.vue"
import AdminPanel from "@/components/AdminPanel.vue";

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Login },
        { path: '/login', name: "Login", component: Login },
        {
            path: '/account/:login',
            name: "Account",
            component: Account,
            props: true
        },
        {
            path: '/adminpanel',
            name: 'AdminPanel',
            component: AdminPanel,
        }
    ]
})