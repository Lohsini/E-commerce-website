<template>
  <div class="shoppage">
    <!-- 會用到 -->
    <!-- <navbar style="position:sticky; top: 0; z-index:10;"/> -->
    <!-- 做個記號 -->

    <!-- navbar內含購物車會加數量 -->
    <nav class="navbar navbar-light bg-light">
      <router-link class="navbar-brand" to="/">
        <i class="fas fa-paw text-info"></i>
        貓咪與他的賣場
      </router-link>

      <router-link class="nav-link after" to="/loginpage">會員登入</router-link>
      <router-link class="nav-link after" to="/shopping">去逛逛</router-link>
      <router-link class="nav-link after" to="/cart">結帳頁面</router-link>

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
          <button class="btn btn-primary btn-block">
            <i class="fa fa-cart-plus" aria-hidden="true"></i> 結帳去
          </button>
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

export default {
  components: {
    Footer,
  },
  data() {
    return {
      cart: {
        carts: [],
      },
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
  methods: {
    getCart() {
      const vm = this;
      vm.$store.dispatch('updateLoading', true);
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      this.$http.get(url).then((response) => {
        if (response.data.data.carts) {
          vm.cart = response.data.data;
        }
        vm.$store.dispatch('updateLoading', false);
        console.log('取得購物車', response.data.data);
      });
    },
    removeCart(id) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      vm.$store.dispatch('updateLoading', true);
      this.$http.delete(url).then((response) => {
        vm.$store.dispatch('updateLoading', false);
        vm.getCart();
        console.log('刪除購物車項目', response);
      });
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
