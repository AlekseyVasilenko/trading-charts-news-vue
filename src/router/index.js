import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Login from '../components/Login.vue'
import Cabinet from '../components/Cabinet.vue'
import Register from '../components/Register.vue'
import E404 from '../components/E404.vue'
import Chart from '../components/Chart.vue'
import News from '../components/News.vue'

Vue.use(VueRouter);

let routes = [
    {
        path: '/',
        name: 'root',
        redirect: {name: 'login'}
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/cabinet',
        name: 'cabinet',
        component: Cabinet,
        redirect: {name: 'chart'},
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: 'chart',
                name: 'chart',
                component: Chart
            },
            {
                path: 'news',
                name: 'news',
                component: News,
            }
        ]
    },
    {
        path: '*',
        component: E404
    }
];

let router = new VueRouter({
    mode: 'history',
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        store.getters.isLoggedIn
            ? next()
            : next({name: 'login'})
    } else {
        store.getters.isLoggedIn
            ? next({name: 'cabinet'})
            : next()
        // next()
    }
});

export default router;
