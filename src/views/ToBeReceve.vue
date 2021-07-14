<template>
  <div class="tobereceve">
    <van-nav-bar
      title="待收货"
      size="large"
      left-arrow
      @click-left="onClickToBeReceveLeft"
    />
    <h1>待收货</h1>
  </div>
</template>
<script>
export default {
  name: "ToBeReceve",
  components: {},
  data() {
    return {
      user: JSON.parse(window.sessionStorage.getItem("user")),
    };
  },
  methods: {
    //左上角返回
    onClickToBeReceveLeft() {},
  },
};
</script>
<style lang="less" >
</style>
