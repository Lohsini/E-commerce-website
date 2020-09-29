<template>
  <div>
    <alert/>
    <navbar/>

    <div class="container-fluid">
      <div class="row">
        <div class="side col-md-3 ml-sm-auto col-lg-2 p-0">
          <sidebar/>
        </div>
        <div class="main col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from '@/components/navbar.vue';
import sidebar from '@/components/sidebar.vue';
import alert from '@/components/Alertmessages.vue';

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

<style lang="scss" scoped>
.container-fluid{
  margin-top: 3rem;
}
</style>
