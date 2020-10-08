import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'bootstrap';
import Validator from 'vue-validator';
import Vuex from 'vuex';
import App from './App.vue';
import 'vue-loading-overlay/dist/vue-loading.css';
import router from './router';
import currencyFilter from './filters/currency';
import './bus';
import store from './store';

Vue.use(Validator);

Vue.use(Vuex);
Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter);
axios.defaults.withCredentials = true;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
