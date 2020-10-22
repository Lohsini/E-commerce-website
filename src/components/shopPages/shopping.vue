<template>
  <div>
    <!-- jumbotron -->
    <div class="jumbotron jumbotron-fluid jumbotron-bg d-flex align-items-end">
      <div class="container">
        <div class="p-3 bg-lighter">
          <h1 class="display-3 font-weight-bold">Lorem ipsum dolor sit amet</h1>
          <p class="lead">
            This is a modified jumbotron that occupies
            the entire horizontal space of its parent.
          </p>
        </div>
      </div>
    </div>

    <div class="container mb-3">
      <div class="row">

        <!-- 左側選單 (List group) -->
        <div class="col-md-2">
          <div class="list-group" ><!-- sticky-top -->
            <a class="list-group-item list-group-item-action text-left"
              href="#" @click.prevent="searchText = item"
              :class="{ 'active': item === searchText}"
              v-for="item in categories" :key="item">
              <i class="fa fa-street-view" aria-hidden="true"></i>
              {{ item }}
            </a>
            <a href="#" class="list-group-item list-group-item-action"
              @click.prevent="searchText = ''"
              :class="{ 'active': searchText === ''}">
              全部顯示
            </a>
          </div>
        </div>

        <!-- 子頁面 -->
        <div class="col-md-10">
          <!-- Search bar -->
          <div class="d-flex mb-4 ml-auto justify-content-end">
            <form class="form-inline my-3 my-lg-0">
              <div class="input-group">
                <input class="form-control" type="text" v-model="searchText"
                  placeholder="Search" aria-label="Search">
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button"
                    @click="searchText = ''">
                    <i class="fa fa-times"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <!-- content -->
          <div class="tab-pane" id="list-gift">
            <div class="row align-items-stretch">
              <!-- 商品 -->
              <div class="col col-md-3 mb-4" v-for="(item) in filterData" :key="item.id">
                <div class="product-card" style="height: 100%;">
                  <div class="card border-0 box-shadow text-center h-100">
                    <div style="height: 150px; background-size: cover; background-position: center"
                    :style="{backgroundImage: `url(${item.imageUrl})`}"></div>
                    <div class="card-body">
                      <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
                      <h5 class="card-title">
                        <a href="#" class="text-dark">{{item.title}}</a>
                      </h5>
                      <!-- <p class="card-text text-left">{{item.content}}</p> -->
                      <div class="text-right">
                        <div v-if="item.origin_price === item.price">{{item.origin_price}} 元</div>
                        <div v-if="item.origin_price !== item.price">
                          原價 {{item.origin_price}} 元</div>
                        <div v-if="item.origin_price !== item.price">現在只要 {{item.price}} 元</div>
                      </div>
                    </div>
                    <div class="card-footer border-top-0 bg-white">
                      <button class="btn btn-outline-secondary btn-block btn-sm"
                        @click="addtoCart(item.id)">
                        <i class="fa fa-cart-plus" aria-hidden="true"></i> 加到購物車
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      products: [],
      searchText: '',
      categories: [],
    };
  },
  computed: {
    filterData() {
      const vm = this;
      if (vm.searchText) {
        return vm.products.filter((item) => {
          const data = item.title.toLowerCase().includes(vm.searchText.toLowerCase());
          return data;
        });
      }
      return this.products;
    },
  },
  methods: {
    getProducts() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      vm.$store.dispatch('updateLoading', true);
      this.$http.get(url).then((response) => {
        vm.products = response.data.products;
        // console.log('取得產品列表:', response.data.products);
        vm.getUnique();
        vm.$store.dispatch('updateLoading', false);
      });
    },
    addtoCart(id, qty = 1) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.$store.dispatch('updateLoading', true);
      const item = {
        product_id: id,
        qty,
      };
      vm.$store.dispatch('updateLoading', true);
      this.$http.post(url, { data: item }).then((response) => {
        vm.$store.dispatch('updateLoading', false);
        console.log('加入購物車:', response);
      });
    },
    getUnique() {
      const vm = this;
      const categories = new Set();
      vm.products.forEach((item) => {
        categories.add(item.category);
      });
      vm.categories = Array.from(categories);
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style lang="scss" scoped>
.jumbotron-bg {
  /* banners.png */
  // background: url("https://images.unsplash.com/photo-1477901492169-d59e6428fc90?w=1350");
  // background-size: cover;
  // background-position: center center;
  min-height: 400px;
}

/* 半透明背景 */
.bg-lighter {
  background-color: rgba(255, 255, 255, 0.45);
}
.col{
  padding: 5px;
  .product-card{
    border: solid 1px #ddd;
  }
  .card{
    font-size: 1rem;
  }
}
</style>
