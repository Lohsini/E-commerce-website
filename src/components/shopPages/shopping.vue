/* eslint-disable max-len */
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

    <!-- content -->
    <div class="content container mb-3">
      <div class="row">
        <!-- 類別選單 -->
        <div class="sidebar col-12 col-lg-2">
          <div class="list-group">
            <a class="list-group-item list-group-item-action text-left" href="#"
              v-for="item in categories" :key="item"
              @click.prevent="categoryFilter = item"
              :class="{ 'active': item === categoryFilter}">
              <i class="fa fa-street-view" aria-hidden="true"></i>
              {{ item }}
            </a>
            <a href="#" class="list-group-item list-group-item-action"
              @click.prevent="categoryFilter = ''"
              :class="{ 'active': categoryFilter === ''}">
              全部顯示
            </a>
          </div>
        </div>
        <!-- 商品區域 -->
        <div class="product col-12 col-lg-10">
          <div class="row">
            <!-- 單個商品卡 -->
            <div class="product-item col-6 col-sm-4 col-md-3 mb-4"
              v-for="(item) in filterProducts" :key="item.id">
              <div class="card h-100">
                <div class="card-img" @click="getProduct(item.id)"
                  :style="{backgroundImage: `url(${item.imageUrl})`}">
                  <h6 class="badge">{{item.category}}</h6>
                </div>
                <div class="card-body">
                  <h5 class="title">
                    <a href="#" @click.prevent="getProduct(item.id)">{{item.title}}</a>
                  </h5>
                  <div class="price text-right">
                    <div v-if="!item.origin_price || item.origin_price === item.price">
                      $ {{item.price}}</div>
                    <div v-if="item.origin_price && item.origin_price !== item.price"
                    class="origin_price">
                      $ {{item.origin_price}}</div>
                    <div v-if="item.origin_price && item.origin_price !== item.price"
                    class="cool_price">
                      $ {{item.price}}</div>
                  </div>
                </div>
                <div class="card-footer">
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

    <!-- 商品細節 -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header">
            <h5 class="modal-title">{{ product.title }}
              <span v-if="product.description"> - {{ product.description }} </span></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" style="font-size: 2rem;">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid"/>
            <div class="price">
              <div v-if="!product.origin_price || product.origin_price === product.price">
                $ {{product.price}}</div>
              <div v-if="product.origin_price && product.origin_price !== product.price"
              class="origin_price">
                $ {{product.origin_price}}</div>
              <div v-if="product.origin_price && product.origin_price !== product.price"
              class="cool_price">
                $ {{product.price}}</div>
            </div>
          </div>
          <div class="modal-footer">
            <div>
              <select name class="from-control" v-model="product.num">
                <option :value="num" v-for="num in 10" :key="num">
                  選購 {{num}} {{product.unit}}</option>
              </select>
              <div class="text-muted text-nowrap mt-3">
                小計
                <strong>{{ product.num * product.price }}</strong> 元
              </div>
            </div>
            <button
              type="button"
              class="btn btn-primary ml-5"
              @click="addtoCart(product.id, product.num)"
            >加到購物車</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import $ from 'jquery';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      categoryFilter: '',
      product: {},
    };
  },
  created() {
    this.getProducts();
  },
  computed: {
    ...mapGetters('productsModules', ['products', 'categories']),
    filterProducts() {
      if (this.categoryFilter) {
        return this.products.filter((item) => {
          const data = item.category.toLowerCase().includes(this.categoryFilter.toLowerCase());
          return data;
        });
      }
      return this.products;
    },
  },
  methods: {
    ...mapActions('productsModules', ['getProducts']),
    addtoCart(id, qty = 1) {
      this.$store.dispatch('addtoCart', { id, qty });
    },
    getProduct(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      this.$http.get(api).then((response) => {
        vm.product = response.data.product;
        $('#productModal').modal('show');
        vm.product.num = 1;
      });
    },
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

.content{
  .sidebar{
    padding-top: 5px;
  }
  .product-item{
    padding: 5px;
    .card{
      font-size: 1rem;
      .card-img{
        position: relative;
        height: 150px;
        background-size: cover;
        background-position: center;
        // border-bottom: 1px solid rgba(0, 0, 0, 0.125);
        cursor:pointer;
        h6{
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: rgba(255, 255, 255, 0.7);
        }
      }
      .card-body{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-bottom: 0px;
        height: 100px;
        .title{
          a{
            text-decoration:none;
            color: #000;
          }
        }
        .price{
          font-weight: 900;
          .origin_price{
            text-decoration: line-through;
            font-size: 0.8rem;
            color: #aaa;
            font-weight: 300;
          }
          .cool_price{
            color: rgb(231, 36, 36);
          }
        }
      }
      .card-footer{
        border-top: none;
        background-color: #fff;
      }
    }
  }
}

#productModal{
  .modal-content{
    .modal-header{
      background-color: #fff;
      border-bottom: none;
      padding-bottom: 0;
      .modal-title{
        font-size: 1.5rem;
        font-weight: 900;
      }
    }
    .modal-body{
      padding-bottom: 0;
      .price{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-top: 20px;
        font-weight: 900;
        font-size: 1.5rem;
        padding: 0 20px;
        .origin_price{
          text-decoration: line-through;
          color: #aaa;
          font-weight: 300;
          font-size: 1rem;
        }
        .cool_price{
          color: rgb(231, 36, 36);
        }
      }
    }
    .modal-footer{
      padding-top: 0;
      border-top: none;
      background-color: #fff;
      display: flex;
      align-items: flex-end;
    }
  }
}
button:focus,button:active {
  outline: none;
  box-shadow: none;
}

</style>
