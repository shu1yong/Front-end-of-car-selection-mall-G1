<template>
  <div class="meOrder">
    <van-nav-bar
      title="我的订单"
      size="large"
      left-arrow
      @click-left="onClickMeOrderLeft"
    />
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Me",
  components: {},
  data() {
    return {
      user: JSON.parse(window.sessionStorage.getItem("user")),
      userInfo: {},
    };
  },
  mounted() {
    //初始化用户订单信息
    // console.log(this.user.id);
  },
  methods: {
    //我的订单左上角返回
    onClickMeOrderLeft() {
      this.$router.push("/me");
    },
    //获取当前用户订单信息
    getUserOrderInfo(customerId) {
      let surl = this.baseurl + "/api/select/user/info";
      this.$axios
        .get(surl, { params: { customerId: customerId } })
        .then((resp) => {
          console.log(resp.data);
          if (resp.data.code == 200) {
            console.log(resp.data.data);
            this.userInfo = resp.data.data;
            this.$toast.success("操作成功");
          } else {
            this.$toast.fail("操作失败");
          }
        });
    },
  },
};
</script>
<style >
</style>