<template>
  <div class="meAddressNew">
    <van-nav-bar
      title="新增地址"
      size="large"
      left-arrow
      @click-left="onClickmeAddressNewLeft"
    />
    <van-cell-group style="margin-left: 18px">
      <van-field
        size="large"
        v-model="userAddressInfo.addrss"
        label="地址"
        placeholder="请输入您的收件地址"
      />
      <van-field
        size="large"
        v-model="userAddressInfo.customer_name"
        label="收件人"
        placeholder="请输入您的收件人姓名"
      />
      <van-field
        size="large"
        v-model="userAddressInfo.customer_phone"
        label="手机号"
        placeholder="请输入您的手机号"
      />
    </van-cell-group>
    <van-button class="saveAddr" @click="saveAddr">保存</van-button>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "MeAddressNew",
  components: {},
  data() {
    return {
      user: JSON.parse(window.sessionStorage.getItem("user")),
      userAddressInfo: {},
    };
  },
  mounted() {
    // console.log(this.user.id);
  },
  methods: {
    //新增地址左上角返回
    onClickmeAddressNewLeft() {
      this.$router.push("/meaddress");
    },
    //
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
    //保存地址
    saveAddr() {
      console.log(this.userAddressInfo);
    },
  },
};
</script>
<style lang='less'>
.meAddressNew {
  .saveAddr {
    position: absolute;
    margin-left: 10%;
    width: 80%;
    border-radius: 25px;
    background-color: #ffca2d;
    bottom: 20px;
  }
}
</style>