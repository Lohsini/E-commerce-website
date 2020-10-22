<template>
  <div class="shopping">
    <loading :active.sync="isLoading"></loading>

    <div class="jumbotron">
      <div>
        <h1>您的購物車</h1>
      </div>
    </div>

    <!-- 購物車 -->
    <div class="my-5 d-flex justify-content-center" v-if="cartLength !== 0">
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
                  @click="removeCartItem(item.id)"
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
              <td class="text-right">{{ cart.total }}</td>
            </tr>
            <tr v-if="cart.final_total !== cart.total">
              <td colspan="3" class="text-right text-success">折扣價</td>
              <td class="text-right text-success">{{ cart.final_total }}</td>
            </tr>
          </tfoot>
        </table>
        <!-- 優惠券的部分還沒寫，未來加 -->
        <div class="input-group mb-3 input-group-sm">
          <input type="text" class="form-control" placeholder="請輸入優惠碼" />
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button">套用優惠碼</button>
          </div>
        </div>
        <div class="text-center">
          <router-link class="btn btn-success" to="/imformationform">下一步</router-link>
        </div>
      </div>
    </div>

    <div class="my-5 d-flex justify-content-center" v-if="cartLength === 0">
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
      cart: [],
      cartLength: 0,
      pagination: {},
      isLoading: false,
      status: {
        loadingItem: '',
      },
    };
  },
  methods: {
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
