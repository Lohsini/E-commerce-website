<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openModal(true)">建立新的優惠券</button>
    </div>
    <table class="table mt-4">
      <thead>
        <th width="120">優惠截止日</th>
        <th width="120">優惠代碼</th>
        <th width="120">折讓數</th>
        <th width="100">優惠券名稱</th>
        <th width="120">啟用 / 未啟用</th>
        <th width="150">編輯 / 刪除</th>
      </thead>
      <tbody v-for="(item) in coupons" :key="item.id">
        <td>{{ changedateFormat(item.due_date) }}</td>
        <td>{{ item.code }}</td>
        <td>{{ item.percent }}</td>
        <td>{{ item.title }}</td>
        <td>
          <span v-if="item.is_enabled == 1">啟用</span>
          <span v-else>未啟用</span>
        </td>
        <td>
          <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
          <button class="btn btn-outline-danger btn-sm" @click="delModal(item)">刪除</button>
        </td>
      </tbody>
    </table>

    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{'disabled': pagination.has_pre === false}">
          <a class="page-link" href="#" aria-label="Previous"
          @click.prevent="getCoupon(pagination.current_page - 1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" v-for="page in pagination.total_pages"
        :key="page" :class="{'active': page === pagination.current_page}">
          <a class="page-link" href="#" @click.prevent="getCoupon(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{'disabled': pagination.has_next === false}">
          <a class="page-link" href="#" aria-label="Next"
           @click.prevent="getCoupon(pagination.current_page + 1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>

    <!-- couponModal -->
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span v-if=" isNew === true">新增優惠券</span>
              <span v-if=" isNew === false">編輯優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" style="fontSize: 2rem;">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <div class="row">

              <div class="col-sm-12">
                <div class="form-row">
                  <div class="form-group col-sm-6">
                    <label for="title">優惠券名稱</label>
                    <input
                      type="text"
                      class="form-control"
                      id="title"
                      placeholder="請輸入title"
                      v-model="tempProduct.title"
                    />
                  </div>
                  <div class="form-group col-md-6">
                      <label for="code">優惠代碼</label>
                      <input
                        type="text"
                        class="form-control"
                        id="code"
                        placeholder="請輸入code"
                        v-model="tempProduct.code"
                      />
                    </div>
                  </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="percent">折讓數</label>
                    <input
                      type="text"
                      class="form-control"
                      id="percent"
                      placeholder="請輸入percent"
                      v-model="tempProduct.percent"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label>優惠截止日</label>
                    <input
                      type="date"
                      class="form-control"
                      v-model="tempProduct.due_date"
                    />
                  </div>
                </div>

                <hr />

                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="tempProduct.is_enabled"
                      id="is_enabled"
                      :true-value="1"
                      :flase-value="0"
                    />
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>

    <!-- delCouponModal -->
    <div
      class="modal fade"
      id="delCouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong> 優惠券(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="delCoupon">確認刪除</button>
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
      coupons: [],
      pagination: {},
      tempProduct: {},
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
    getCoupon(page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`;
      const vm = this;
      this.$store.dispatch('updateLoading', true);
      this.$http.get(api).then((response) => {
        // console.log(response.data);
        this.$store.dispatch('updateLoading', false);
        vm.coupons = response.data.coupons;
        vm.pagination = response.data.pagination;
        // console.log(vm.pagination);
      });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      } else {
        this.tempProduct = { ...item };
        this.isNew = false;
      }
      $('#couponModal').modal('show');
    },
    updateProduct() {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
      let httpMethod = 'post';
      const vm = this;
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempProduct.id}`;
        httpMethod = 'put';
      }
      const timestamp = Date.parse(this.tempProduct.due_date);
      console.log(timestamp);
      this.tempProduct.due_date = timestamp;
      this.$http[httpMethod](api, { data: vm.tempProduct }).then((response) => {
        // console.log(response.data);
        if (response.data.success) {
          $('#couponModal').modal('hide');
          vm.getCoupon();
        } else {
          $('#couponModal').modal('hide');
          vm.getCoupon();
          console.log('新增失敗');
        }
      });
    },
    delModal(item) {
      this.tempProduct = { ...item };
      $('#delCouponModal').modal('show');
    },
    delCoupon() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${this.tempProduct.id}`;
      const vm = this;
      this.$http.delete(api, { data: vm.tempProduct }).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          $('#delCouponModal').modal('hide');
          vm.getCoupon();
        } else {
          $('#delCouponModal').modal('hide');
          vm.getCoupon();
          console.log('刪除失敗');
        }
      });
    },
    changedateFormat(timestamp) {
      const date = new Date(timestamp);
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
    this.getCoupon();
  },
};
</script>
