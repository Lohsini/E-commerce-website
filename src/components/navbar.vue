<template>
  <div>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Company name</a>
      <input class="form-control form-control-dark w-100"
      type="text" placeholder="Search" aria-label="Search">
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a href="#" @click.prevent="signout">登出</a>
        </li>
      </ul>
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
      // const vm = this;
      // eslint-disable-next-line no-console
      console.log(api);
      this.$http.post(api).then((response) => {
        // eslint-disable-next-line no-console
        console.log(response.data);
        if (response.data.success) {
          this.$router.push('/login');
        }
      });
    },
  },
};
</script>
