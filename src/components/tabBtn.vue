<template>
  <van-tabbar v-model="tabActive">
    <van-tabbar-item to="/home" icon="home-o">商城</van-tabbar-item>
    <van-tabbar-item to="/me" icon="manager-o">我的</van-tabbar-item>
  </van-tabbar>
</template>
<script>
export default {
  data() {
    return {
      tabActive: 0,
    };
  },
  mounted() {
    switch (this.$route.path) {
      case "/me":
        this.tabActive = 1;
        break;
      default:
        this.tabActive = 0;
    }
  },
};
</script>