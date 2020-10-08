import Vue from 'vue';
import VueRouter from 'vue-router';
import ManagerPage from '@/views/ManagerPage.vue';
import Products from '@/components/pages/products.vue';
import CustomerOrder from '@/components/pages/customerOrder.vue';
import orderlist from '@/components/pages/orderlist.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/',
  },
  {
    name: 'shoppage',
    path: '/',
    component: () => import('../views/shopPage.vue'),
    children: [
      {
        name: 'landingPage',
        path: '/',
        component: () => import('@/components/shopPages/landingPage.vue'),
      },
      {
        name: 'landingPage',
        path: '/landingPage',
        component: () => import('@/components/shopPages/landingPage.vue'),
      },
      {
        name: 'shopping',
        path: '/shopping',
        component: () => import('@/components/shopPages/shopping.vue'),
      },
      {
        name: 'cart',
        path: '/cart',
        component: () => import('@/components/shopPages/cart.vue'),
      },
      {
        name: 'loginPage',
        path: '/loginpage',
        component: () => import('@/components/shopPages/loginPage.vue'),
      },
    ],
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
        meta: { requiresAuth: true },
      },
      {
        name: 'orderlist',
        path: 'orderlist',
        component: orderlist,
        meta: { requiresAuth: true },
      },
      {
        name: 'orderlist',
        path: 'orderlist',
        component: orderlist,
        meta: { requiresAuth: true },
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
