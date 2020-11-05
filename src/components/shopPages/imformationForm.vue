<template>
  <div class="imformationForm">
    <loading :active.sync="isLoading"></loading>

    <div class="jumbotron">
      <div>
        <h1>請填寫您的資料</h1>
      </div>
    </div>

    <div>
      <!-- 資料輸入 -->
      <div class="my-5 d-flex justify-content-center">
        <form class="col-md-6" @submit.prevent="createOrder">

          <div class="form-group">
            <label for="useremail">Email</label>
            <input
              type="email"
              class="form-control"
              name="email"
              id="useremail"
              v-model="form.user.email"
              placeholder="請輸入 Email"
              required
            />
            <span class="text-danger"></span>
          </div>

          <div class="form-group">
            <label for="username">收件人姓名</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="username"
              v-model="form.user.name"
              placeholder="輸入姓名"
            />
            <span class="text-danger"></span>
          </div>

          <div class="form-group">
            <label for="usertel">收件人電話</label>
            <input
              type="tel"
              class="form-control"
              id="usertel"
              v-model="form.user.tel"
              placeholder="請輸入電話"
            />
          </div>

          <div class="form-group">
            <label for="useraddress">收件人地址</label>
            <input
              type="text"
              class="form-control"
              name="address"
              id="useraddress"
              v-model="form.user.address"
              placeholder="請輸入地址"
            />
            <span class="text-danger">地址欄位不得留空</span>
          </div>

          <div class="form-group">
            <label for="comment">留言</label>
            <textarea
              name
              id="comment"
              class="form-control"
              cols="30"
              rows="10"
              v-model="form.message"
            ></textarea>
          </div>

          <hr>

          <div class="m-2">
            填寫結帳區
          </div>

          <div class="text-center">
            <router-link class="btn btn-danger mx-2" to="/cart">上一步</router-link>
            <button class="btn btn-success mx-2">去結帳 > 送出訂單</button>
          </div>

        </form>
      </div>
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
    createOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      const order = vm.form;
      vm.isLoading = true;
      this.$http.post(api, { data: order }).then((response) => {
        console.log('訂單已建立', response.data);
        vm.isLoading = false;
        this.payOrder(response.data.orderId);
      });
    },
    payOrder(id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${id}`;
      const pay = {
        order_id: id,
      };
      this.isLoading = true;
      this.$http.post(api, { data: pay }).then((response) => {
        console.log('payOrder', response.data.message);
        this.$store.dispatch('getCart'); // 購物車歸零後再次抓取購物車
        this.isLoading = false;
        this.$router.push('/checkout');
      });
    },
  },
  created() {
  },
};
</script>

<style lang="scss" scoped>
.imformationForm{
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
