<template>
  <div class="shopping">
    <loading :active.sync="isLoading"></loading>

    <div class="jumbotron">
      <div>
        <h1>您的購物車</h1>
      </div>
    </div>

    <!-- 購物車 -->
    <div class="my-5 d-flex justify-content-center" v-if="cart.carts.length !== 0">
      <div class="col-md-6 row justify-content-center">
        <table class="table mt-4" style="width: 100%;">
          <thead>
            <th>刪除</th>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </thead>
          <tbody>
            <tr v-for="item in cart.carts" :key="item.id">
              <td class="align-middle">
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="removeCart(item.id)"
                >
                  <i class="far fa-trash-alt"></i>
                </button>
              </td>
              <td class="align-middle">{{ item.product.title }}</td>
              <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
              <td class="align-middle text-right">{{ item.final_total | currency }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-right">總計</td>
              <td class="text-right">{{ cart.total | currency  }}</td>
            </tr>
            <tr v-if="cart.final_total !== cart.total">
              <td colspan="3" class="text-right text-success">折扣價</td>
              <td class="text-right text-success">{{ cart.final_total | currency }}</td>
            </tr>
          </tfoot>
        </table>
        <!-- 優惠券的部分還沒寫，未來加 -->
        <div class="input-group mb-3 input-group-sm">
          <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model="couponcode"/>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="coupon">套用優惠碼</button>
          </div>
        </div>

        <div class="text-center">
          <router-link class="btn btn-success" to="/imformationform">下一步</router-link>
        </div>
      </div>
    </div>

    <div class="my-5 d-flex justify-content-center" v-if="cart.carts.length === 0">
      <p>還沒有選擇商品喔！<br>
      <router-link class="btn btn-success my-4" to="/shopping">來去逛逛</router-link></p>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery';

export default {
  data() {
    return {
      products: [],
      product: {},
      // cart: {
      //   carts: [],
      // },
      pagination: {},
      // isLoading: false,
      status: {
        loadingItem: '',
      },
      couponcode: '',
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    cart() {
      return this.$store.state.cart;
    },
  },
  methods: {
    getCart() {
      this.$store.dispatch('getCart');
    },
    removeCart(id) {
      this.$store.dispatch('removeCart', id);
    },
    coupon() {
      console.log('this.couponcode:', this.couponcode);
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      const item = {
        code: this.couponcode,
      };
      this.$http.post(api, { data: item }).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          this.getCart();
        }
        if (!response.data.success) {
          this.cart.final_total = this.cart.total;
        }
      });
    },
  },
  created() {
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
