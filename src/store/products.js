import axios from 'axios';

export default {
  namespaced: true, // actions、mutations、getters將成為區域變數
  state: {
    products: [],
    categories: [],
  },
  actions: {
    getProducts(context) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      context.commit('LOADING', true, { root: true });
      axios.get(url).then((response) => {
        context.commit('PRODUCTS', response.data.products);
        // console.log('取得產品列表:', response.data.products);
        context.commit('CATEGORIES', response.data.products);
        context.commit('LOADING', false, { root: true });
      });
    },
  },
  mutations: {
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    CATEGORIES(state, payload) {
      const categories = new Set();
      payload.forEach((item) => {
        categories.add(item.category);
      });
      state.categories = Array.from(categories);
    },
  },
  getters: {
    products(state) {
      return state.products;
    },
    categories(state) {
      return state.categories;
    },
  },
};
