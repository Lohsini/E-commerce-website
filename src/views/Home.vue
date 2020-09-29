<template>
  <div class="home">

    <div class="navbar bg-light">
      <ul class="nav">
        <a href="#" class="navbar-brand">商城管理頁面</a>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            管理者登入
          </router-link>
        </li>
      </ul>
    </div>

    <div class="jumbotron">
      <div>
        <h1>電商網站</h1>
        <h2>首頁</h2>
        <p>歡迎光臨來到首頁</p>
      </div>
    </div>

    <div class="main">
      <customerOrder/>
    </div>
  </div>
</template>

<script>
import customerOrder from '@/components/pages/customerOrder.vue';

export default {
  components: {
    customerOrder,
  },
};
</script>

<style lang="scss" scoped>
.navbar{
  position: sticky;
  top: 0;
  z-index: 1030;
  box-shadow: 0 0 10px #ddd;
}
.main{
  max-width: 1200px;
  margin: auto;
}
</style>
