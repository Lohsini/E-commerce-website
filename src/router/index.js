import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginPage from '@/views/LoginPage.vue';
import ManagerPage from '@/views/ManagerPage.vue';
import Products from '@/components/pages/products.vue';
import CustomerOrder from '@/components/pages/customerOrder.vue';
import Home from '@/views/Home.vue';

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
    redirect: '/',
  },
  {
    name: 'Home',
    path: '/',
    component: Home,
  },
  {
    name: '登入',
    path: '/login',
    component: LoginPage,
  },
  {
    name: 'managerpage',
    path: '/admin',
    component: ManagerPage,
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
    name: 'managerpage',
    path: '/customerorder',
    component: ManagerPage,
    children: [
      {
        name: '模擬訂單',
        path: '/',
        component: CustomerOrder,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'activee',
});

export default router;
