import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/components/pages/login.vue';
import Dashboard from '@/components/dashboard.vue';
import Products from '@/components/pages/products.vue';
import CustomerOrder from '@/components/pages/customerOrder.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '*',
    redirect: '/login',
  },
  {
    name: '登入',
    path: '/login',
    component: Login,
  },
  {
    name: 'dashboard',
    path: '/admin',
    component: Dashboard,
    children: [
      {
        name: 'products',
        path: 'products',
        component: Products,
        // meta: { requiresAuth: true },
      },
    ],
  },
  {
    name: 'dashboard',
    path: '/',
    component: Dashboard,
    children: [
      {
        name: '模擬訂單',
        path: '/customerorder',
        component: CustomerOrder,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
