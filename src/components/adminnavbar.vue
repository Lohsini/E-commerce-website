<template>
  <div>
    <nav class="navbar navbar-dark bg-dark p-0 fixed-top">
      <a href="#" class="navbar-brand">商城管理頁面</a>
      <a href="#" @click.prevent="signout" class="signout">登出</a>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    signout() {
      const api = `${process.env.VUE_APP_APIPATH}/logout`;
      // eslint-disable-next-line no-console
      console.log(api);
      this.$http.post(api).then((response) => {
        // eslint-disable-next-line no-console
        console.log(response.data);
        if (response.data.success) {
          this.$router.push('/home');
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar{
  box-shadow: 0 0 5px #000;
  height: 3rem;
  a{
    margin: 0 10px;
  }
  .signout{
    color: #fff;
    text-decoration: none;
  }
  .signout:hover{
    color: #ddd;
  }
}
</style>
