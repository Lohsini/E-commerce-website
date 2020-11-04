<template>
  <div class="sidebar">
    <div class="siedebar-content py-4">
      <h3 class="text-muted">管理員</h3>
      <ul class="nav mb-3">
        <li class="nav-item">
          <router-link to="/admin/products" class="nav-link">
            <i class="fas fa-box-open"></i> 產品列表
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/orderlist" class="nav-link">
            <i class="fas fa-th-list"></i> 訂單列表
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/coupon" class="nav-link">
            <i class="fas fa-ticket-alt"></i> 優惠票券
          </router-link>
        </li>
      </ul>

      <h3 class="text-muted">模擬功能</h3>
      <ul class="nav">
        <li class="nav-item">
          <router-link to="/customerorder" class="nav-link">
            <i class="fas fa-th-list"></i> 模擬訂單
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.activee {
  background-color: #eaeaea;
}

.sidebar {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.04);
  .siedebar-content {
    h3 {
      font-size: 1.1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      margin: 0;
    }
    ul {
      display: flex;
      flex-direction: column;
    }
  }
}

@media screen and (max-width: 766px) {
  .sidebar {
    .siedebar-content {
      ul {
        display: flex;
        flex-direction: row;
      }
    }
  }
}
</style>
