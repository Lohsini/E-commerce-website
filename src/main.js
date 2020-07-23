import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'bootstrap';
import Validator from 'vue-validator';
import App from './App.vue';
import 'vue-loading-overlay/dist/vue-loading.css';
import router from './router';
import currencyFilter from './filters/currency';
import './bus';

Vue.use(Validator);

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
