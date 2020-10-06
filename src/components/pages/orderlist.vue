/* eslint-disable vue/no-parsing-error */
/* eslint-disable vue/no-parsing-error */
<template>
  <div class="orderlist">
    <loading :active.sync="isLoading"></loading>
    <table class="table mt-4">
      <thead>
        <th>NO.</th>
        <th>下單時間</th>
        <th>訂單編號</th>
        <th>付款</th>
        <th>付款日期</th>
        <th>付款方式</th>
        <th>總價</th>
      </thead>
      <tbody>
        <tr class="orders" v-for="(item) in orderlist" :key="item.id" @click="openDetail(item)">
          <td>{{ item.num }}</td>
          <td>{{ changedateFormat(item.create_at) }}</td>
          <td class="text-left">{{ item.id }}</td>
          <td v-if="item.is_paid === true" style="color: green;">已完成</td>
          <td v-if="item.is_paid === false" style="color: red;">未完成</td>
          <td>{{ item.paid_date }}</td>
          <td>{{ item.payment_method }}</td>
          <td class="text-right">{{ item.total | currency }}</td>
        </tr>
      </tbody>
    </table>

    <!-- 訂購資訊 -->
    <div
      class="modal fade"
      id="detailInfo"
      tabindex="-1"
      role="dialog"
      aria-labelledby="detailInfoLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <!-- header(標題) -->
          <div class="modal-header bg-info text-white">
            <h5 class="modal-title" id="detailInfoLabel">
              <span style="font-weight: 900;">訂購資訊</span>
            </h5>
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" style="fontSize: 2rem;">&times;</span>
            </button>
          </div>

          <!-- body(內容) -->
          <div class="modal-body">
            <div class="orderer-info form-group text-left" v-if="editModalObj.user">
              <h4>訂購人資料</h4>
              <p>訂購人姓名：{{ editModalObj.user.name }}</p>
              <p>訂購人電話：{{ editModalObj.user.tel }}</p>
              <p>訂購人信箱：{{ editModalObj.user.email }}</p>
              <p>訂購人地址：{{ editModalObj.user.address }}</p>
              <p>備註：<span v-if="!editModalObj.message">無備註</span>
                      <span v-if="editModalObj.message">{{ editModalObj.message }}</span>
              </p>
            </div>
            <div class="order-list form-group" v-if="productArray">
              <h4>訂購商品清單</h4>

              <table class="table">
                <thead>
                  <th>品名</th>
                  <th>數量</th>
                  <th>單位</th>
                  <th>小計</th>
                  <th>合計</th>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in productArray" :key="index">
                    <td>{{ item.product.title }}</td>
                    <td>{{ item.qty }}</td>
                    <td>{{ item.product.unit }}</td>
                    <td>{{ item.product.price | currency }}</td>
                    <td>{{ item.total | currency }}</td>
                  </tr>
                </tbody>
              </table>

            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-sm bg-info text-white" data-dismiss="modal">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import $ from 'jquery';

export default {
  computed: {
  },
  data() {
    return {
      orderlist: [],
      pagination: {},
      tempProduct: {},
      editModalObj: {},
      productArray: [],
      isNew: false,
      isLoading: false,
      status: {
        fileUploading: false,
      },
    };
  },
  methods: {
    getOrderlist(page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        // console.log(response.data.orders);
        vm.isLoading = false;
        vm.orderlist = response.data.orders;
        vm.pagination = response.data.pagination;
        // console.log(vm.pagination);
      });
    },
    openDetail(item) {
      this.editModalObj = { ...item };
      this.productArray = []; // 清空
      const keyArray = Object.keys(this.editModalObj.products);
      for (let i = 0; i < keyArray.length; i += 1) {
        const key = keyArray[i];
        const keyObject = this.editModalObj.products[key];
        // console.log('keyObject:', keyObject);
        this.productArray.push(keyObject);
      }
      $('#detailInfo').modal('show');
    },
    changedateFormat(timestamp) {
      const date = new Date(timestamp * 1000);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      if (month < 10) {
        const addzeromonth = `0${month}`;
        if (day < 10) {
          const addzeroday = `0${day}`;
          const currentDateTime = `${String(year)
          }-${
            String(addzeromonth)
          }-${
            String(addzeroday)}`;
          return currentDateTime;
        }
        const currentDateTime = `${String(year)}-${String(addzeromonth)}-${String(day)}`;
        return currentDateTime;
      }
      if (day < 10) {
        const addzeroday = `0${day}`;
        if (month < 10) {
          const addzeromonth = `0${month}`;
          const currentDateTime = `${String(year)
          }-${
            String(addzeromonth)
          }-${
            String(addzeroday)}`;
          return currentDateTime;
        }
        const currentDateTime = `${String(year)}-${String(month)}-${String(addzeroday)}`;
        return currentDateTime;
      }
      const currentDateTime = `${String(year)}-${String(month)}-${String(day)}`;
      return currentDateTime;
    },
  },
  created() {
    this.getOrderlist();
  },
};
</script>
<style lang="scss" scoped>
.orders:hover{
  background-color: #f7f7ff;
  cursor: pointer;
}

#detailInfo{
  h4{
    text-align: left;
    margin: 0;
    padding: 10px 0;
    font-weight: 900;
  }
  .orderer-info{
    p{
      margin: 0;
      margin-bottom: 10px;
    }
  }
  .order-list{
    table{
      margin: 0;
    }
  }
}
</style>
