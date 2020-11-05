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
        <th>修改</th>
      </thead>
      <tbody>
        <tr class="orders" v-for="(item) in orderlist" :key="item.id">
          <td @click="openDetail(item)">{{ item.num }}</td>
          <td @click="openDetail(item)">{{ changedateFormat(item.create_at) }}</td>
          <td @click="openDetail(item)" class="text-left">{{ item.id }}</td>
          <td @click="openDetail(item)"
          v-if="item.is_paid === 'true' || item.is_paid === true"
           style="color: green;">已完成</td>
          <td @click="openDetail(item)"
          v-if="item.is_paid === 'false' || item.is_paid === false"
           style="color: red;">未完成</td>
          <td @click="openDetail(item)">{{ paiddate(item.paid_date) }}</td>
          <td @click="openDetail(item)">{{ item.payment_method }}</td>
          <td @click="openDetail(item)" class="text-right">{{ item.total | currency }}</td>
          <td><button class="btn btn-outline-primary btn-sm" @click="openEdit(item)">
            編輯</button></td>
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
            <div class="orderer-info form-group text-left" v-if="infoModalObj.user">
              <h4>訂購人資料</h4>
              <p>訂購人姓名：{{ infoModalObj.user.name }}</p>
              <p>訂購人電話：{{ infoModalObj.user.tel }}</p>
              <p>訂購人信箱：{{ infoModalObj.user.email }}</p>
              <p>訂購人地址：{{ infoModalObj.user.address }}</p>
              <p>備註：<span v-if="!infoModalObj.message">無備註</span>
                      <span v-if="infoModalObj.message">{{ infoModalObj.message }}</span>
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

    <!-- 編輯區 -->
    <div
      class="modal fade"
      id="editInfo"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editInfoLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <!-- header(標題) -->
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="editInfoLabel">
              <span style="font-weight: 900;">編輯訂購資訊</span>
            </h5>
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" style="fontSize: 2rem;">&times;</span>
            </button>
          </div>

          <!-- body(內容) -->
          <div class="modal-body">
            <div class="orderer-info form-group text-left" v-if="editModalObj">
              <div class="group">
                <p>付款狀態：</p>
                <div class="radio">
                  <input type="radio" id="true" name="paid" value="true"
                  v-model="editModalObj.is_paid"/>
                  <label for="true">已完成</label>

                  <input type="radio" id="false" name="paid" value="false"
                  v-model="editModalObj.is_paid" @click="editModalObj.paid_date = null"/>
                  <label for="false">未完成</label>
                </div>
              </div>
              <p>付款日期：
                <input type="date" v-model="editModalObj.paid_date">
              </p>
              <p>付款方式：
                <input type="text" v-model="editModalObj.payment_method">
              </p>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-sm bg-primary text-white"
            data-dismiss="modal" @click="editOrderList(editModalObj.id)">確定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      orderlist: [],
      pagination: {},
      tempProduct: {},
      infoModalObj: {},
      editModalObj: {},
      productArray: [],
      isNew: false,
      // isLoading: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
  methods: {
    getOrderlist(page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`;
      this.$store.dispatch('updateLoading', true);
      this.$http.get(api).then((response) => {
        // console.log(response.data.orders);
        this.$store.dispatch('updateLoading', false);
        this.pagination = response.data.pagination;
        // response.data.orders.forEach((element) => {
        //   console.log('element:', element);
        //   this.paiddate(element.paid_date);
        // });
        this.orderlist = response.data.orders;
        // console.log(vm.pagination);
      });
    },
    openDetail(item) {
      this.infoModalObj = { ...item };
      this.productArray = []; // 清空
      const keyArray = Object.keys(this.infoModalObj.products);
      for (let i = 0; i < keyArray.length; i += 1) {
        const key = keyArray[i];
        const keyObject = this.infoModalObj.products[key];
        // console.log('keyObject:', keyObject);
        this.productArray.push(keyObject);
      }
      $('#detailInfo').modal('show');
    },
    openEdit(item) {
      this.editModalObj = { ...item };
      $('#editInfo').modal('show');
    },
    editOrderList(id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/order/${id}`;
      const vm = this;
      vm.$store.dispatch('updateLoading', true);
      console.log('api:', api);
      if (this.editModalObj.paid_date) {
        this.editModalObj.is_paid = true;
      }
      const item = this.editModalObj;
      console.log('item:', item);
      this.$http.put(api, { data: item }).then((response) => {
        console.log(response.data);
        vm.$store.dispatch('updateLoading', false);
        this.getOrderlist();
      });
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
    paiddate(date) {
      if (date) {
        if (date === String(date)) {
          return date;
        }
        if (date === Number(date)) {
          const paiddate = this.changedateFormat(date);
          return paiddate;
        }
        return '傳來的存在';
      }
      return '未完成';
    },
  },
  created() {
    this.getOrderlist();
  },
};
</script>
<style lang="scss" scoped>
.table td{
  vertical-align: middle;
}
.orders:hover{
  background-color: #f7f7ff;
  cursor: pointer;
}

.modal{
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
.group{
  display: flex;
  align-items: center;
  .radio {
    margin-left: 4px;
    text-align: left;
    label {
      margin-right: 10px;
      padding: 10px;
      border: 1px dashed #bbb;
      cursor: pointer;
    }
    input[type="radio"] {
      opacity: 0; //設置透明度，隱藏原有input樣式
      display: none;
    }
    input:checked + label {
      border: 1px solid #777;
    }
  }
}
</style>
