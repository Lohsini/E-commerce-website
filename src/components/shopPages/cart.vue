<template>
  <div class="shopping">
    <loading :active.sync="isLoading"></loading>

    <div class="jumbotron">
      <div>
        <h1>您的購物車</h1>
      </div>
    </div>

  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      products: [],
      product: {},
      cart: [],
      cartLength: 0,
      pagination: {},
      isLoading: false,
      status: {
        loadingItem: '',
      },
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        // eslint-disable-next-line no-console
        // console.log(response.data);
        vm.isLoading = false;
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
      });
    },
    getProduct(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      vm.status.loadingItem = id;
      this.$http.get(api).then((response) => {
        vm.product = response.data.product;
        $('#productModal').modal('show');
        vm.product.num = 1;
        vm.status.loadingItem = '';
      });
    },
    addtoCart(id, qty = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const cart = {
        product_id: id,
        qty,
      };
      vm.status.loadingItem = id;
      this.$http.post(api, { data: cart }).then((response) => {
        // eslint-disable-next-line no-console
        console.log(response.data);
        vm.status.loadingItem = '';
        vm.getCart();
        $('#productModal').modal('hide');
      });
    },
    getCart() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.cart = response.data.data;
        vm.cartLength = vm.cart.carts.length;
        // console.log(vm.cartLength);
        // console.log(response.data.data);
        vm.isLoading = false;
      });
    },
    removeCartItem(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      vm.isLoading = true;
      this.$http.delete(api).then((response) => {
        // eslint-disable-next-line no-console
        console.log(response.data);
        vm.getCart();
        vm.isLoading = false;
      });
    },
    createOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      const order = vm.form;
      vm.isLoading = true;
      this.$http.post(api, { data: order }).then((response) => {
        // eslint-disable-next-line no-console
        console.log('訂單已建立', response.data);
        vm.isLoading = false;
      });
    },
  },
  created() {
    this.getProducts();
    this.getCart();
  },
};
</script>

<style lang="scss" scoped>
.shopping{
  .container{
    .row{
      .items{
        .card{
          a{
            text-decoration: none;
          }
        }
      }
    }
  }
}
</style>
