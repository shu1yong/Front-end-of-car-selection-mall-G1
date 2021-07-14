<template>
  <div class="meAddressEdit">
    <van-nav-bar
      title="编辑地址"
      size="large"
      left-arrow
      @click-left="onClickmeAddressEditLeft"
    />
    <van-cell-group style="margin-left: 18px">
      <van-field
        size="large"
        v-model="userAddressInfo.address"
        label="地址"
        placeholder="请输入您的收件地址"
      />
      <van-field
        size="large"
        v-model="userAddressInfo.customerName"
        label="收件人"
        placeholder="请输入您的收件人姓名"
      />
      <van-field
        size="large"
        v-model="userAddressInfo.customerPhone"
        label="手机号"
        placeholder="请输入您的手机号"
      />
    </van-cell-group>
    <van-button class="saveAddr" @click="saveAddr">保存</van-button>
    <van-button class="deleteAddr" @click="deleteAddr">删除</van-button>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "MeAddressEdit",
  components: {},
  data() {
    return {
      user: JSON.parse(window.sessionStorage.getItem("user")),
      userAddressInfo: {},
    };
  },
  mounted() {
    // console.log(this.user.id);
    //获取传过来的地址，地址index
    this.userAddressInfo = this.$route.params.addressinfo;
    console.log(this.userAddressInfo);
    this.index = this.$route.params.index;
  },
  methods: {
    //编辑地址左上角返回
    onClickmeAddressEditLeft() {
      this.$router.push("/meaddress");
    },

    //保存编辑地址
    saveAddr() {
      console.log(this.userAddressInfo);
      let surl = this.baseurl + "/api/update/address/detail";
      this.$axios
        .post(
          surl,
          "customerId=" +
            this.user.id +
            "&id=" +
            this.userAddressInfo.id +
            "&address=" +
            this.userAddressInfo.address +
            "&customerName=" +
            this.userAddressInfo.customerName +
            "&customerPhone=" +
            this.userAddressInfo.customerPhone
        )
        .then((resp) => {
          console.log(resp);
          if (resp.data.code == 1) {
            console.log(resp.data.data);
            this.userInfo = resp.data.data;
            this.$toast.success("操作成功");
          } else {
            this.$toast.fail("操作失败");
          }
        });
      this.$router.push("/meaddress");
    },
    //删除地址
    deleteAddr() {
      console.log(this.userAddressInfo);
    },
  },
};
</script>
<style lang='less'>
.meAddressEdit {
  .saveAddr {
    position: absolute;
    margin-left: 10%;
    width: 80%;
    border-radius: 25px;
    background-color: #ffca2d;
    bottom: 70px;
  }
  .deleteAddr {
    position: absolute;
    margin-left: 10%;
    width: 80%;
    border-radius: 25px;
    background-color: #ffca2d;
    bottom: 20px;
  }
}
</style>