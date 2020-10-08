<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-light">
      <router-link class="navbar-brand" to="/">貓咪與他的賣場</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="text-primary"><i class="fas fa-caret-down"></i></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link after" to="/cart">
            <i class="fas fa-shopping-cart"></i></router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link after" to="/shopping">貓咪食品</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link after" to="/shopping2">貓咪用品</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link after" to="/shopping3">貓咪廁所</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link after" to="/loginpage">會員登入</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link after" to="/loginpage">管理者登入</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
nav {
  box-shadow: 0 0 10px #ddd;
  button{
    outline: none;
  }
  .navbar-nav{
    margin-left: auto;
    .nav-item{
      margin: 0 10px;
    }
    .nav-item a{
      border-bottom: dotted 2px transparent;
    }
    .nav-item:hover a{
      border-bottom: dotted 2px #000;
      transition: border-bottom .2s;
    }
    .nav-item .activee{
      border-bottom: dotted 2px #000;
    }
  }
}
</style>
