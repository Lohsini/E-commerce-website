<template>
  <div class="shoppage">

    <!-- navbar內含購物車會加數量 -->
    <nav class="navbar navbar-light bg-light" style="position:sticky; top: 0; z-index:10;">
      <router-link class="navbar-brand" to="/">
        <i class="fas fa-paw text-info"></i>
        貓咪與他的賣場
      </router-link>

      <router-link class="nav-link after" to="/loginpage">管理員登入</router-link>
      <router-link class="nav-link after" to="/loginpage">會員登入</router-link>
      <router-link class="nav-link after" to="/shopping">去逛逛</router-link>
      <!-- <router-link class="nav-link after" to="/cart">結帳頁面</router-link> -->

      <!-- 購物車內的數量 (Button 內包含 icon, 數量 badge) -->
      <div class="dropdown ml-auto">
        <button class="btn btn-sm btn-cart" data-toggle="dropdown" data-flip="false">
          <i class="fa fa-shopping-cart text-dark fa-2x" aria-hidden="true"></i>
          <span class="badge badge-pill badge-danger">{{cart.carts.length}}</span>
          <span class="sr-only">unread messages</span>
        </button>
        <div
          class="dropdown-menu dropdown-menu-right p-3"
          style="min-width: 300px"
          data-offset="400"
        >
          <h6>已選擇商品</h6>
          <table class="table table-sm">
            <tbody>
              <tr v-for="item in cart.carts" :key="item.id">
                <!-- v-if="cart.carts.length" -->
                <td class="align-middle text-center">
                  <a href="#" class="text-muted" @click.prevent="removeCart(item.id)">
                    <i class="fas fa-trash"></i>
                  </a>
                </td>
                <td class="align-middle">{{ item.product.title }}</td>
                <td class="align-middle">{{ item.qty }}{{item.product.unit}}</td>
                <td class="align-middle text-right">{{item.total}}</td>
              </tr>
            </tbody>
          </table>
          <router-link class="btn btn-primary btn-block" to="/cart">
            <i class="fa fa-cart-plus" aria-hidden="true"></i> 結帳去</router-link>
        </div>
      </div>
    </nav>

    <Loading :active.sync="isLoading"></Loading>

    <router-view />

    <Footer />

  </div>
</template>

<script>
import Footer from '@/components/footer.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    Footer,
  },
  data() {
    return {
      // cart: {
      //   carts: [],
      // },
    };
  },
  computed: {
    // isLoading() {
    //   return this.$store.state.isLoading;
    // },
    // cart() {
    //   return this.$store.state.cart;
    // },
    ...mapGetters(['isLoading', 'cart']),
  },
  methods: {
    ...mapActions(['getCart']),
    // getCart() {
    //   this.$store.dispatch('getCart');
    // },
    removeCart(id) {
      this.$store.dispatch('removeCart', id);
    },
  },
  created() {
    this.getCart();
  },
};
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";

/* 購物車按鈕 */
.btn:focus,.btn:active {
   outline: none;
   box-shadow: none;
}
.btn-cart {
  background-color: transparent;
  position: relative;
}

/* 購物車按鈕定位 */
.btn-cart .badge {
  position: absolute;
  top: 1px;
  right: 1px;
}

.dropdown-menu-right {
  right: 0;
  left: auto;
}

</style>
