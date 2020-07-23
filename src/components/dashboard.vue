<template>
  <div>
    <navbar/>
    <alert/>

    <div class="container-fluid">
      <div class="row">
        <sidebar/>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from './navbar.vue';
import sidebar from './sidebar.vue';
import alert from './Alertmessages.vue';

export default {
  data() {
    return {};
  },
  components: {
    navbar,
    sidebar,
    alert,
  },
};
</script>
