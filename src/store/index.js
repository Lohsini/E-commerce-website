import Vue from 'vue';
// import { axios } from 'vue/types/umd';
import Vuex from 'vuex';
import axios from 'axios';

import productsModules from './products';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    cart: {
      carts: [],
    },
  },
  actions: {
    updateLoading(context, status) {
      context.commit('LOADING', status);
    },
    getCart(context) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      context.commit('LOADING', true);
      axios.get(api).then((response) => {
        context.commit('CART', response.data.data);
        // console.log('取得購物車列表:', response.data.products);
        context.commit('LOADING', false);
      });
    },
    removeCart(context, id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      context.commit('LOADING', true);
      axios.delete(api).then((response) => {
        // eslint-disable-next-line no-console
        console.log('從購物車刪除:', response.data.message);
        context.dispatch('getCart');
        context.commit('LOADING', false);
      });
    },
    addtoCart(context, { id, qty }) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      context.commit('LOADING', true);
      const item = {
        product_id: id,
        qty,
      };
      axios.post(url, { data: item }).then((response) => {
        context.commit('LOADING', false);
        context.dispatch('getCart');
        // eslint-disable-next-line no-console
        console.log('加入購物車:', response.data.message);
      });
    },
  },
  mutations: {
    LOADING(state, status) {
      state.isLoading = status;
    },
    CART(state, payload) {
      state.cart = payload;
    },
  },
  getters: {
    isLoading(state) {
      return state.isLoading;
    },
    cart(state) {
      return state.cart;
    },
  },
  modules: {
    productsModules,
  },
});
